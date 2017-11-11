import React from 'react'
import translateComponent from '../../utils/translateComponent'
import Loading from '../Loading'
import VerifyToggle from './VerifyToggle'

const translations = {
  en: {},
  he: {}
}

class Users extends React.Component {
  constructor(props) {
    super(props)
    this.tableRows = this.tableRows.bind(this)
  }
  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Telephone</th>
            <th scope="col">Address</th>
            <th scope="col">verified</th>
          </tr>
        </thead>
        <tbody>
          {this.tableRows()}
        </tbody>
      </table>
    )
  }
  componentDidMount() {
    this.props.fetch()
  }
  tableRows(){
    return this.props.users.map(user => (
      <tr key={user.id}>
        <td><img src={user.google_user_picture} alt="profile photo" style={{height: 50}} /></td>
        <td>(g) {user.google_user_name}<br />(u) {user.user_filled_name || '----'}</td>
        <td>(g) {user.google_user_email}<br />(u) {user.user_filled_email || '----'}</td>
        <td>(u) {user.user_filled_telephone || '----'}</td>
        <td>(u) {user.user_filled_address || '----'}</td>
        <td><VerifyToggle isToggled={user.verified} lang={this.props.lang} /></td>
      </tr>
    ))
  }
}

export default translateComponent(Users, translations)
