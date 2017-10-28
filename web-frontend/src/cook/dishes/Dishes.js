import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './Dishes.css';
import Dish from './Dish';
import AddNewDishButton from './AddNewDishButton';

const Dishes = ({lang, dishes}) => {
  return (
    <MuiThemeProvider>
      <div className="dishes">
        {dishes.map(dish=><Dish dish={dish} lang={lang} />)}
        <AddNewDishButton lang={lang} />
      </div>
    </MuiThemeProvider>
  );
};

export default Dishes;