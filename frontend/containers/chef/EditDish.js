import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import DishForm from '../../components/chef/dishes/DishForm'
import * as chefActions from '../../actions/chef'
import * as path from '../../path'

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
    this.props.actions
      .updateDish(
        this.dish.id,
        dish.name,
        dish.description,
        dish.image,
        dish.price,
        this.props.token
      )
      .then(() => {
        this.props.history.push(path.cook_dishes(this.props.lang))
      })
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(chefActions, dispatch)
})

const mapStateToProps = state => ({
  token: state.auth.token,
  dishes: state.chef.dishes
})

EditDish = connect(mapStateToProps, mapDispatchToProps)(EditDish)
EditDish = withRouter(EditDish)

export default EditDish
