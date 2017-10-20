import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CookNav from './CookNav';
import ContactInfo from './ContactInfo';
import Dishes from './Dishes';
import AddNewDish from './dish-form/AddNewDish';
import EditDish from './dish-form/EditDish';
import ConfirmDelete from './ConfirmDelete';
import Availability from './Availability';

class Dashboard extends React.Component {
  render() {
    const contactInfo = () => <ContactInfo lang={this.props.lang} profile={this.props.profile} idToken={this.props.idToken} />;
    const dishes = () => <Dishes lang={this.props.lang} idToken={this.props.idToken} />;
    const addNewDish = () => <AddNewDish lang={this.props.lang} idToken={this.props.idToken} />;
    const editDish = () => <EditDish lang={this.props.lang} idToken={this.props.idToken} />;
    const confirmDelete = () => <ConfirmDelete lang={this.props.lang} idToken={this.props.idToken} />;
    const availability = () => <Availability lang={this.props.lang} idToken={this.props.idToken} />;
    return (
      <div dir={this.props.lang === 'he' ? 'rtl' : 'ltr'}>
        <CookNav lang={this.props.lang} profile={this.props.profile} handleGoogleLogout={this.props.handleGoogleLogout} />
        <div className="form-container">
          <Switch>
            <Route path="/:lang/cook/contact-info/" component={contactInfo} />
            <Route path="/:lang/cook/dishes/" component={dishes} />
            <Route path="/:lang/cook/add-new-dish/" component={addNewDish} />
            <Route path="/:lang/cook/confirm-delete/:dishId/" component={confirmDelete} />
            <Route path="/:lang/cook/edit-dish/:dishId/" component={editDish} />
            <Route path="/:lang/cook/availability/:dishId/" component={availability} />
            <Route path="/:lang/cook/" component={contactInfo} />
            <Route path="/:lang/" component={contactInfo} />
            <Route path="/" component={contactInfo} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;