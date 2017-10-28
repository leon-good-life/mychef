import React from 'react';
import Loading from './Loading';
import Dishes from './Dishes';
import { connect } from 'react-redux';
import { getDishes } from '../../store/action-creators/dishes';

class DishesContainer extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    if (this.props.loading) {
      return <Loading lang={this.props.lang} />;
    }
    return <Dishes lang={this.props.lang} dishes={this.props.data} />;
  }
  componentDidMount(){
    this.props.dispatch(getDishes(this.props.idToken));
  }
}

const mapStateToProps = state => {
  return {
    loading: state.dishes.isFetching,
    data: state.dishes.dishes
  };
};

DishesContainer = connect(mapStateToProps)(DishesContainer);


export default DishesContainer;