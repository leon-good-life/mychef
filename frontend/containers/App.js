import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route } from 'react-router-dom'
import MainNav from '../components/MainNav'
import Cook from './Cook'
import Order from './order/Order'
import Admin from './Admin'
import Footer from '../components/Footer'
import * as userActions from '../actions/user'
import * as authActions from '../actions/auth'
import * as uiActions from '../actions/ui'
import * as path from '../utils/path'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }
  render() {
    const lang = this.props.match.params.lang
    const orderComponent = () => <Order lang={lang} />
    const cookComponent = () => (
      <Cook
        isLoggedIn={this.props.auth.isLoggedIn}
        login={this.login}
        logout={this.logout}
        lang={lang}
        orders={this.props.orders}
        fetchUser={this.props.actions.fetchUser}
        user={this.props.user}
        updateUser={this.props.actions.updateUser}
      />
    )
    const adminComponent = () => <Admin lang={lang} logout={this.logout} />
    return (
      <div>
        <MainNav lang={lang} />
        <Switch>
          <Route path={path.COOK} render={cookComponent} />
          <Route path={path.ORDER} render={orderComponent} />
          <Route path={path.ADMIN} render={adminComponent} />
          <Route path={path.HOME} render={orderComponent} />
        </Switch>
        <Footer />
      </div>
    )
  }
  login(googleUser) {
    const _profile = googleUser.getBasicProfile()
    const idToken = googleUser.getAuthResponse().id_token
    this.props.actions.createUser(idToken)
    const profile = {
      id: _profile.getId(),
      name: _profile.getName(),
      email: _profile.getEmail(),
      imgUrl: _profile.getImageUrl()
    }
    this.props.actions.loginSuccess(idToken, profile)
  }
  logout() {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
      this.props.actions.logoutSuccess()
    })
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    admin: state.admin,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { ...userActions, ...authActions, ...uiActions },
    dispatch
  )
})

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App
