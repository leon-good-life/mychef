import React from 'react'
import translateComponent from '../../utils/translateComponent'

const translations = {
  en: {
    unverified: 'Unverified',
    verified: 'Verified'
  },
  he: {
    unverified: 'לא מאושר',
    verified: 'מאושר'
  }
}

let VerifyToggle = ({ isToggled, onToggle, translated }) => (
  <div
    className="btn-group verify-toggle"
    role="group"
    aria-label="Basic example"
  >
    <button
      type="button"
      style={{ boxShadow: 'none' }}
      className="btn btn-sm btn-secondary"
      onClick={() => onToggle(isToggled)}
    >
      {isToggled ? '' : translated.unverified}
    </button>
    <button
      type="button"
      style={{ boxShadow: 'none' }}
      className="btn btn-sm btn-success"
      onClick={() => onToggle(isToggled)}
    >
      {isToggled ? translated.verified : ''}
    </button>
  </div>
)

VerifyToggle = translateComponent(VerifyToggle, translations)

class VerifyToggle2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggled: this.props.isToggled
    }
  }
  render() {
    return (
      <VerifyToggle
        isToggled={this.state.isToggled}
        onToggle={isToggled => this.setState({ isToggled: !isToggled })}
        lang={this.props.lang}
      />
    )
  }
}

export default VerifyToggle2
