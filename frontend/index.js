import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/main.css'
import App from './containers/App'
import store from './reducers/store'
import * as path from './path'

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultLang: 'en'
    }
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path={path.HOME} component={App} />
            <Route
              path="/"
              exact
              render={() => <Redirect to={path.home(this.state.defaultLang)} />}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
