import React, { Component } from 'react';
import Order from './order/Order';
import Cook from './cook/Cook';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Nav from './Nav';

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const orderComponet = ({ match }) => <Order lang={match.params.lang} />;
    const cookComponent = ({ match }) => <Cook lang={match.params.lang} />;
    const defaultComponent = () => <div><Nav lang="en" /> <Cook lang="en" /></div>;
    const navComponent = ({ match }) => <Nav lang={match.params.lang} />;
    return (
      <BrowserRouter>
        <div>
          <Route path="/:lang/" component={navComponent} />
          <Switch>
            <Route path="/:lang/order/" component={orderComponet} />
            <Route path="/:lang/become-chef/" component={cookComponent} />
            <Route path="/" component={defaultComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
