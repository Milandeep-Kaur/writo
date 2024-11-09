import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link,useNavigate } from 'react-router-dom';
import { FaDizzy, FaTachometerAlt, FaUser, FaBook, FaChartLine, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

const StudentSidebar = () => {
  const [course, setCourse] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    alert("You have been logged out");
    navigate('/');
  };

  useEffect(() => {
    // Fetch course and username from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setCourse(userData.course || '');
      setUsername(userData.username || ''); // Set the username if available
    }
  }, []);

  return (
    <div style={{ backgroundColor: '#fff', width: '250px', height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* WRITO EDUCATION ICON AND USERNAME */}
      <div style={{ padding: '20px', display: 'flex', gap: '10px' }}>
        <FaDizzy size={50} />
        <p style={{ fontSize: '20px', fontWeight:'bold'}}>{username.toUpperCase()}</p> {/* Display the username here */}
      </div>

      {/* SIDEBAR MENU */}
      <Sidebar>
        <Menu
          menuItemStyles={{
            button: {
              boxSizing: 'border-box',
              backgroundColor: 'transparent',
              color: '#666666',
              borderRadius: '10px',
              margin: '8px 9px',
              padding: '10px',
              textAlign: 'left',
              transition: 'background-color 0.3s ease',
              [`&:hover`]: {
                backgroundColor: '#0066ff',
                color: '#fff',
              },
              [`&.active`]: {
                backgroundColor: 'red',
                color: '#b6c8d9',
              },
            },
            label: {
              paddingLeft: '15px',
            },
            subMenuContent: {
              paddingLeft: '30px',
              textAlign: 'center',
            },
          }}
        >
          <MenuItem component={<Link to="/dashboard" />} icon={<FaTachometerAlt />}>
            Dashboard
          </MenuItem>
          <MenuItem component={<Link to="/profile" />} icon={<FaUser />}>
            Profile
          </MenuItem>

          <SubMenu label="Tests" icon={<FaChartLine />}>
            <MenuItem component={<Link to={`/${course}/t1`} />} icon={<FaChartBar />}>
              Test 1
            </MenuItem>
            <MenuItem component={<Link to={`/${course}/t2`} />} icon={<FaChartBar />}>
              Test 2
            </MenuItem>
            <MenuItem component={<Link to={`/${course}/t3`} />} icon={<FaChartBar />}>
              Test 3
            </MenuItem>
          </SubMenu>

          <MenuItem component={<Link to="/result" />} icon={<FaBook />}>
            Result
          </MenuItem>
        </Menu>
      </Sidebar>

      {/* LOGOUT SECTION */}
      <div style={{ backgroundColor: '#e6e6e6', color: '#666666', position: 'absolute', bottom: '0px', textAlign: 'right', width: '100%', padding: '5px 25px', boxSizing: 'border-box' }}>
        <p style={{ fontSize: '18px' }}  onClick={handleLogout}>
          Logout
          <FaSignOutAlt style={{ marginBottom: '-4px', marginLeft: '15px', cursor: 'pointer' }} size={22} />
        </p>
      </div>
    </div>
  );
};

export default StudentSidebar;
