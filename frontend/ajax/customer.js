export function getDishes(token) {
  const url = window.location.origin + '/public/dish'
  return fetch(url).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.json())
    }
    return Promise.reject(new Error(response.statusText))
  })
}

export function createOrder(dish, token) {
  const data = { dish }
  const body = JSON.stringify(data)
  const url = window.location.origin + '/rest/customer/order'
  const method = 'PUT'
  let headers = {}
  headers['X-Auth-Token'] = token
  headers['Content-Type'] = 'application/json'
  return fetch(url, { method, headers, body }).then(response =>
    Promise.resolve(response.text())
  )
}