import React from 'react';
import './Dishes.css';

class Dishes extends React.Component {
  render(){
    const localization = {
      en: {
        addNew: 'Add new dish',
        underDevelopment: 'This feature is under development'
      },
      he: {
        addNew: 'הוסף מאכל חדש',
        underDevelopment: 'הפיצ׳ר הזה נמצא בפיתוח'
      }
    };
    const values = localization[this.props.lang];
    return (
      <div>
        <div className="add-new-dish" onClick={()=>{alert(values.underDevelopment)}}>
          + {values.addNew}
        </div>
      </div>
    );
  }
}

export default Dishes;