import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Logo from './logo.png'
import { NavLink, Link } from 'react-router-dom'
import translateComponent from '../utils/translateComponent'
import * as path from '../path'

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

let MainNav = ({ translated, isAdmin, lang }) => {
  return (
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
              <NavLink
                className="nav-link"
                to={path.order(lang)}
                activeClassName="active"
              >
                {translated.order}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={path.cook(lang)}
                activeClassName="active"
              >
                {translated.cook}
              </NavLink>
            </li>
            {isAdmin && (
              <NavLink
                className="nav-link"
                to={path.admin(lang)}
                activeClassName="active"
              >
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
                <Link to={path.changeLang('en')} className="dropdown-item">
                  English
                </Link>
                <Link to={path.changeLang('he')} className="dropdown-item">
                  עברית
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

MainNav = translateComponent(MainNav, translations)

const mapStateToProps = state => ({
  isAdmin: (state.chef.contact && state.chef.contact.isAdmin) || false
})

MainNav = connect(mapStateToProps)(MainNav)

export default MainNav
