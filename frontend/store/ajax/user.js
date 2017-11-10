export function updateUser(name, email, telephone, address, token) {
  const data = { name, email, telephone, address }
  const body = JSON.stringify(data)
  const url = window.location.origin + '/rest/user'
  const method = 'POST'
  let headers = {}
  headers['X-Auth-Token'] = token
  headers['Content-Type'] = 'application/json'
  return fetch(url, { method, headers, body }).then(response =>
    Promise.resolve(response.json())
  )
}

export function fetchUser(token) {
  const url = window.location.origin + '/rest/user'
  let headers = {}
  headers['X-Auth-Token'] = token
  return fetch(url, { headers }).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.json())
    }
    return Promise.reject(new Error(response.statusText))
  })
}

export function createUser(token) {
  const url = window.location.origin + '/rest/user'
  const method = 'PUT'
  let headers = {}
  headers['X-Auth-Token'] = token
  return fetch(url, { method, headers }).then(response => {
    console.log('Signed in as: ' + response.text())
  })
}
