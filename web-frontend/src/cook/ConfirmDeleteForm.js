import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const ConfirmDeleteForm = ({lang, handleSubmit, dishName}) => {
  const localization = {
    en: {
      question: 'Are you sure you want to delete',
      delete: 'Confirm Delete',
      cancel: 'Cancel'
    },
    he: {
      question: 'האם באמת למחוק את',
      delete: 'אשר מחיקה',
      cancel: 'בטל'
    }
  };
  const values = localization[lang];
  const dishesPath = `/${lang}/cook/dishes/`;
  return (
    <MuiThemeProvider>
      <form style={{flexGrow:1, maxWidth:500, background: 'white',padding: '20px',borderRadius: '5px'}}
            onSubmit={handleSubmit}>
        <h1>{values.question} {dishName}?</h1>
        <RaisedButton label={values.delete} 
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
};

export default ConfirmDeleteForm;