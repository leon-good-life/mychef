'use strict';

const Datastore = require('@google-cloud/datastore');
const datastore = Datastore();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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

app.post('/create-user/', (req, res)=>{
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
    datastore.insert(entity).then(() => {
      // Task inserted successfully.
    });
    res.send(JSON.stringify(user));
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

  const callback = (user, payload) => {
    const dishKey = datastore.key('Dish');
    const dish = { name, description, user };
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

app.get('/dish', (req, res)=>{
  // todo
  
  // const token = req.get('X-Auth-Token');
  // const id = req.body.id;
  // const callback = (userid, payload) => {
  //   const dishKey = datastore.key([
  //     'Dish',
  //     id
  //   ]);
  //   datastore.get(userKey)
  //   .then((results) => {
  //     const entity = results[0];
  //     res.send(JSON.stringify(entity));
  //   });
  // };
  // googleAuth(token, callback);
});


app.post('/aaa', (req, res)=>{
  console.log()
  console.log(req.body);
});
  

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
