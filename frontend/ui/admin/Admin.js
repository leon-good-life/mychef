import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route } from 'react-router-dom'
import AdminNav from './AdminNav'
import Users from './Users'
import Dishes from './Dishes'
import Orders from './Orders'
import * as adminActions from '../../store/action-creators/admin'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      loading: true
    }
  }
  render() {
    const usersComponent = () => (
      <Users
        loading={this.state.loading}
        users={this.state.users}
        fetch={() => this.props.actions.adminFetchUsers(this.props.token)}
        lang={this.props.lang}
      />
    )
    const dishsComponent = () => <Dishes />
    const ordersComponent = () => <Orders />
    return (
      <div>
        <AdminNav lang={this.props.lang} logout={this.props.logout} />
        <div className="container">
          <Switch>
            <Route path="/admin/users" render={usersComponent} />
            <Route path="/admin/dishes" render={dishsComponent} />
            <Route path="/admin/orders" render={ordersComponent} />
            <Route path="/admin" render={usersComponent} exact />
          </Switch>
        </div>
      </div>
    )
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.users,
      loading: nextProps.isProcessingRequest
    })
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(adminActions, dispatch)
})

const mapStateToProps = state => ({
  lang: state.ui.language,
  users: state.admin.adminUsers,
  loading: state.admin.isProcessingRequest,
  token: state.auth.token
})

Admin = connect(mapStateToProps, mapDispatchToProps)(Admin)

export default Admin
