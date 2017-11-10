import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Logo from './logo.png'
import { NavLink, Link } from 'react-router-dom'
import translateComponent from '../utils/translateComponent'
import * as uiActions from '../store/action-creators/ui'

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

let MainNav = ({ setLanguage, translated, isAdmin }) => {
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
                to="/order"
                activeClassName="active"
              >
                {translated.order}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cook" activeClassName="active">
                {translated.cook}
              </NavLink>
            </li>
            {isAdmin && (
              <NavLink
                className="nav-link"
                to="/admin"
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
                <button
                  className="dropdown-item"
                  onClick={() => setLanguage('en')}
                >
                  English
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => setLanguage('he')}
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
}

MainNav = translateComponent(MainNav, translations)

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators(uiActions, dispatch)
  return {
    setLanguage: actions.setLanguage
  }
}

const mapStateToProps = state => ({
  lang: state.ui.language,
  isAdmin: (state.user.user && state.user.user.isAdmin) || false
})

MainNav = connect(mapStateToProps, mapDispatchToProps)(MainNav)

export default MainNav
