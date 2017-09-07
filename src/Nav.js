import React, { Component } from 'react';
import logo from './logo.png';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import SelectLang from './select-lang/SelectLang';

class Nav extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
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
    return (
      <nav className="global-nav" dir={this.props.lang === 'he' ? 'rtl' : 'ltr'}>
        <img src={logo} alt="My Chef" className="logo" />
        <FlatButton label={values.orderFood} href={'/' +this.props.lang + '/order/'} />
        <FlatButton label={values.cookAndSellFood} href={'/' + this.props.lang + '/become-chef/'} />
        <SelectLang selected={this.props.lang} handleChange={this.handleChange} />
      </nav>
    )
  }
  handleChange(value){
    const newPath = window.location.pathname.replace(/\/\w\w\//, `/${value}/`);
    window.location = window.location.origin + newPath;
  }
  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }
}

Nav.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default Nav;

