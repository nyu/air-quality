require('dotenv').config() // For loading the secret key from the .env file

const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const key = process.env.SECRET_KEY
if (!key) {
  console.warn('> Warning! You haven\'t specified a secret key; requests won\'t be protected')
}

// Filters out fields that don't conform to a schema
const isObject = (thing) => typeof thing === 'object' && !Array.isArray(thing)
const filterFields = (object, schema) => {
  if (!object) return null
  const newObject = {}

  for (let key in schema) {
    if (!(key in object)) continue
    if (isObject(schema[key]) && isObject(object[key])) {
      const filtered = filterFields(object[key], schema[key])
      if (filtered && Object.keys(filtered).length) newObject[key] = filtered
      continue
    }
    if (typeof schema[key]() === typeof object[key]) {
      newObject[key] = object[key]
    }
  }

  return newObject
}

// See MEASUREMENTS.md for more information
const pointSchema = {
  when: Number,
  name: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  temperature: Number,
  humidity: {
    relative: Number,
    absolute: Number
  },
  particulateMatter: {
    pm25: Number,
    pm5: Number
  },
  gasses: {
    co: Number,
    co2: Number,
    o2: Number,
    o3: Number,
    ch4: Number,
    so2: Number,
    h2s: Number,
    no: Number,
    no2: Number
  }
}

// Mostly totally unrealistic data,
// I was originally tring to be realistic
// but I gave up
const getFakePoint = () => ({
  when: Date.now(),
  name: 'Pikachu',
  location: {
    latitude: 31.22222,
    longitude: 121.45806
  },
  temperature: 20 + Math.floor(Math.random() * 4),
  humidity: {
    relative: 44 + Math.floor(Math.random() * 10),
    absolute: Math.random() / 2
  },
  particulateMatter: {
    pm25: Math.random(),
    pm5: Math.random()
  },
  gasses: {
    co: Math.floor(Math.random() * 3),
    co2: 10 + Math.floor(Math.random() * 3),
    o2: 12 + Math.floor(Math.random() * 3),
    o3: 6 + Math.floor(Math.random() * 3),
    ch4: 4 + Math.floor(Math.random() * 3),
    so2: 9 + Math.floor(Math.random() * 3),
    h2s: 8 + Math.floor(Math.random() * 3),
    no: 6 + Math.floor(Math.random() * 3),
    no2: 9 + Math.floor(Math.random() * 3)
  }
})

const mongoose = require('mongoose')
mongoose.Promise = Promise
const Point = mongoose.model('Point', pointSchema)

const pushPoint = dev ? (data) => {
  io.emit('data', data)
} : async (data) => {
  const point = new Point(data)
  await point.save()
  io.emit('data', data)
}

const port = parseInt(process.env.PORT, 10) || 3000
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

io.on('connection', () => {
  console.log('> A realtime client connected')
})

nextApp.prepare().then(async () => {
  if (!dev) {
    await mongoose.connect(`mongodb://mongo:27017/airquality`, { useNewUrlParser: true })
    console.log('> Connected to the database')
  }

  app.use(require('body-parser').json())

  app.get('/api/initial', async (req, res) => {
    if (dev) {
      res.json(getFakePoint())
      return
    }
    const point = await Point.findOne().sort('-when')
    res.json(filterFields(point, pointSchema))
  })

  app.post('/api/push', async (req, res) => {
    if (key && req.body.teapot !== key) {
      res.sendStatus(418)
      return
    }
    await pushPoint(filterFields(req.body, pointSchema))
    res.sendStatus(200)
  })

  app.get('*', (req, res) => {
    // Handle all other pages with Next.js
    return nextHandler(req, res)
  })

  server.listen(port, (error) => {
    if (error) throw error
    if (dev) {
      // Push fake data every 10 seconds in development
      setInterval(async () => {
        await pushPoint(getFakePoint())
      }, 10000)
    }
    console.log(`> Ready on http://localhost:${port}`)
  })
})