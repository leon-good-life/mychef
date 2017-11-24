export function createOrder(dish, token) {
  const data = { dish }
  const body = JSON.stringify(data)
  const url = window.location.origin + '/rest/order'
  const method = 'PUT'
  let headers = {}
  headers['X-Auth-Token'] = token
  headers['Content-Type'] = 'application/json'
  return fetch(url, { method, headers, body }).then(response =>
    Promise.resolve(response.text())
  )
}
