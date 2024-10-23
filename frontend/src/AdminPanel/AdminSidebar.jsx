import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <Sidebar style={{ backgroundColor: 'lightblue', height: '100vh', padding: '20px', textAlign: 'center' }}>
      {/* Title Section */}
      <h1 style={{ marginBottom: '20px', color: '#2E3440', fontSize: '24px', letterSpacing: '1px' }}>
        WRITO EDUCATION
      </h1> 
      
      <Menu>
        <MenuItem 
          component={<Link to="/admin/dashboard" />} 
          style={{ padding: '10px 20px', marginBottom: '10px' }}  // Adding padding and margin
        >
          Dashboard
        </MenuItem>
        
        <MenuItem 
          component={<Link to="/profile" />} 
          style={{ padding: '10px 20px', marginBottom: '10px' }}  // Adding padding and margin
        >
          Profile
        </MenuItem>
        
        <MenuItem 
          component={<Link to="/admin/students" />} 
          style={{ padding: '10px 20px', marginBottom: '10px' }}  // Adding padding and margin
        >
          Students
        </MenuItem>
        
        <SubMenu label="Scoreboard" style={{ padding: '10px 20px', marginBottom: '10px' }}>
          <MenuItem 
            component={<Link to="/admin/scoreboard/neet" />} 
            style={{ backgroundColor: '#2E3440', color: 'yellow', padding: '10px 20px', marginBottom: '5px', transition: 'background-color 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4C566A'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2E3440'}
          >
            NEET
          </MenuItem>
          <MenuItem 
            component={<Link to="/admin/scoreboard/jee" />} 
            style={{ backgroundColor: '#2E3440', color: 'yellow', padding: '10px 20px', marginBottom: '5px', transition: 'background-color 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4C566A'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2E3440'}
          >
            JEE
          </MenuItem>
          <MenuItem 
            component={<Link to="/admin/scoreboard/10th" />} 
            style={{ backgroundColor: '#2E3440', color: 'yellow', padding: '10px 20px', marginBottom: '5px', transition: 'background-color 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4C566A'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2E3440'}
          >
            10th
          </MenuItem>
          <MenuItem 
            component={<Link to="/admin/scoreboard/12th" />} 
            style={{ backgroundColor: '#2E3440', color: 'yellow', padding: '10px 20px', marginBottom: '5px', transition: 'background-color 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4C566A'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2E3440'}
          >
            12th
          </MenuItem>
        </SubMenu>

        <MenuItem 
          component={<Link to="/admin/logout" />} 
          style={{ padding: '10px 20px', marginTop: '10px' }}  // Adding padding and margin
        >
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default AdminSidebar;