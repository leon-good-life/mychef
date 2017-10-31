/*---------------
    Users
---------------*/

export function updateUser(name, email, telephone, address, token){
  const data = { name, email, telephone, address };
  const body = JSON.stringify(data);
  const url = window.location.origin + '/rest/user';
  const method = 'POST';
  let headers = {};
  headers['X-Auth-Token'] = token;
  headers['Content-Type'] = 'application/json';
  return fetch(url, { method, headers, body})
    .then(response => Promise.resolve(response.text()));
}

export function getUser(token){
  const url = window.location.origin + '/rest/user';
  let headers = {};
  headers['X-Auth-Token'] = token;
  return fetch(url, { headers })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response.json());
      }
      return Promise.reject(new Error(response.statusText));
  });
}

export function createUser(token){
  const url = window.location.origin + '/rest/user';
  const method = 'PUT';
  let headers = {};
  headers['X-Auth-Token'] = token;
  return fetch(url, {method, headers})
    .then((response) => {
      console.log('Signed in as: ' + response.text());
  });
}

/*---------------
    Dishes
---------------*/

export function createDish(name, description, image, price, token){
  const data = { name, description, image, price };
  const body = JSON.stringify(data);
  const url = window.location.origin + '/rest/dish';
  const method = 'PUT';
  let headers = {};
  headers['X-Auth-Token'] = token;
  headers['Content-Type'] = 'application/json';
  return fetch(url, {method, headers, body})
    .then(response => Promise.resolve(response.text()));
}

export function updateDish(id, name, description, image, price, token){
  const data = { id, name, description, image, price };
  const body = JSON.stringify(data);
  const url = window.location.origin + '/rest/dish';
  const method = 'POST';
  let headers = {};
  headers['X-Auth-Token'] = token;
  headers['Content-Type'] = 'application/json';
  return fetch(url, { method, headers, body})
    .then(response => Promise.resolve(response.text()));
}

export function getDish(id, token){
  const xhr = new XMLHttpRequest();
  const url = window.location.origin + '/rest/dish?id=' + id;
  let headers = {};
  headers['X-Auth-Token'] = token;
  return fetch(url, {headers})
    .then(response => {
      if(response.status >= 200 && response.status < 300){
        return Promise.resolve(response.json());
      }
      return Promise.reject(new Error(response.statusText));
    });
}

export function getDishes(token){
  const url = window.location.origin + '/rest/dish';
  let headers = {};
  headers['X-Auth-Token'] = token;
  return fetch(url, {headers})
    .then(response => {
      if(response.status >= 200 && response.status < 300){
        return Promise.resolve(response.json());
      }
      return Promise.reject(new Error(response.statusText));
    });
}

export function deleteDish(id, token) {
  const url = window.location.origin + '/rest/dish';
  const method = 'DELETE';
  let headers = {};
  headers['X-Auth-Token'] = token;
  headers['Content-Type'] = 'application/json';
  const body = JSON.stringify({id});
  return fetch(url, {method, headers, body})
    .then(response => Promise.resolve(response.text()));
}

export function uploadDishImage(data, token, progress, created, error) {
  const xhr = new XMLHttpRequest();
  const url = window.location.origin + '/rest/dish-image';
  const method = 'PUT';
  /*
    Fetch API is not supporing upload progress tracking.
    The only solution right now is to use XMLHttpRequest.
    There is a proposal/standard called Streams API, 
    When it will be implemented by browsers, then rewrite this code:
  */
  xhr.open(method, url, true);
  xhr.setRequestHeader('X-Auth-Token', token);
  xhr.upload.addEventListener('loadstart', e => progress(parseInt((e.loaded / e.total) * 100)));
  xhr.upload.addEventListener('progress', e => progress(parseInt((e.loaded / e.total) * 100)));
  xhr.upload.addEventListener('load', e => progress(parseInt((e.loaded / e.total) * 100)));
  xhr.addEventListener('load', (e) => {
    if (e.target.status === 201) {
      created(e.target.responseText);
    } else {
      error(e.target.status, e.target.statusText);
    }
  });
  xhr.send(data);
}

export function updateAvailability(id, quantity, time, token) {
  const data = { id, quantity, time };
  const body = JSON.stringify(data);
  const url = window.location.origin + '/rest/dish-availability';
  const method = 'POST';
  let headers = {};
  headers['X-Auth-Token'] = token;
  headers['Content-Type'] = 'application/json';
  return fetch(url, {method, headers, body})
    .then(response => Promise.resolve(response.text()));
}

/*---------------
    Admin
---------------*/

export function adminGetUsers(token){
  const url = window.location.origin + '/rest/users-admin';
  let headers = {};
  headers['X-Auth-Token'] = token;
  return fetch(url, {headers})
    .then(response => {
      if(response.status >= 200 && response.status < 300){
        return Promise.resolve(response.json());
      }
      return Promise.reject(new Error(response.statusText));
    });
}

export function adminVerifyUser(userId, token){
  const data = { userId };
  const body = JSON.stringify(data);
  const url = window.location.origin + '/rest/verify-user-admin';
  const method = 'POST';
  let headers = {};
  headers['X-Auth-Token'] = token;
  headers['Content-Type'] = 'application/json';
  return fetch(url, {method, headers, body})
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response.json());
      }
      return Promise.reject(new Error(response.statusText));
});
}