export function getUsers(token) {
  const url = window.location.origin + '/rest/admin/users';
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

export function verifyUser(userId, token) {
  const data = { userId };
  const body = JSON.stringify(data);
  const url = window.location.origin + '/rest/admin/verify-user';
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