import React from 'react';
import DishForm from './DishForm';
import './Dishes.css';
import { getDishes } from '../ajax';

class Dishes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      data: null
    };
  }
  render(){
    let dishes = '';
    if (this.state.loading) {
      dishes = <div>Loading...</div>;
    } else {
      dishes = this.state.data.map((dish, i)=>(
        <div key={i}>
          <h1>{dish.name}</h1>
          <div>{dish.description}</div>
        </div>
      ));
    }
    return (
      <div className="dishes">
        {dishes}
        <div className="add-new-dish">
          <DishForm lang={this.props.lang} idToken={this.props.idToken} />
        </div>
      </div>
    );
  }
  componentDidMount(){
    getDishes(
      this.props.idToken,
      (data) => {
        this.setState({
          loading: false,
          data
        });
      }
    );
  }
}

export default Dishes;