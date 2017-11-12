import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import DishForm from '../components/cook/DishForm'
import * as dishActions from '../actions/dishes'

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
        this.props.history.push('/cook/dishes')
      })
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(dishActions, dispatch)
})

const mapStateToProps = state => ({
  token: state.auth.token,
  lang: state.ui.language
})

AddDish = connect(mapStateToProps, mapDispatchToProps)(AddDish)
AddDish = withRouter(AddDish)

export default AddDish
