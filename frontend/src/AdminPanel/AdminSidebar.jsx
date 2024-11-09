import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu,menuClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaDizzy, FaTachometerAlt, FaUser, FaBook, FaChartLine, FaChartBar, FaSignOutAlt } from 'react-icons/fa'; // Import icons

const AdminSidebar = () => {
  return (
    <div  style={{ backgroundColor:'#fff',width:'250px',height :'100vh',display:'flex',flexDirection :'column',position : 'relative' }}>
      {/* WRITO EDUCATION ICON */}
      <div style={{ padding: '20px',display :'flex',gap:'10px' }}>
        <FaDizzy size={50} />
        <p> Name</p>
      </div>

      {/* SIDEBAR MENU */}
      <Sidebar style={{overflowY: 'auto',height : '500px'}}>
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
              paddingLeft: '15px', // Optional padding for alignment
            },
            subMenuContent: {
              paddingLeft: '30px', // Sub-menu items are further indented
              textAlign: 'center', // Center-align text for sub-menu items
            },
          }}
          
        >
          <MenuItem  
           
          rootStyles={{
            ['.' + menuClasses.button]: {
              backgroundColor: 'red',
              color: '#9f0099',
              '&:hover': {
                backgroundColor: '#eecef9',
              },
            },
          }}
          active
           component={<Link to="/admin/dashboard" />} icon={<FaTachometerAlt />}>
            Dashboard
          </MenuItem>
          {/*<MenuItem component={<Link to="/admin/questions" />} icon={<FaUser />}>
            Questions
          </MenuItem>
*/}
          
          <SubMenu label="Manage Courses" icon={<FaChartLine />}>
            <MenuItem component={<Link to="/addCourse" />} icon={<FaChartBar />}>
              Add Course
            </MenuItem>
            <MenuItem component={<Link to="/admin/courses" />} icon={<FaChartBar />}>
              Update Course
            </MenuItem>
          </SubMenu>

         <SubMenu label="Manage Subjects" icon={<FaChartLine />}>
            <MenuItem component={<Link to="/addSubject" />} icon={<FaChartBar />}>
              Add Subject
            </MenuItem>
            <MenuItem component={<Link to="/admin/subject" />} icon={<FaChartBar />}>
              Update Subject
            </MenuItem>
          </SubMenu>

         <SubMenu label="Manage Exam" icon={<FaChartLine />}>
            <MenuItem component={<Link to="/addTest" />} icon={<FaChartBar />}>
              Add Test
            </MenuItem>
            <MenuItem component={<Link to="/admin/exams" />} icon={<FaChartBar />}>
              Update Test
            </MenuItem>
          </SubMenu>
         
         <SubMenu label="Manage Question" icon={<FaChartLine />}>
            <MenuItem component={<Link to="/addQuestion" />} icon={<FaUser />}>
              Add Question
            </MenuItem>
            <MenuItem component={<Link to="/admin/questions" />} icon={<FaUser />}>
              Update Question
            </MenuItem>
          </SubMenu>


          <MenuItem component={<Link to="/admin/students" />} icon={<FaBook />}>
            Students
          </MenuItem>

          <SubMenu label="Scoreboard" icon={<FaChartLine />}>
            <MenuItem component={<Link to="/admin/scoreboard/neet" />} icon={<FaChartBar />}>
              NEET
            </MenuItem>
            <MenuItem component={<Link to="/admin/scoreboard/jee" />} icon={<FaChartBar />}>
              JEE
            </MenuItem>
            <MenuItem component={<Link to="/admin/scoreboard/10th" />} icon={<FaChartBar />}>
              10th
            </MenuItem>
            <MenuItem component={<Link to="/admin/scoreboard/12th" />} icon={<FaChartBar />}>
              12th
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

      {/* LOGOUT SECTION */}
      <div style={{backgroundColor :'#e6e6e6',color:'#666666', position :'absolute',bottom:'0px', textAlign: 'right',width : '100%',padding : '5px 25px',boxSizing : 'border-box' }}>
        <p style={{fontSize :'18px' }}>
          Logout
          <FaSignOutAlt style={{marginBottom:'-4px', marginLeft: '15px',cursor:'pointer' }} size={22} />
        </p>
      </div>
    </div>
  );
};

export default AdminSidebar;




// //student sidebar


// import React, { useEffect, useState } from 'react';
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import { Link } from 'react-router-dom';
// import { FaDizzy, FaTachometerAlt, FaUser, FaBook, FaChartLine, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

// const StudentSidebar = () => {
//   const [course, setCourse] = useState('');
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     // Fetch course and username from localStorage
//     const userData = JSON.parse(localStorage.getItem('user'));
//     if (userData) {
//       setCourse(userData.course || '');
//       setUsername(userData.username || ''); // Set the username if available
//     }
//   }, []);

//   return (
//     <div style={{ backgroundColor: '#fff', width: '250px', height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
//       {/* WRITO EDUCATION ICON AND USERNAME */}
//       <div style={{ padding: '20px', display: 'flex', gap: '10px' }}>
//         <FaDizzy size={50} />
//         <p style={{ fontSize: '20px', fontWeight:'bold'}}>{username.toUpperCase()}</p> {/* Display the username here */}
//       </div>

//       {/* SIDEBAR MENU */}
//       <Sidebar>
//         <Menu
//           menuItemStyles={{
//             button: {
//               boxSizing: 'border-box',
//               backgroundColor: 'transparent',
//               color: '#666666',
//               borderRadius: '10px',
//               margin: '8px 9px',
//               padding: '10px',
//               textAlign: 'left',
//               transition: 'background-color 0.3s ease',
//               [`&:hover`]: {
//                 backgroundColor: '#0066ff',
//                 color: '#fff',
//               },
//               [`&.active`]: {
//                 backgroundColor: 'red',
//                 color: '#b6c8d9',
//               },
//             },
//             label: {
//               paddingLeft: '15px',
//             },
//             subMenuContent: {
//               paddingLeft: '30px',
//               textAlign: 'center',
//             },
//           }}
//         >
//           <MenuItem component={<Link to="/dashboard" />} icon={<FaTachometerAlt />}>
//             Dashboard
//           </MenuItem>
//           <MenuItem component={<Link to="/profile" />} icon={<FaUser />}>
//             Profile
//           </MenuItem>

//           <SubMenu label="Tests" icon={<FaChartLine />}>
//             <MenuItem component={<Link to={`/${course}/t1`} />} icon={<FaChartBar />}>
//               Test 1
//             </MenuItem>
//             <MenuItem component={<Link to={`/${course}/t2`} />} icon={<FaChartBar />}>
//               Test 2
//             </MenuItem>
//             <MenuItem component={<Link to={`/${course}/t3`} />} icon={<FaChartBar />}>
//               Test 3
//             </MenuItem>
//           </SubMenu>

//           <MenuItem component={<Link to="/result" />} icon={<FaBook />}>
//             Result
//           </MenuItem>
//         </Menu>
//       </Sidebar>

//       {/* LOGOUT SECTION */}
//       <div style={{ backgroundColor: '#e6e6e6', color: '#666666', position: 'absolute', bottom: '0px', textAlign: 'right', width: '100%', padding: '5px 25px', boxSizing: 'border-box' }}>
//         <p style={{ fontSize: '18px' }}>
//           Logout
//           <FaSignOutAlt style={{ marginBottom: '-4px', marginLeft: '15px', cursor: 'pointer' }} size={22} />
//         </p>
//       </div>
//     </div>
//   );
// };

// export default StudentSidebar;