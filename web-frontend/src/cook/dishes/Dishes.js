import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './Dishes.css';
import Dish from './Dish';
import AddNewDishButton from './AddNewDishButton';

const Dishes = ({lang, dishes, toggleAvailability}) => {
  return (
    <MuiThemeProvider>
      <div className="dishes">
        {dishes.map(dish=><Dish dish={dish} lang={lang} toggleAvailability={toggleAvailability} />)}
        <AddNewDishButton lang={lang} />
      </div>
    </MuiThemeProvider>
  );
};

export default Dishes;