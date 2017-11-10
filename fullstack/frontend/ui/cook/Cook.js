import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Join from './Join'
import CookNav from './CookNav'
import Contact from './Contact'
import Dishes from './Dishes'
import DishForm from './DishForm'
import Orders from './Orders'

const Cook = ({ isLoggedIn, login, logout, lang, dishes, orders }) => {
  if (isLoggedIn) {
    const contactComponent = () => <Contact lang={lang} />
    const dishesComponent = () => <Dishes dishes={dishes} lang={lang} />
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
            <Route path="/cook/contact" render={contactComponent} />
            <Route path="/cook/dishes" render={dishesComponent} />
            <Route path="/cook/orders" render={ordersComponent} />
            <Route path="/cook" render={contactComponent} exact />
          </Switch>
        </div>
      </div>
    )
  }
  return <Join login={login} lang={lang} />
}

export default Cook
