import React from 'react'
import translateComponent from '../../utils/translateComponent'

const translations = {
  en: {
    fullName: 'Full Name',
    email: 'Email',
    telephone: 'Telephone',
    address: 'Address',
    update: 'Update contact'
  },
  he: {
    fullName: 'שם מלא',
    email: 'דואר אלקטרוני',
    telephone: 'טלפון',
    address: 'כתובת',
    update: 'עדכן פרטים'
  }
}

class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullName: this.props.fullName || '',
      email: this.props.email || '',
      telephone: this.props.telephone || '',
      address: this.props.address || ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render() {
    return (
      <div className="card">
        <form className="card-body" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputFullName">
                {this.props.translated.fullName}
              </label>
              <input
                type="text"
                className="form-control"
                id="inputFullName"
                placeholder={this.props.translated.fullName}
                defaultValue={this.state.fullName}
                onChange={e => this.setState({ fullName: e.target.value })}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail">{this.props.translated.email}</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail"
                placeholder={this.props.translated.email}
                defaultValue={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputTelephone">
                {this.props.translated.telephone}
              </label>
              <input
                type="text"
                className="form-control"
                id="inputTelephone"
                placeholder={this.props.translated.telephone}
                defaultValue={this.state.telephone}
                onChange={e => this.setState({ telephone: e.target.value })}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputAddress">
                {this.props.translated.address}
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder={this.props.translated.address}
                defaultValue={this.state.address}
                onChange={e => this.setState({ address: e.target.value })}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            {this.props.translated.update}
          </button>
        </form>
      </div>
    )
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.handleSubmit({
      fullName: this.state.fullName,
      email: this.state.email,
      telephone: this.state.telephone,
      address: this.state.address
    })
  }
}

export default translateComponent(Contact, translations)
