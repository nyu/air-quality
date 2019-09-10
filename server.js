require('dotenv').config() // For loading the secret key from the .env file

const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
const geoTz = require('geo-tz')

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

// Util for async delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// See MEASUREMENTS.md for more information
const pointSchema = {
  when: Number,
  name: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  temperature: Number,
  humidity: Number,
  particulateMatter: {
    pm1: Number,
    pm25: Number,
    pm10: Number
  },
  gasses: {
    co: Number,
    o3: Number,
    so2: Number,
    no2: Number
  }
}

// Mostly totally unrealistic data,
// I was originally tring to be realistic
// but I gave up
let lastPoint = null
const getFakePoint = () => {
  const thisPoint = {
    when: Date.now(),
    name: 'Pikachu',
    location: {
      latitude: 31.22222,
      longitude: 121.45806
    },
    temperature: 20 + Math.floor(Math.random() * 4),
    humidity: 44 + Math.floor(Math.random() * 10),
    particulateMatter: {
      pm1: lastPoint ? lastPoint.particulateMatter.pm1 + (Math.random() - 0.5) : Math.random() * 2,
      pm25: lastPoint ? lastPoint.particulateMatter.pm25 + (Math.random() - 0.5) : Math.random() * 3,
      pm10: lastPoint ? lastPoint.particulateMatter.pm10 + (Math.random() - 0.5) / 3 : Math.random() * 4
    },
    gasses: {
      co: Math.floor(Math.random() * 3),
      o3:  lastPoint ? lastPoint.gasses.o3 + (Math.random() - 0.5) *  1 : Math.random() * 6,
      so2: lastPoint ? lastPoint.gasses.so2 + (Math.random() - 0.5)/ 6  : Math.random() * 8,
      no2: lastPoint ? lastPoint.gasses.no2 + (Math.random() - 0.5)/ 4  : Math.random() * 4
    }
  }
  lastPoint = thisPoint
  return thisPoint
}

const mongoose = require('mongoose')
mongoose.Promise = Promise
const Point = mongoose.model('Point', pointSchema)

const addTimezones = (data) => ({
  ...data,
  timezones: geoTz(data.location.latitude, data.location.longitude)
})
const pushPoint = dev ? (data) => {
  io.emit('data', addTimezones(data))
} : async (data) => {
  const point = new Point(data)
  await point.save()
  io.emit('data', addTimezones(data))
}

const port = 3000
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

io.on('connection', () => {
  console.log('> A realtime client connected')
})

nextApp.prepare().then(async () => {
  if (!dev) {
    mongoose.connection.on('connected', () => console.log('> Connected to the database'))
    while(true) {
      try {
        await mongoose.connect(`mongodb://mongo:27017/airquality`, { useNewUrlParser: true })
        break
      } catch(error) {
        console.error(error)
        await delay(2000)
        console.log('> Trying to connect again...')
      }
    }
  }

  app.use(require('body-parser').json())

  app.get('/api/initial', async (req, res) => {
    if (dev) {
      res.json(addTimezones(lastPoint || getFakePoint()))
      return
    }
    const points = (await Point.find().sort('when').limit(120))
      .map((point) => addTimezones(filterFields(point, pointSchema)))
    res.json(points)
  })

  app.post('/api/push', async (req, res) => {
    if (key && req.body.teapot !== key) {
      res.sendStatus(418)
      return
    }
    await pushPoint(filterFields(req.body, pointSchema))
    res.sendStatus(200)
  })

  app.post('/api/fake', async (req, res) => {
    if (key && req.body.teapot !== key) {
      res.sendStatus(418)
      return
    }
    await pushPoint(getFakePoint())
    res.sendStatus(200)
  })

  app.get('*', (req, res) => {
    // Handle all other pages with Next.js
    return nextHandler(req, res)
  })

  server.listen(port, (error) => {
    if (error) throw error
    if (dev) {
      // Push fake data every 1 second in development
      setInterval(async () => {
        await pushPoint(getFakePoint())
      }, 1000)
    }
    console.log(`> Ready on http://localhost:${port}`)
  })
})