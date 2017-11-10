const Datastore = require('@google-cloud/datastore');
const datastore = Datastore();

/*---------------
    Users
---------------*/

exports.getUser = (userId, callback) => {
  const userKey = datastore.key(['User', userId]);
  datastore.get(userKey).then((results) => {
    if (typeof results[0] === 'undefined') {
      callback('USER_NOT_FOUND');
    } else {
      const user = results[0];
      callback(user);
    }
  });
};

exports.createUser = (googleUserId, payload, callback) => {
  const userKey = datastore.key(['User', googleUserId]);
  const user = {
    google_user_email: payload['email'],
    google_user_picture: payload['picture'],
    google_user_name: payload['name'],
    verified: false
  };
  const entity = {
    key: userKey,
    data: user
  };
  datastore.insert(entity).then(() => {
    callback(user);
  });
};

exports.updateUser = (userId, payload, name, email, telephone, address, callback) => {
  const userKey = datastore.key(['User', userId]);
  datastore.get(userKey).then((results) => {
    let user = results[0];
    user.google_user_email = payload['email'];
    user.google_user_picture = payload['picture'];
    user.google_user_name = payload['name'];
    user.user_filled_name = name;
    user.user_filled_email = email;
    user.user_filled_telephone = telephone;
    user.user_filled_address = address;
    const entity = {
      key: userKey,
      data: user
    };
    datastore.update(entity).then(() => {
      callback(user);
    });
  });
};

/*---------------
    Dishes
---------------*/

const getDish = (dishId, callback) => {
  const dishKey = datastore.key(['Dish', dishId]);
  datastore.get(dishKey).then((results) => {
    const dish = results[0];
    callback(dish);
  });
};
exports.getDish = getDish;

exports.getDishes = (userId, callback) => {
  const query = datastore.createQuery('Dish').filter('user', '=', userId);
  datastore.runQuery(query, (err, entities, info) => {
    const dishes = entities.map(dish=>{
      return {
        name: dish.name,
        description: dish.description,
        id: dish[datastore.KEY].id || dish[datastore.KEY].name,
        image: dish.image,
        price: dish.price,
        quantity: dish.quantity || 0,
        time: dish.time || null
      };
    });
    callback(dishes);
  });
};

exports.createDish = (name, description, image, price, user, callback) => {
  const dishKey = datastore.key('Dish');
  const dish = { name, description, image, price, user };
  const entity = {
    key: dishKey,
    data: dish
  };
  datastore.insert(entity).then(() => {
    callback(dish);
  });
};

exports.updateDish = (id, name, description, image, price, user, callback) => {
  const dishKey = datastore.key({path: ['Dish', id]});
  const dish = { name, description, image, price, user };
  const entity = {
    key: dishKey,
    data: dish
  };
  datastore.update(entity).then(() => {
    callback(dish);
  });
};

exports.deleteDish = (dishId, callback) => {
  const dishKey = datastore.key({path: ['Dish', dishId]});
  const msg = datastore.delete(dishKey);
  callback(msg);
};

exports.updateAvailability = (id, quantity , time, callback) => {
  const dishKey = datastore.key({path: ['Dish', id]});
  getDish(id, (dish)=>{
    dish.quantity = quantity;
    dish.time = time;
    const entity = {
      key: dishKey,
      data: dish
    };
    datastore.update(entity).then(() => {
      callback(dish);
    });
  });
};

/*---------------
    Admin
---------------*/

exports.adminGetUsers = (callback) => {
  //console.log('db adminGetUsers');
  const query = datastore.createQuery('User');
  datastore.runQuery(query, (err, entities, info) => {
    const users = entities.map(user=>{
      return {
        id: user[datastore.KEY].name,
        google_user_email: user.google_user_email,
        google_user_picture: user.google_user_picture,
        google_user_name: user.google_user_name,
        user_filled_name: user.user_filled_name,
        user_filled_email: user.user_filled_email,
        user_filled_telephone: user.user_filled_telephone,
        user_filled_address: user.user_filled_address,
        verified: user.verified
      };
    });
    callback(users);
  });
};

exports.adminVerifyUser = (userId, callback) => {
  //console.log('db adminVerifyUser');
  const userKey = datastore.key(['User', userId]);
  datastore.get(userKey).then((results) => {
    let user = results[0];
    user.verified = true;
    const entity = {
      key: userKey,
      data: user
    };
    datastore.update(entity).then(() => {
      callback(user);
    });
  });
};