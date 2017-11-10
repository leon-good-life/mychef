import React from 'react'
import { NavLink } from 'react-router-dom'
import translateComponent from '../../utils/translateComponent'

const translations = {
  en: {
    edit: 'Edit contact information',
    dishes: 'Dishes',
    orders: 'Orders',
    logout: 'Logout'
  },
  he: {
    edit: 'ערוך פרטי קשר',
    dishes: 'מנות',
    orders: 'הזמנות',
    logout: 'התנתק'
  }
}

const CookNav = ({ logout, translated }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
    <div className="container">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/cook/contact">
            {translated.edit}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/cook/dishes">
            {translated.dishes}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/cook/orders">
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

export default translateComponent(CookNav, translations)
