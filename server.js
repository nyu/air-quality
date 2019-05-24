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

const filterFields = (object, schema) => {
  if (!object) return object
  const newObject = {}
  for (let key in schema) {
    if (key in object && typeof object[key] === typeof schema[key]()) {
      newObject[key] = object[key]
    }
  }
  return newObject
}
const getFakePoint = () => ({
  when: Date.now(),
  temperature: 60 + Math.floor(Math.random() * 10),
  humidity: 30 + Math.floor(Math.random() * 20)
})
const pointSchema = {
  when: Number, // This is a Number instead of a Date to prevent issues sending a Date over Socket.io
  temperature: Number,
  humidity: Number
}

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
    await pushPoint(getFakePoint())
    res.sendStatus(200)
  })

  app.get('*', (req, res) => {
    return nextHandler(req, res) // Handle all other pages with Next.js
  })

  server.listen(port, (error) => {
    if (error) throw error
    if (dev) {
      // Push fake data every 2 seconds in development
      setInterval(async () => {
        await pushPoint(getFakePoint())
      }, 2000)
    }
    console.log(`> Ready on http://localhost:${port}`)
  })
})