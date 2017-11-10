import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AdminNav from './AdminNav'
import Users from './Users'
import Dishes from './Dishes'
import Orders from './Orders'

const Admin = ({ lang }) => {
  const usersComponent = () => <Users />
  const dishsComponent = () => <Dishes />
  const ordersComponent = () => <Orders />
  return (
    <div>
      <AdminNav lang={lang} />
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

export default Admin
