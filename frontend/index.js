import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './ui/main.css'
import App from './ui/App'
import { dishesArr } from './mock-data'
import { Provider } from 'react-redux'
import store from './store/store'

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      isAdmin: true,
      dishes: dishesArr
    }
  }
  render() {
    return (
      <Provider store={store}>
        <App
          dishes={this.state.dishes}
          orders={this.state.orders}
          isAdmin={this.state.isAdmin}
        />
      </Provider>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
