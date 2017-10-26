import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateAvailability, getDish } from '../ajax';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class Availability extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isLoading: true
    };
  }
  render(){
    const localization = {
      en: {
        loading: 'Loading...',
        availability: 'Dish availability',
        start: 'Start recieve orders',
        quantity: 'How many you can deliver?',
        time: 'How long it takes to cook and deliver?',
        threeHours: '3 hours',
        halfDay: 'Half day',
        oneDay: 'One day',
        cancel: 'Cancel'
      },
      he: {
        loading: 'טוען...',
        availability: 'זמינות המנה',
        start: 'התחל לקבל הזמנות',
        quantity: 'כמה מנות אתה יכול לספק?',
        time: 'כמה זמן לוקחת בישול וההספקה?',
        threeHours: '3 שעות',
        halfDay: 'חצי יום',
        oneDay: 'יום',
        cancel: 'בטל'
      }
    };
    const values = localization[this.props.lang];
    if (this.state.isLoading) {
      return <h1>{values.loading}</h1>;
    }
    const dishesPath = `/${this.props.lang}/cook/dishes/`;
    return (
      <form style={{flexGrow:1, maxWidth:500, background: 'white',padding: '20px',borderRadius: '5px'}}
            onSubmit={this.handleSubmit}>
        <h1>{values.availability}</h1>
        <h2>{values.quantity}</h2>

        <h2>{values.time}</h2>
        <SelectField value={this.props.lang} onChange={this.handleChange}>
          <MenuItem 
            value="THREE_HOURS" 
            primaryText={values.threeHours} />
          <MenuItem
            value="HALF_DAY" 
            primaryText={values.halfDay} />
          <MenuItem
            value="ONE_DAY" 
            primaryText={values.oneDay} />
        </SelectField>
        <br/>
        <RaisedButton label={values.start} 
                      type="submit" 
                      labelStyle={{textTransform: 'none'}}
                      style={{margin: '0 5px'}} />
        <RaisedButton label={values.cancel} 
                      style={{margin: '0 5px'}}
                      labelStyle={{textTransform: 'none'}}
                      containerElement={<Link to={dishesPath} />} />
      </form>
    );
  }
  componentDidMount(){
    getDish(
      this.props.match.params.dishId,
      this.props.idToken
    ).then((dish) => {
      this.setState({dishName: dish.name, isLoading: false});
    });
  }
  handleSubmit(e){
    e.preventDefault();
    this.setState({
      loading: true
    });
    updateAvailability(
      this.props.match.params.dishId,
      this.state.quantity,
      this.state.time,
      this.props.idToken,
      () => {
        const dishesPath = `/${this.props.lang}/cook/dishes/`;
        this.props.history.push(dishesPath);
      }
    );
  }
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }
}

Availability.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default withRouter(Availability);