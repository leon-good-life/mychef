// TODO: use the new Fetch API instead of XMLHttpRequest

/*---------------
    Users
---------------*/

export function updateUser(name, email, telephone, address, token, callback){
  const data = { name, email, telephone, address };
  const dataToSend = JSON.stringify(data);
  return fetch(window.location.origin + '/rest/user', {
    method: 'POST',
    headers: {
      'X-Auth-Token': token,
      'Content-Type': 'application/json'
    },
    body: dataToSend
  }).then(response => callback(response.text()));
}

export function getUser(token){
  return fetch(window.location.origin + '/rest/user', {
    headers: {
      'X-Auth-Token': token
    }
  }).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.json());
    }
    return Promise.reject(new Error(response.statusText));
  });
}

export function createUser(token){
  return fetch(window.location.origin + '/rest/user', {
    method: 'PUT',
    headers: {
      'X-Auth-Token': token
    }
  }).then((response) => {
    console.log('Signed in as: ' + response.text());
  });
}

/*---------------
    Dishes
---------------*/

export function createDish(name, description, image, price, token, callback){
  const data = { name, description, image, price };
  const dataToSend = JSON.stringify(data);
  return fetch(window.location.origin + '/rest/dish', {
    method: 'PUT',
    headers: {
      'X-Auth-Token': token,
      'Content-Type': 'application/json'
    },
    body: dataToSend
  }).then(callback);
}

export function updateDish(id, name, description, image, price, token, callback){
  const data = { id, name, description, image, price };
  const dataToSend = JSON.stringify(data);
  return fetch(window.location.origin + '/rest/dish', {
    method: 'POST',
    headers: {
      'X-Auth-Token': token,
      'Content-Type': 'application/json'
    },
    body: dataToSend
  });
  const xhr = new XMLHttpRequest();
  xhr.open('POST', window.location.origin + '/rest/dish');
  xhr.setRequestHeader('X-Auth-Token', token);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', callback);
  xhr.send(dataToSend);
}

export function getDish(id, token, callback){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', window.location.origin + '/rest/dish?id=' + id);
  xhr.setRequestHeader('X-Auth-Token', token);
  xhr.addEventListener('load', () => {
    if(xhr.status >= 200 && xhr.status < 300){
      const dish = JSON.parse(xhr.responseText);
      callback(dish.name, dish.description, dish.image, dish.price);
    }
  });
  xhr.send();
}

export function getDishes(token, callback){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', window.location.origin + '/rest/dish');
  xhr.setRequestHeader('X-Auth-Token', token);
  xhr.addEventListener('load', () => {
    if(xhr.status >= 200 && xhr.status < 300){
      const data = JSON.parse(xhr.responseText);
      callback(data);
    }
  });
  xhr.send();
}

export function deleteDish(id, token, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', window.location.origin + '/rest/dish');
  xhr.setRequestHeader('X-Auth-Token', token);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', callback);
  xhr.send(JSON.stringify({id}));
}

export function uploadDishImage(data, token, progress, created, error) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', window.location.origin + '/rest/dish-image', true);
  xhr.setRequestHeader('X-Auth-Token', token);
  xhr.upload.addEventListener('loadstart', e => progress(parseInt((e.loaded / e.total) * 100)));
  xhr.upload.addEventListener('progress', e => progress(parseInt((e.loaded / e.total) * 100)));
  xhr.upload.addEventListener('load', e => progress(parseInt((e.loaded / e.total) * 100)));
  xhr.addEventListener('load', (e) => {
    console.log('xhr.load', e);
    if (e.target.status === 201) {
      created(e.target.responseText);
    } else {
      error(e.target.status, e.target.statusText);
    }
  });
  xhr.send(data);
}

export function updateAvailability(id, quantity, time, token, callback) {
  const data = { id, quantity, time };
  const dataToSend = JSON.stringify(data);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', window.location.origin + '/rest/update-availability', true);
  xhr.setRequestHeader('X-Auth-Token', token);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', callback);
  xhr.send(data);
}

/*---------------
    Admin
---------------*/

export function adminGetUsers(token, callback){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', window.location.origin + '/rest/users-admin');
  xhr.setRequestHeader('X-Auth-Token', token);
  xhr.addEventListener('load', (e) => {
    if(xhr.status >= 200 && xhr.status < 300){
      const data = JSON.parse(xhr.responseText);
      callback(data);
    } else {
      callback([]);
    }
  });
  xhr.send();
}

export function adminVerifyUser(userId, token, callback){
  const data = { userId };
  const dataToSend = JSON.stringify(data);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', window.location.origin + '/rest/verify-user-admin');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('X-Auth-Token', token);
  xhr.addEventListener('load', callback);
  xhr.send(dataToSend);
}