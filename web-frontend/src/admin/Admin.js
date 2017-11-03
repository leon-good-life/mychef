import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toggle from 'material-ui/Toggle';

const Admin = ({users, handleToggle}) => {
  const usersRows = users.map((user)=>{
    return (
      <tr key={user.id}>
        <td>{user.google_user_email}</td>
        <td><img src={user.google_user_picture} alt="profile picture" /></td>
        <td>{user.google_user_name}</td>
        <td>{user.user_filled_name}</td>
        <td>{user.user_filled_email}</td>
        <td>{user.user_filled_telephone}</td>
        <td>{user.user_filled_address}</td>
        <td><Toggle toggled={user.verified} 
                    onToggle={(e, isInputChecked) => {handleToggle(user.id, isInputChecked);}} /></td>
      </tr>
    );
  });
  return (
    <MuiThemeProvider>
      <div className="admin-container">
        <h1>Admin Panel</h1>
        <table>
          <tr>
            <th>Email<br />(Google Account)</th>
            <th>Profile Picture<br />(Google Account)</th>
            <th>User Name<br />(Google Account)</th>
            <th>Name</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Address</th>
            <th>Verify user</th>
          </tr>
          {usersRows}
        </table>
      </div>
    </MuiThemeProvider>
  )
};

export default Admin;