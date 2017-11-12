import React from 'react'
import translateComponent from '../../utils/translateComponent'

const translations = {
  en: {
    unavailable: 'Unavailable',
    available: 'Available'
  },
  he: {
    unavailable: 'לא זמין',
    available: 'זמין'
  }
}

let AvailabilityToggle = ({ isToggled, onToggle, translated }) => (
  <div
    className="btn-group availability-toggle"
    role="group"
    aria-label="Basic example"
  >
    <button
      type="button"
      style={{ boxShadow: 'none' }}
      className="btn btn-sm btn-secondary"
      onClick={() => onToggle(isToggled)}
      data-toggle="modal"
      data-target="#AvailabilityDetails"
    >
      {isToggled ? '' : translated.unavailable}
    </button>
    <button
      type="button"
      style={{ boxShadow: 'none' }}
      className="btn btn-sm btn-success"
      onClick={() => onToggle(isToggled)}
    >
      {isToggled ? translated.available : ''}
    </button>
  </div>
)

AvailabilityToggle = translateComponent(AvailabilityToggle, translations)

class AvailabilityToggle2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggled: this.props.isToggled
    }
  }
  render() {
    return (
      <AvailabilityToggle
        isToggled={this.state.isToggled}
        onToggle={isToggled => this.setState({ isToggled: !isToggled })}
        lang={this.props.lang}
      />
    )
  }
}

export default AvailabilityToggle
