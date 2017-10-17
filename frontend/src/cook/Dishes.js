import React from 'react';
import DishForm from './DishForm';
import './Dishes.css';

class Dishes extends React.Component {
  render(){
    return (
      <div>
        <div className="add-new-dish">
          <DishForm lang={this.props.lang} idToken={this.props.idToken} />
        </div>
      </div>
    );
  }
}

export default Dishes;