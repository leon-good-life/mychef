import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route } from 'react-router-dom'
import AdminNav from '../components/admin/AdminNav'
import Users from '../components/admin/Users'
import Dishes from '../components/admin/Dishes'
import Orders from '../components/admin/Orders'
import * as adminActions from '../actions/admin'
import * as path from '../utils/path'

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
            <Route path={path.ADMIN_USERS} render={usersComponent} />
            <Route path={path.ADMIN_DISHES} render={dishsComponent} />
            <Route path={path.ADMIN_ORDERS} render={ordersComponent} />
            <Route path={path.ADMIN} render={usersComponent} />
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
  users: state.admin.adminUsers,
  loading: state.admin.isProcessingRequest,
  token: state.auth.token
})

Admin = connect(mapStateToProps, mapDispatchToProps)(Admin)

export default Admin
