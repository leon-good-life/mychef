import React from 'react';
import { withRouter } from 'react-router-dom';
import { updateDishAvailability } from '../../store/action-creators/dishes';
import Loading from './Loading';
import Availability from './Availability';
import './Availability.css';

class AvailabilityContainer extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      quantity: 3,
      time: "THREE_HOURS",
    };
  }
  render(){
    return (
      <Availability lang={this.props.lang} 
                    quantity={this.state.quantity}
                    time={this.state.time}
                    handleSubmit={this.handleSubmit} />
    );
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.dispatch(updateDishAvailability(
      this.props.match.params.dishId,
      this.state.quantity,
      this.state.time,
      this.props.idToken
    )).then(() => {
      const dishesPath = `/${this.props.lang}/cook/dishes/`;
      this.props.history.push(dishesPath);
    });
  }
}

AvailabilityContainer = connect()(AvailabilityContainer);

export default withRouter(AvailabilityContainer);