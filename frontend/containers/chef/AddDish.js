import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import DishForm from '../../components/chef/dishes/DishForm'
import * as chefActions from '../../actions/chef'
import * as path from '../../path'

class AddDish extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }
  render() {
    return (
      <DishForm
        type="add"
        lang={this.props.lang}
        submit={this.submit}
        token={this.props.token}
      />
    )
  }
  submit(dish) {
    this.props.actions
      .createDish(
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
  token: state.auth.token
})

AddDish = connect(mapStateToProps, mapDispatchToProps)(AddDish)
AddDish = withRouter(AddDish)

export default AddDish
