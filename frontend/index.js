import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/main.css'
import App from './containers/App'
import store from './reducers/store'

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
