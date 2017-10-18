'use strict';

const format = require('util').format;
const Datastore = require('@google-cloud/datastore');
const datastore = Datastore();
const GoogleStorage = require('@google-cloud/storage');
const storage = GoogleStorage();
const Multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
  const callback = (userid, payload) => {

    const userKey = datastore.key([
      'User',
      userid
    ]);
    const user = {
      google_user_email: payload['email'],
      google_user_picture: payload['picture'],
      google_user_name: payload['name']
    };
    const entity = {
      key: userKey,
      data: user
    };
    datastore.get(userKey)
      .then((results) => {
        const result = results[0];
        if (typeof results === 'undefined') {
          datastore.insert(entity).then(() => {
            // Task inserted successfully.
          });
          res.send(JSON.stringify(user));
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
    const userKey = datastore.key([
      'User',
      userid
    ]);
    const user = {
      google_user_email: payload['email'],
      google_user_picture: payload['picture'],
      google_user_name: payload['name'],
      user_filled_name: name,
      user_filled_email: email,
      user_filled_telephone: telephone,
      user_filled_address: address
    };
    const entity = {
      key: userKey,
      data: user
    };
    datastore.update(entity).then(() => {
      // Task updated successfully.
    });
    res.send(JSON.stringify(user));
  };
  googleAuth(token, callback);
});

app.get('/user', (req, res)=>{
  const token = req.get('X-Auth-Token');
  const callback = (userid, payload) => {
    const userKey = datastore.key([
      'User',
      userid
    ]);
    datastore.get(userKey)
    .then((results) => {
      const entity = results[0];
      res.send(JSON.stringify(entity));
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
    const dishKey = datastore.key('Dish');
    const dish = { name, description, image, price, user };
    const entity = {
      key: dishKey,
      data: dish
    };
    datastore.insert(entity).then(() => {
      // Task inserted successfully.
    });
    res.send(JSON.stringify(dish));
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
  const dishKey = datastore.key({
    path: ['Dish', id]
  });

  const callback = (user, payload) => {
    const dish = { name, description, image, price, user };
    const entity = {
      key: dishKey,
      data: dish
    };
    datastore.update(entity).then(() => {
      // Task inserted successfully.
    });
    res.send(JSON.stringify(dish));
  };
  googleAuth(token, callback);
});

app.get('/dish', (req, res)=>{
  const token = req.get('X-Auth-Token');
  let callback;
  if (req.query.hasOwnProperty('id')) {
    const dishId = parseInt(req.query.id);
    console.log('dishId', dishId);
    callback = (user, payload) => {
      console.log('dishId', dishId);
      const dishKey = datastore.key([
        'Dish',
        dishId
      ]);
      datastore.get(dishKey).then((results) => {
        const dish = results[0];
        console.log('results', results);
        // if (dish.user !== user) {
        //   res.status(403).send('Unauthorized, Forbidden.');
        // }
        res.send(JSON.stringify(dish));
      });
    };
  } else {
    callback = (user, payload) => {
      const query = datastore.createQuery('Dish').filter('user', '=', user);
      datastore.runQuery(query, (err, entities, info) => {
        const dishes = entities.map(dish=>{
          return {
            name: dish.name,
            description: dish.description,
            id: dish[datastore.KEY].id,
            image: dish.image,
            price: dish.price
          };
        });
        res.send(JSON.stringify(dishes));
      });
    };
  }
  googleAuth(token, callback);
});
  
app.delete('/dish', (req, res)=>{
  const token = req.get('X-Auth-Token');
  const id = parseInt(req.body.id);
  const dishKey = datastore.key({
    path: ['Dish', id]
  });
  const callback = (user, payload) => {
    const msg = datastore.delete(dishKey)
    res.send(JSON.stringify(msg));
  };
  googleAuth(token, callback);
});

app.put('/dish-image', multer.single('file'), (req, res, next) => {

  const token = req.get('X-Auth-Token');
  const callback = (userid, payload) => {

    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    const bucket = storage.bucket('mychef-123.appspot.com');
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
      //next(err);
      res.status(500).send('Error');
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      bucket.makePublic(function(err) {});    
      res.status(201).send(publicUrl);
    });

    blobStream.end(req.file.buffer);
  };

  googleAuth(token, callback);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
