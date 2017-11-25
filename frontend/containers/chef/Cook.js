import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ContactContainer from './ContactContainer'
import DishesContainer from './DishesContainer'
import AddDish from './AddDish'
import EditDish from './EditDish'
import Join from '../../components/chef/Join'
import Nav from '../../components/chef/Nav'
import Orders from '../../components/chef/Orders'
import * as path from '../../path'

let Cook = ({ isLoggedIn, logout, lang, orders, profile, login }) => {
  if (!isLoggedIn) {
    return (
      <Join
        login={login}
        lang={lang}
      />
    )
  }
  return (
    <div>
      <Nav logout={logout} lang={lang} profile={profile} />
      <div className="container">
        <Switch>
          <Route
            path={path.COOK_CONTACT}
            render={() => <ContactContainer lang={lang} />}
          />
          <Route
            path={path.COOK_DISHES_ADD}
            render={() => <AddDish lang={lang} />}
          />
          <Route
            path={path.COOK_DISHES_EDIT}
            render={() => <EditDish lang={lang} />}
          />
          <Route
            path={path.COOK_DISHES}
            render={() => <DishesContainer lang={lang} />}
          />
          <Route
            path={path.COOK_ORDERS}
            render={() => <Orders orders={orders} lang={lang} />}
          />
          <Route
            path={path.COOK}
            render={() => <ContactContainer lang={lang} />}
            exact
          />
        </Switch>
      </div>
    </div>
  )
}

export default Cook
