import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Join from './Join'
import CookNav from './CookNav'
import ContactContainer from './ContactContainer'
import DishesContainer from './DishesContainer'
import DishForm from './DishForm'
import Orders from './Orders'

const Cook = ({ isLoggedIn, login, logout, lang, dishes, orders }) => {
  if (!isLoggedIn) {
    return <Join login={login} lang={lang} />
  }
  const addDishComponent = () => <DishForm lang={lang} type="add" />
  const editDishComponent = () => <DishForm lang={lang} type="edit" />
  const ordersComponent = () => <Orders orders={orders} lang={lang} />
  return (
    <div>
      <CookNav logout={logout} lang={lang} />
      <div className="container">
        <Switch>
          <Route path="/cook/add" render={addDishComponent} />
          <Route path="/cook/edit" render={editDishComponent} />
          <Route path="/cook/contact" component={ContactContainer} />
          <Route path="/cook/dishes" component={DishesContainer} />
          <Route path="/cook/orders" render={ordersComponent} />
          <Route path="/cook" component={ContactContainer} exact />
        </Switch>
      </div>
    </div>
  )
}

export default Cook
