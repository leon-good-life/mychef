export function updateUser(name, email, telephone, address, idToken, callback){
  console.log('updateUser');
  const data = { name, email, telephone, address };
  const dataToSend = JSON.stringify(data);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', window.location.origin + '/user');
  xhr.setRequestHeader('X-Auth-Token', idToken);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', callback);
  console.log(dataToSend);
  xhr.send(dataToSend);
}

export function getUser(callback, idToken){
  console.log('getUser');
  const xhr = new XMLHttpRequest();
  xhr.open('GET', window.location.origin + '/user');
  xhr.setRequestHeader('X-Auth-Token', idToken);
  xhr.addEventListener('load', () => {
    if(xhr.status >= 200 && xhr.status < 300){
      const data = JSON.parse(xhr.responseText);
      callback(data);
    }
  });
  xhr.send();
}

export function createUser(idToken){
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', window.location.origin + '/user');
  xhr.setRequestHeader('X-Auth-Token', idToken);
  xhr.addEventListener('load', function() {
    console.log('Signed in as: ' + xhr.responseText);
  });
  xhr.send();
}

export function createDish(name, description, image, price, token, callback){
  const data = { name, description, image, price };
  const dataToSend = JSON.stringify(data);
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', window.location.origin + '/dish');
  xhr.setRequestHeader('X-Auth-Token', token);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', callback);
  xhr.send(dataToSend);
}

export function updateDish(id, name, description, image, price, token, callback){
  const data = { id, name, description, image, price };
  const dataToSend = JSON.stringify(data);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', window.location.origin + '/dish');
  xhr.setRequestHeader('X-Auth-Token', token);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', callback);
  xhr.send(dataToSend);
}

export function getDish(id, token, callback){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', window.location.origin + '/dish?id=' + id);
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
  xhr.open('GET', window.location.origin + '/dish');
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
  xhr.open('DELETE', window.location.origin + '/dish');
  xhr.setRequestHeader('X-Auth-Token', token);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', callback);
  xhr.send(JSON.stringify({id}));
}

export function uploadDishImage(data, token, progress, created, error) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', window.location.origin + '/dish-image', true);
  xhr.setRequestHeader('X-Auth-Token', token);
  xhr.upload.addEventListener('progress', function (e) {
    if (e.lengthComputable) {
      var percentLoaded = Math.round((e.loaded / e.total) * 100);
      progress(percentLoaded, e.loaded, e.total);
    }
  });
  xhr.addEventListener('load', function (e) {
    if (e.target.status === 201) {
      created(e.target.responseText);
    } else {
      error(e.target.status, e.target.statusText);
    }
  });
  xhr.send(data);
}