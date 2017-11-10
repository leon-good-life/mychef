import React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NumericInput from 'react-numeric-input';

const Availability = ({lang, quantity, time, handleSubmit}) => {
  const localization = {
    en: {
      availability: 'Dish availability',
      start: 'Start recieve orders',
      quantity: 'How many can you deliver?',
      time: 'How long it takes to cook and deliver?',
      threeHours: '3 hours',
      halfDay: 'Half day',
      oneDay: 'One day',
      cancel: 'Cancel'
    },
    he: {
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
  const values = localization[lang];
  const dishesPath = `/${lang}/cook/dishes/`;
  const inputStyle = {
    input: {
      boxSizing: 'border-box',
      fontSize: '30px',
      padding: '10px',
      width: '100px'
    }
  };
  const formStyle = {
    flexGrow: 1, 
    maxWidth: 500, 
    background: 'white',
    padding: '20px',
    borderRadius: '5px'
  };
  return (
    <MuiThemeProvider>
      <form style={formStyle}
            onSubmit={handleSubmit}>
        <h1>{values.availability}</h1>
        <h2>{values.quantity}</h2>
        <NumericInput value="1" className="form-control" style={inputStyle} />
        <h2>{values.time}</h2>
        <SelectField value="THREE_HOURS">
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
    </MuiThemeProvider>
  );
}

export default Availability;