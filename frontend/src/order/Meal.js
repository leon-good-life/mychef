import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class Meal extends React.Component {
  render() {
    const style = {
      color: 'black'
    };
    const underlineStyle = {
      borderColor: 'black'
    };
    return (
      <Card>
      <CardHeader
        title="מאי"
        subtitle="שפית תאילנדית בישראל"
        avatar="http://img.mako.co.il/2017/02/12/P1530460_post_c.jpg"
      />
      <CardMedia
        overlay={<CardTitle title="קארי ירוק" />}
      >
        <img src="http://halsat.com/wp-content/uploads/2016/11/63.%E0%B9%81%E0%B8%81%E0%B8%87%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%AB%E0%B8%A7%E0%B8%B2%E0%B8%99%E0%B8%AB%E0%B8%A1%E0%B8%B9_6_1.1.42_490X960.jpeg" alt="" />
      </CardMedia>

      <CardActions>
        <FlatButton label="הוסף להזמנה" />
      </CardActions>
    </Card>
    );
  }
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }
}

Meal.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
    
export default Meal;