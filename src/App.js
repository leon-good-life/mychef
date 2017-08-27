import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Order from './order/Order';
import BecomeChef from './become-chef/BecomeChef';
import SelectLang from './select-lang/SelectLang';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import logo from './logo.png';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

class App extends Component {
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
    const orderComponet = ({ match }) => <Order lang={match.params.lang} />;
    const becomeChefComponent = ({ match }) => <BecomeChef lang={match.params.lang} />;
    const navComponent = ({ match }) => {
      const values = localization[match.params.lang];
      return (
      <nav className="global-nav" dir={match.params.lang === 'he' ? 'rtl' : 'ltr'}>
        <img src={logo} alt="My Chef" className="logo" />
        <FlatButton label={values.orderFood} href={'/' +match.params.lang + '/order/'} />
        <FlatButton label={values.cookAndSellFood} href={'/' + match.params.lang + '/become-chef/'} />
        <SelectLang selected={match.params.lang} handleChange={this.handleChange} />
      </nav>
    )};
    return (
      <BrowserRouter>
        <div>
          <Route path="/:lang/" component={navComponent} />
          <Route path="/:lang/order/" component={orderComponet} />
          <Route path="/:lang/become-chef/" component={becomeChefComponent} />
        </div>
      </BrowserRouter>
    );
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

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default App;
