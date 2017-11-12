import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ContactContainer from './ContactContainer'
import DishesContainer from './DishesContainer'
import AddDish from './AddDish'
import EditDish from './EditDish'
import Join from '../components/cook/Join'
import CookNav from '../components/cook/CookNav'
import Orders from '../components/cook/Orders'

const Cook = ({ isLoggedIn, login, logout, lang, orders }) => {
  if (!isLoggedIn) {
    return <Join login={login} lang={lang} />
  }
  const ordersComponent = () => <Orders orders={orders} lang={lang} />
  return (
    <div>
      <CookNav logout={logout} lang={lang} />
      <div className="container">
        <Switch>
          <Route path="/cook/add" component={AddDish} />
          <Route path="/cook/edit/:dishId" component={EditDish} />
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
