function updateUser(name, email, telephone, address, idToken){
  console.log('updateUser');
  const data = { name, email, telephone, address };
  const dataToSend = JSON.stringify(data);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', window.location.origin + '/user');
  xhr.setRequestHeader('X-Auth-Token', idToken);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', () => {
    console.log(xhr.responseText);
    alert('Contact details updated successfully.');
  });
  console.log(dataToSend);
  xhr.send(dataToSend);
}

function getUser(callback, idToken){
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

function createUser(idToken){
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', window.location.origin + '/user');
  xhr.setRequestHeader('X-Auth-Token', idToken);
  xhr.addEventListener('load', function() {
    console.log('Signed in as: ' + xhr.responseText);
  });
  xhr.send();
}

function createDish(name, description, token, callback){
  const data = { name, description };
  const dataToSend = JSON.stringify(data);
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', window.location.origin + '/dish');
  xhr.setRequestHeader('X-Auth-Token', token);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', callback);
  xhr.send(dataToSend);
}

export { updateUser, getUser, createUser, createDish };