import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ContactContainer from './ContactContainer'
import DishesContainer from './DishesContainer'
import AddDish from './AddDish'
import EditDish from './EditDish'
import Join from '../components/cook/Join'
import CookNav from '../components/cook/CookNav'
import Orders from '../components/cook/Orders'
import * as path from '../utils/path'

const Cook = ({ isLoggedIn, login, logout, lang, orders }) => {
  if (!isLoggedIn) {
    return <Join login={login} lang={lang} />
  }
  return (
    <div>
      <CookNav logout={logout} lang={lang} />
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
