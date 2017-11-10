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
  }
  render() {
    if (this.state.loading) {
      return <Loading />
    }
    return <Dishes dishes={this.state.dishes} lang={this.state.lang} />
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
