import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteDish, getDish } from '../ajax';
import RaisedButton from 'material-ui/RaisedButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class ConfirmDelete extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isLoading: true
    };
  }
  render(){
    const localization = {
      en: {
        loading: 'Loading...',
        question: 'Are you sure you want to delete',
        delete: 'Confirm Delete',
        cancel: 'Cancel'
      },
      he: {
        loading: 'טוען...',
        question: 'האם באמת למחוק את',
        delete: 'אשר מחיקה',
        cancel: 'בטל'
      }
    };
    const values = localization[this.props.lang];
    if (this.state.isLoading) {
      return <h1>{values.loading}</h1>;
    }
    const dishesPath = `/${this.props.lang}/cook/dishes/`;
    return (
      <form style={{flexGrow:1, maxWidth:500, background: 'white',padding: '20px',borderRadius: '5px'}}
            onSubmit={this.handleSubmit}>
        <h1>{values.question} {this.state.dishName}?</h1>
        <RaisedButton label={values.delete} 
                      type="submit" 
                      labelStyle={{textTransform: 'none'}}
                      style={{margin: '0 5px'}} />
        <RaisedButton label={values.cancel} 
                      style={{margin: '0 5px'}}
                      labelStyle={{textTransform: 'none'}}
                      containerElement={<Link to={dishesPath} />} />
      </form>
    );
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
      this.props.idToken,
      () => {
        const dishesPath = `/${this.props.lang}/cook/dishes/`;
        this.props.history.push(dishesPath);
      }
    );
  }
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }
}

ConfirmDelete.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default withRouter(ConfirmDelete);