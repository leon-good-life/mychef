import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DishForm from './DishForm'
import * as dishActions from '../../store/action-creators/dishes'

class EditDish extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.dish = this.props.dishes.find(
      dish => dish.id === this.props.match.params.dishId
    )
  }
  render() {
    return (
      <DishForm
        type="edit"
        lang={this.props.lang}
        submit={this.submit}
        dish={this.dish}
        token={this.props.token}
      />
    )
  }
  submit(dish) {
    this.props.actions.updateDish(
      this.dish.id,
      dish.name,
      dish.description,
      dish.price,
      dish.image,
      this.props.token
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(dishActions, dispatch)
})

const mapStateToProps = state => ({
  token: state.auth.token,
  lang: state.ui.language,
  dishes: state.dishes.dishes
})

EditDish = connect(mapStateToProps, mapDispatchToProps)(EditDish)

export default EditDish
