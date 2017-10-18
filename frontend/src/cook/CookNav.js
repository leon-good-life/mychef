import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

class CookNav extends React.Component {
  render() {
    const localization = {
      en: {
        logout: 'Sign out',
        hello: 'Hello',
        dishes: 'Dishes',
        contactInfo: 'Edit contact inforamation'
      },
      he: {
        logout: 'התנתק',
        hello: 'שלום',
        dishes: 'מאכלים',
        contactInfo: 'ערוך פרטי קשר'
      }
    };
    const values = localization[this.props.lang];
    const dishesPath = `/${this.props.lang}/cook/dishes/`;
    const contactInfoPath = `/${this.props.lang}/cook/contact-info/`;
    return (
      <nav className="second-nav" dir={this.props.lang === 'he' ? 'rtl' : 'ltr'}>
        <span
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >{values.hello}&nbsp;	 <Avatar src={this.props.profile.imgUrl} size={30} /> &nbsp;{this.props.profile.name}</span>
        <FlatButton 
          containerElement={<Link to={dishesPath} />}
          label={values.dishes}
          labelStyle={{textTransform: 'none'}} />
        <FlatButton 
          containerElement={<Link to={contactInfoPath} />}
          label={values.contactInfo}
          labelStyle={{textTransform: 'none'}} />
        <RaisedButton label={values.logout} onClick={this.props.handleGoogleLogout} labelStyle={{textTransform: 'none'}} />
      </nav>
    );
  }
  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }
}

CookNav.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default CookNav;