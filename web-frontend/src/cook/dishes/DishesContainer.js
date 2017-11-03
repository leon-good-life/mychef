import React from 'react';
import { withRouter } from 'react-router-dom';
import Loading from './Loading';
import Dishes from './Dishes';
import { connect } from 'react-redux';
import { fetchDishes } from '../../store/action-creators/dishes';
import { updateAvailability } from '../../ajax';

class DishesContainer extends React.Component {
  constructor(props){
    super(props);
    this.toggleAvailability = this.toggleAvailability.bind(this);
  }
  render(){
    if (this.props.loading) {
      return <Loading lang={this.props.lang} />;
    }
    return <Dishes lang={this.props.lang} dishes={this.props.data} toggleAvailability={this.toggleAvailability} />;
  }
  componentDidMount(){
    this.props.dispatch(fetchDishes(this.props.idToken));
  }
  toggleAvailability(id, isToggled){
    if (isToggled) {
      const availabilityPath = `/${this.props.lang}/cook/availability/${id}/`;
      this.props.history.push(availabilityPath);
    } else {
      updateAvailability(
        id,
        0,
        "THREE_HOURS",
        this.props.idToken
      ).then(()=>{
        this.props.dispatch(fetchDishes(this.props.idToken));
      });
    }
  }
}

const mapStateToProps = state => {
  return {
    loading: state.dishes.isProcessingRequest,
    data: state.dishes.dishes
  };
};

DishesContainer = connect(mapStateToProps)(DishesContainer);

export default withRouter(DishesContainer);