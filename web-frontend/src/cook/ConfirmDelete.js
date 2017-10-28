import React from 'react';
import { withRouter } from 'react-router-dom';
import { deleteDish, getDish } from '../ajax';
import Loading from './Loading';
import ConfirmDeleteForm from './ConfirmDeleteForm';

class ConfirmDelete extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isLoading: true
    };
  }
  render(){
    if (this.state.isLoading) {
      return <Loading lang={this.props.lang} />;
    }
    return <ConfirmDeleteForm 
              lang={this.props.lang} 
              handleSubmit={this.handleSubmit} 
              dishName={this.state.dishName} />
  }
  componentDidMount(){
    getDish(
      this.props.match.params.dishId,
      this.props.idToken
    ).then((dish) => {
      this.setState({dishName: dish.name, isLoading: false});
    });
  }
  handleSubmit(e){
    e.preventDefault();
    this.setState({
      loading: true
    });
    deleteDish(
      this.props.match.params.dishId,
      this.props.idToken
    ).then(() => {
      const dishesPath = `/${this.props.lang}/cook/dishes/`;
      this.props.history.push(dishesPath);
    });
  }
}

export default withRouter(ConfirmDelete);