import React from 'react'
import Logo from './logo.png'
import { NavLink, Link } from 'react-router-dom'
import translateComponent from '../utils/translateComponent'

const translations = {
  en: {
    lang: 'English',
    cook: 'Cook and sell food',
    order: 'Order food',
    admin: 'Admin panel'
  },
  he: {
    lang: 'עברית',
    cook: 'תבשל ותמכור',
    order: 'הזמן אוכל',
    admin: 'מערכת ניהול'
  }
}

const MainNav = ({ changeLang, translated, isAdmin }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">
        <img
          src={location.origin + '/public/' + Logo}
          alt="MyChef"
          style={{ height: 34 }}
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/order" activeClassName="active">
              {translated.order}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cook" activeClassName="active">
              {translated.cook}
            </NavLink>
          </li>
          {isAdmin && (
            <NavLink className="nav-link" to="/admin" activeClassName="active">
              {translated.admin}
            </NavLink>
          )}
        </ul>
        <ul className="navbar-nav my-2 my-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {translated.lang}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <button
                className="dropdown-item"
                onClick={() => changeLang('en')}
              >
                English
              </button>
              <button
                className="dropdown-item"
                onClick={() => changeLang('he')}
              >
                עברית
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)

export default translateComponent(MainNav, translations)
