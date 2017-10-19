'use strict';
const Multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db.js');
const storage = require('./storage.js');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/', express.static('public'));
app.use('/*/*/', express.static('public'));

const googleAuth = (token, callback) => {
  const CLIENT_ID = '377161177382-bqradjn2qablmfso34dcnkrtd31gs25m.apps.googleusercontent.com'; // public
  const GoogleAuth = require('google-auth-library');
  const auth = new GoogleAuth;
  const client = new auth.OAuth2(CLIENT_ID, '', '');
  client.verifyIdToken(token, CLIENT_ID, (e, login)=>{
    const payload = login.getPayload();
    const userid = payload['sub'];
    callback(userid, payload);
  });
};

app.put('/user', (req, res)=>{
  const token = req.get('X-Auth-Token');
  const callback = (googleUserId, payload) => {
    db.getUser(googleUserId, (response) => {
      if (response === 'USER_NOT_FOUND') {
        db.createUser(googleUserId, payload, (user) => {
          res.send(JSON.stringify(user));
        });
      } else {
        res.status(200).send("user already exists.");
      }
    });
  };
  googleAuth(token, callback);
});

app.post('/user', (req, res)=>{
  const token = req.get('X-Auth-Token');
  const name = req.body.name;
  const email = req.body.email;
  const telephone = req.body.telephone;
  const address = req.body.address;
  const callback = (userid, payload) => {
    db.updateUser(userid, payload, name, email, telephone, address, (user) => {
      res.send(JSON.stringify(user));
    });
  };
  googleAuth(token, callback);
});

app.get('/user', (req, res)=>{
  const token = req.get('X-Auth-Token');
  const callback = (googleUserId, payload) => {
    db.getUser(googleUserId, (response) => {
      if (response === 'USER_NOT_FOUND') {
        res.status(404).send(response);
      } else {
        res.send(response);
      }
    });
  };
  googleAuth(token, callback);
});

app.put('/dish', (req, res)=>{
  const token = req.get('X-Auth-Token');
  const name = req.body.name;
  const description = req.body.description;
  const image = req.body.image;
  const price = req.body.price;

  const callback = (user, payload) => {
    db.createDish(name, description, image, price, user, (dish) => {
      res.send(dish);
    });
  };
  googleAuth(token, callback);
});

app.post('/dish', (req, res)=>{
  const token = req.get('X-Auth-Token');
  const name = req.body.name;
  const description = req.body.description;
  const image = req.body.image;
  const price = req.body.price;
  const id = parseInt(req.body.id);
  const callback = (user, payload) => {
    db.updateDish(id, name, description, image, price, user, (dish) => {
      res.send(dish);
    });
  };
  googleAuth(token, callback);
});

app.get('/dish', (req, res)=>{
  const token = req.get('X-Auth-Token');
  let callback;
  if (req.query.hasOwnProperty('id')) {
    const dishId = parseInt(req.query.id);
    callback = (user, payload) => {
      db.getDish(dishId, (dish) => {
        // if (dish.user !== user) {
        //   res.status(403).send('Unauthorized, Forbidden.');
        // }
        res.send(dish);
      });
    };
  } else {
    callback = (user, payload) => {
      db.getDishes(user, (dishes)=>{
        res.send(dishes);
      });
    };
  }
  googleAuth(token, callback);
});
  
app.delete('/dish', (req, res)=>{
  const token = req.get('X-Auth-Token');
  const dishId = parseInt(req.body.id);
  const callback = (user, payload) => {
    db.deleteDish(dishId, (msg) => {
      res.send(msg);
    });
  };
  googleAuth(token, callback);
});

app.put('/dish-image', multer.single('file'), (req, res) => {
  const token = req.get('X-Auth-Token');
  const callback = (userid, payload) => {
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
  };

  googleAuth(token, callback);
});

app.get('/users-admin', (req, res) => {
  const token = req.get('X-Auth-Token');
  const callback = (userId, payload) => {
    if(userId === '116208633581747511292') {
      db.adminGetUsers((users)=>{
        res.send(users);
      });
    } else {
      res.status(401).send('Unauthorized');
    }
  };
  googleAuth(token, callback);
});

app.post('/verify-user-admin', (req, res) => {
  const token = req.get('X-Auth-Token');
  const callback = (userId, payload) => {
    if(userId === '116208633581747511292') {
      db.adminVerifyUser(userId, ()=>{
        res.send('ok');
      });
    } else {
      res.status(401).send('Unauthorized');
    }
  };
  googleAuth(token, callback);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
