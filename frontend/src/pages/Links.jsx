import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
const Links = () => {
  return (
    <>
      <h1>Welcome to Writo Education</h1>
      <div>
        <Link to="/addQuestion">Add Question</Link>
      </div>
      <div>
        <Link to="/admin/login">Admin Login</Link>
      </div>
      <div>
        <Link to="/admin/dashboard">Admin Dashboard</Link>
      </div>
      <div>
        <Link to="/login">User Login</Link>
      </div>
      <div>
        <Link to="/admin/scorecard">Admin ScoreCard</Link>
      </div>
      {/*<div>
        <Link to="/sidebar">Sidebar</Link>
      </div>*/}
      
  
<Sidebar style={{
        backgroundColor: 'grey' // Dark background
               // Light text color
      }} >
  <Menu >
    <SubMenu label="Charts">
      <MenuItem component={<Link to="/login" />} style={{
        backgroundColor: '#2E3440', // Dark background
        color: 'yellow',            // Light text color
      }}> Pie charts </MenuItem>
      <MenuItem> Line charts </MenuItem>
    </SubMenu>
    <MenuItem component={<Link to="/addQuestion" />}> Documentation </MenuItem>
    <MenuItem> Calendar </MenuItem>
  </Menu>
</Sidebar>
    
    </>
  );
};

export default Links;