import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Sidebar style={{ backgroundColor:  'grey' }}>
      <Menu>
        <MenuItem 
          component={<Link to="/admin/dashboard" />} 
        >
          Dashboard
        </MenuItem>
        
        
        <MenuItem 
          component={<Link to="/admin/profile" />} 
        >
          Profile
        </MenuItem>
        
        
        <MenuItem 
          component={<Link to="/admin/students" />} 
        >
          Students
        </MenuItem>
        
        
        <SubMenu label="Scoreboard">
          <MenuItem 
            component={<Link to="/admin/scoreboard/neet" />} 
            style={{ backgroundColor: '#2E3440', color: 'yellow', transition: 'background-color 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4C566A'}  // Change to a darker shade on hover
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2E3440'}   // Revert to original color when mouse leaves

          >
            NEET
          </MenuItem>
          <MenuItem 
            component={<Link to="/admin/scoreboard/jee" />} 
            style={{ backgroundColor: '#2E3440', color: 'yellow', transition: 'background-color 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4C566A'}  // Change to a darker shade on hover
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2E3440'}   // Revert to original color when mouse leaves
          >
            JEE
          </MenuItem>
          <MenuItem 
            component={<Link to="/admin/scoreboard/10th" />} 
            style={{ backgroundColor: '#2E3440', color: 'yellow', transition: 'background-color 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4C566A'}  // Change to a darker shade on hover
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2E3440'}   // Revert to original color when mouse leaves
          >
            10th
          </MenuItem>
          <MenuItem 
            component={<Link to="/admin/scoreboard/12th" />} 
            style={{ backgroundColor: '#2E3440', color: 'yellow', transition: 'background-color 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4C566A'}  // Change to a darker shade on hover
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2E3440'}   // Revert to original color when mouse leaves
          >
            12th
          </MenuItem>
        </SubMenu>

     
        <MenuItem 
          component={<Link to="/admin/logout" />} 
        >
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default Sidebar;
