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
  console.log('createUser');
  const xhr = new XMLHttpRequest();
  xhr.open('POST', window.location.origin + '/create-user');
  xhr.setRequestHeader('X-Auth-Token', idToken);
  xhr.addEventListener('load', function() {
    console.log('Signed in as: ' + xhr.responseText);
  });
  xhr.send();
}

function updateDish(id, name, description, user){
  // todo
  console.log('updateDish');
  const data = { id, name, description, user };
  const dataToSend = JSON.stringify(data);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', window.location.origin + '/dish');
  xhr.setRequestHeader('X-Auth-Token', idToken);
  xhr.addEventListener('load', function() {
    console.log(xhr.responseText);
  });
  xhr.send();
}

export { updateUser, getUser, createUser };