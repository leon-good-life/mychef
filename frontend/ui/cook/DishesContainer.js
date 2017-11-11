import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Dishes from './Dishes'
import Loading from '../Loading'
import * as dishesActions from '../../store/action-creators/dishes'

class DishesContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      dishes: [],
      lang: 'en'
    }
    this.onDelete = this.onDelete.bind(this)
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this)
    this.onAvailable = this.onAvailable.bind(this)
    this.onToggleAvailability = this.onToggleAvailability.bind(this)
  }
  render() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <Dishes
        dishes={this.state.dishes}
        lang={this.state.lang}
        onDelete={this.onDelete}
        onDeleteConfirm={this.onDeleteConfirm}
        onAvailable={this.onAvailable}
        onToggleAvailability={this.onToggleAvailability}
      />
    )
  }
  componentWillMount() {
    this.props.actions.fetchDishes(this.props.token)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.loading,
      dishes: nextProps.dishes,
      lang: nextProps.lang
    })
  }
  onDelete(dishId) {
    this.setState({
      deleteDishId: dishId
    })
  }
  onDeleteConfirm() {
    this.props.actions
      .deleteDish(this.state.deleteDishId, this.props.token)
      .then(() => {
        this.props.actions.fetchDishes(this.props.token)
      })
  }
  onToggleAvailability(dishId, isToggled) {
    if (isToggled) {
      this.props.actions
        .updateDishAvailability(dishId, 0, 'HALF_DAY', this.props.token)
        .then(() => {
          this.props.actions.fetchDishes(this.props.token)
        })
    } else {
      this.setState({
        toggleDishId: dishId
      })
    }
  }
  onAvailable(limit) {
    this.props.actions
      .updateDishAvailability(
        this.state.toggleDishId,
        limit,
        'HALF_DAY',
        this.props.token
      )
      .then(() => {
        this.props.actions.fetchDishes(this.props.token)
      })
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(dishesActions, dispatch)
})

const mapStateToProps = state => ({
  loading: state.dishes.isProcessingRequest,
  dishes: state.dishes.dishes,
  lang: state.ui.language,
  token: state.auth.token
})

DishesContainer = connect(mapStateToProps, mapDispatchToProps)(DishesContainer)

export default DishesContainer
