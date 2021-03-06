'use strict'

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const Multer = require('multer')
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
})

const db = require('./db.js')
const storage = require('./storage.js')

app.use('/public/', express.static(__dirname + '/public'))

app.get('*/public/app.bundle.js', (req, res) => {
  res.sendFile(__dirname + '/public/app.bundle.js')
})

const secrets = require('./secret.js')

/*--------------------
    Authentication
--------------------*/

let googleUserId, payload

app.use(['/rest/*', '/rest/*/*'], (req, res, next) => {
  const token = req.get('X-Auth-Token')
  const GoogleAuth = require('google-auth-library')
  const auth = new GoogleAuth()
  const client = new auth.OAuth2(secrets.CLIENT_ID, secrets.CLIENT_SECRET, '')
  client.verifyIdToken(token, secrets.CLIENT_ID, (e, login) => {
    try {
      payload = login.getPayload()
      googleUserId = payload['sub']
      next()
    } catch (e) {
      res.send(e)
    }
  })
})

/*---------------
    Users
---------------*/

app.put('/rest/user', (req, res) => {
  db.getUser(googleUserId, response => {
    if (response === 'USER_NOT_FOUND') {
      db.createUser(googleUserId, payload, user => {
        res.send(JSON.stringify(user))
      })
    } else {
      res.status(200).send('user already exists.')
    }
  })
})

app.post('/rest/user', (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const telephone = req.body.telephone
  const address = req.body.address
  db.updateUser(
    googleUserId,
    payload,
    name,
    email,
    telephone,
    address,
    user => {
      res.send(JSON.stringify(user))
    }
  )
})

app.get('/rest/user', (req, res) => {
  db.getUser(googleUserId, response => {
    if (response === 'USER_NOT_FOUND') {
      res.status(404).send(response)
    } else {
      response.isAdmin = googleUserId === secrets.ADMIN_ID
      res.send(response)
    }
  })
})

/*---------------
    Dishes
---------------*/

app.put('/rest/dish', (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const image = req.body.image
  const price = req.body.price

  db.createDish(name, description, image, price, googleUserId, dish => {
    res.send(dish)
  })
})

app.post('/rest/dish', (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const image = req.body.image
  const price = req.body.price
  const id = parseInt(req.body.id)
  db.updateDish(id, name, description, image, price, googleUserId, dish => {
    res.send(dish)
  })
})

app.get('/rest/dish', (req, res) => {
  if (req.query.hasOwnProperty('id')) {
    const dishId = parseInt(req.query.id)
    db.getDish(dishId).then(dish => {
      res.send(dish)
    })
  } else {
    db.getUserDishes(googleUserId, dishes => {
      res.send(dishes)
    })
  }
})

app.get('/public/dish', (req, res) => {
  db.getCustomerDishes(dishes => {
    res.send(dishes)
  })
})

app.delete('/rest/dish', (req, res) => {
  const dishId = parseInt(req.body.id)
  db.deleteDish(dishId, msg => {
    res.send(msg)
  })
})

app.put('/rest/dish-image', multer.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.')
    return
  }
  storage.uploadDishImage(req.file.originalname, req.file.buffer, result => {
    if (result === 'ERROR') {
      res.status(500).send('Error')
    } else {
      res.status(201).send(result)
    }
  })
})

app.post('/rest/dish-availability', (req, res) => {
  const dishId = parseInt(req.body.id)
  const quantity = parseInt(req.body.quantity)
  const time = req.body.time
  db.getUser(googleUserId, user => {
    if (user.verified === true) {
      db.updateAvailability(dishId, quantity, time, () => {
        res.send('ok')
      })
    } else {
      res.status(401).send('Unauthorized')
    }
  })
})

/*---------------
    Orders
---------------*/

app.put('/rest/customer/order', (req, res) => {
  const dishId = parseInt(req.body.dish)

  db.createOrder(dishId, googleUserId, order => {
    res.send(order)
  })
})

app.get('/rest/customer/order', (req, res) => {
  const clientId = parseInt(req.body.clientId)
  db.getClientOrders(clientId, (orders)=>{
    res.send(orders)
  })
})

app.get('/rest/chef/order', (req, res) => {
  const chefId = parseInt(req.body.chefId)
  db.getChefOrders(chefId, (orders)=>{
    res.send(orders)
  })
})

/*---------------
    Admin
---------------*/

app.get('/rest/admin/users', (req, res) => {
  if (googleUserId === secrets.ADMIN_ID) {
    db.adminGetUsers(users => {
      res.send(users)
    })
  } else {
    res.status(401).send('Unauthorized')
  }
})

app.post('/rest/admin/verify-user', (req, res) => {
  const userId = req.body.userId
  if (googleUserId === secrets.ADMIN_ID) {
    db.adminVerifyUser(userId, user => {
      res.send(user)
    })
  } else {
    res.status(401).send('Unauthorized')
  }
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
