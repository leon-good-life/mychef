import React from 'react'
import { NavLink } from 'react-router-dom'
import translateComponent from '../../utils/translateComponent'
import * as path from '../../path'

const translations = {
  en: {
    users: 'Users',
    dishes: 'Dishes',
    orders: 'Orders',
    logout: 'Logout'
  },
  he: {
    users: 'משתמשים',
    dishes: 'מנות',
    orders: 'הזמנות',
    logout: 'התנתק'
  }
}

const AdminNav = ({ logout, translated, lang }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
    <div className="container">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to={path.admin_users(lang)}>
            {translated.users}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={path.admin_dishes(lang)}>
            {translated.dishes}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={path.admin_orders(lang)}>
            {translated.orders}
          </NavLink>
        </li>
      </ul>
      <ul className="navbar-nav my-2 my-lg-0">
        <li className="nav-item">
          <button className="btn btn-primary" onClick={logout}>
            {translated.logout}
          </button>
        </li>
      </ul>
    </div>
  </nav>
)

export default translateComponent(AdminNav, translations)
