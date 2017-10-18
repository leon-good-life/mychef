import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CookNav from './CookNav';
import ContactInfo from './ContactInfo';
import Dishes from './Dishes';
import AddNewDish from './AddNewDish';

class Dashboard extends React.Component {
  render() {
    const contactInfo = () => <ContactInfo lang={this.props.lang} profile={this.props.profile} idToken={this.props.idToken} />;
    const dishes = () => <Dishes lang={this.props.lang} idToken={this.props.idToken} />;
    const addNewDish = () => <AddNewDish lang={this.props.lang} idToken={this.props.idToken} />;
    return (
      <div dir={this.props.lang === 'he' ? 'rtl' : 'ltr'}>
        <CookNav lang={this.props.lang} profile={this.props.profile} handleGoogleLogout={this.props.handleGoogleLogout} />
        <div className="form-container">
          <Switch>
            <Route path="/:lang/cook/contact-info/" component={contactInfo} />
            <Route path="/:lang/cook/add-new-dish/" component={addNewDish} />
            <Route path="/:lang/cook/dishes/" component={dishes} />
            <Route path="/:lang/cook/" component={contactInfo} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;