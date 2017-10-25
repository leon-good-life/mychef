'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Multer = require('multer');
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

const db = require('./db.js');
const storage = require('./storage.js');

app.use('/', express.static('public'));

/*--------------------
    Authentication
--------------------*/

let googleUserId, payload;

app.use('/rest/*', (req, res, next)=>{
  const token = req.get('X-Auth-Token');
  const CLIENT_ID = '377161177382-bqradjn2qablmfso34dcnkrtd31gs25m.apps.googleusercontent.com'; // public
  const GoogleAuth = require('google-auth-library');
  const auth = new GoogleAuth;
  const client = new auth.OAuth2(CLIENT_ID, '', '');
  client.verifyIdToken(token, CLIENT_ID, (e, login)=>{
    payload = login.getPayload();
    googleUserId = payload['sub'];
    next();
  });
});

/*---------------
    Users
---------------*/

app.put('/rest/user', (req, res)=>{
  db.getUser(googleUserId, (response) => {
    if (response === 'USER_NOT_FOUND') {
      db.createUser(googleUserId, payload, (user) => {
        res.send(JSON.stringify(user));
      });
    } else {
      res.status(200).send("user already exists.");
    }
  });
});

app.post('/rest/user', (req, res)=>{
  const name = req.body.name;
  const email = req.body.email;
  const telephone = req.body.telephone;
  const address = req.body.address;
  db.updateUser(googleUserId, payload, name, email, telephone, address, (user) => {
    res.send(JSON.stringify(user));
  });
});

app.get('/rest/user', (req, res)=>{
  db.getUser(googleUserId, (response) => {
    if (response === 'USER_NOT_FOUND') {
      res.status(404).send(response);
    } else {
      res.send(response);
    }
  });
});

/*---------------
    Dishes
---------------*/

app.put('/rest/dish', (req, res)=>{
  const name = req.body.name;
  const description = req.body.description;
  const image = req.body.image;
  const price = req.body.price;

  db.createDish(name, description, image, price, googleUserId, (dish) => {
    res.send(dish);
  });
});

app.post('/rest/dish', (req, res)=>{
  const name = req.body.name;
  const description = req.body.description;
  const image = req.body.image;
  const price = req.body.price;
  const id = parseInt(req.body.id);
  db.updateDish(id, name, description, image, price, googleUserId, (dish) => {
    res.send(dish);
  });
});

app.get('/rest/dish', (req, res)=>{
  if (req.query.hasOwnProperty('id')) {
    const dishId = parseInt(req.query.id);
    db.getDish(dishId, (dish) => {
      res.send();
    });
  } else {
    db.getDishes(googleUserId, (dishes)=>{
      res.send(dishes);
    });
  }
});
  
app.delete('/rest/dish', (req, res)=>{
  const dishId = parseInt(req.body.id);
  db.deleteDish(dishId, (msg) => {
    res.send(msg);
  });
});

app.put('/rest/dish-image', multer.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  storage.uploadDishImage(req.file.originalname, req.file.buffer, (result)=>{
    if (result === 'ERROR') {
      res.status(500).send('Error');
    } else {
      res.status(201).send(result);
    }
  });
});

app.post('/rest/dish-availability', (req, res)=>{
  db.getUser(googleUserId, (user)=>{
    if (user.verified === true) {
      db.updateAvailability(dishId, quantity, time, ()=>{
        res.send('ok');
      });
    } else {
      res.status(401).send('Unauthorized');
    }
  });
});

/*---------------
    Admin
---------------*/

app.get('/rest/users-admin', (req, res) => {
  if(googleUserId === '116208633581747511292') {
    db.adminGetUsers((users)=>{
      res.send(users);
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.post('/rest/verify-user-admin', (req, res) => {
  const userId = req.body.userId;
  if(googleUserId === '116208633581747511292') {
    db.adminVerifyUser(userId, (user)=>{
      res.send(user);
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
