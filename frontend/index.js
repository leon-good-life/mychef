import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './ui/main.css'
import App from './ui/App'
import { Provider } from 'react-redux'
import store from './store/store'

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      isAdmin: true
    }
  }
  render() {
    return (
      <Provider store={store}>
        <App orders={this.state.orders} isAdmin={this.state.isAdmin} />
      </Provider>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
