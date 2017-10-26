import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import logo from './logo.png';

class MainNav extends Component {
  render() {
    const localization = {
      en: {
        orderFood: 'Order food',
        cookAndSellFood: 'Cook and sell food'
      },
      he: {
        orderFood: 'הזמן אוכל',
        cookAndSellFood: 'תבשל ותמכור'
      }
    };
    const values = localization[this.props.lang];
    const orderPath = `/${this.props.lang}/order/`;
    const cookPath = `/${this.props.lang}/cook/`;
    const langPath = lang => {
      if(window.location.pathname === '/'){
        return `/${lang}/cook`;
      }
      return window.location.pathname.replace(/\/\w\w\//, `/${lang}/`);
    }
    return (
      <nav className="global-nav" dir={this.props.lang === 'he' ? 'rtl' : 'ltr'}>
        <Link to={cookPath}><img src={logo} alt="My Chef" className="logo" /></Link>
        <FlatButton 
          containerElement={<Link to={orderPath} />}
          label={values.orderFood}
          labelStyle={{textTransform: 'none'}} />
        <FlatButton 
          containerElement={<Link to={cookPath} />}
          label={values.cookAndSellFood}
          labelStyle={{textTransform: 'none'}} />
        <SelectField value={this.props.lang} onChange={this.handleChange}>
          <MenuItem 
            value="en" 
            primaryText="English" 
            containerElement={<Link to={langPath('en')} />} />
          <MenuItem
            value="he" 
            primaryText="Hebrew - עברית" 
            containerElement={<Link to={langPath('he')} />} />
        </SelectField>
      </nav>
    )
  }
  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }
}

MainNav.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default MainNav;

