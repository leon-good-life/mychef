import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class SelectLang extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <SelectField value={this.props.selected} onChange={this.handleChange}>
        <MenuItem value="en" primaryText="English"></MenuItem>
        <MenuItem value="he" primaryText="Hebrew - עברית"></MenuItem>
      </SelectField>
    );
  }
  handleChange(vent, index, value){
    this.props.handleChange(value);
  }
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }
}

SelectLang.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default SelectLang;