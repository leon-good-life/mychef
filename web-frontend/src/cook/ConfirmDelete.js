import React from 'react';
import { withRouter } from 'react-router-dom';
import Loading from './Loading';
import ConfirmDeleteForm from './ConfirmDeleteForm';
import { connect } from 'react-redux';
import { deleteDish } from '../store/action-creators/dishes';

class ConfirmDelete extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isLoading: false
    };
  }
  render(){
    if (this.state.isLoading) {
      return <Loading lang={this.props.lang} />;
    }
    const dish = this.props.dishes.find(dish=>dish.id===this.props.match.params.dishId);
    return <ConfirmDeleteForm 
              lang={this.props.lang} 
              handleSubmit={this.handleSubmit} 
              dishName={dish.name} />
  }
  handleSubmit(e){
    e.preventDefault();
    this.setState({
      isLoading: true
    });
    this.props.dispatch(deleteDish(
      this.props.match.params.dishId,
      this.props.idToken
    )).then(()=>{
      const dishesPath = `/${this.props.lang}/cook/dishes/`;
      this.props.history.push(dishesPath);
    });
  }
}

const mapStateToProps = state => {
  return {
    dishes: state.dishes.dishes
  };
};

ConfirmDelete = connect(mapStateToProps)(ConfirmDelete);

export default withRouter(ConfirmDelete);