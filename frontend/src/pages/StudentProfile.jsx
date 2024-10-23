import React, { useState, useEffect } from 'react';
import axios from "axios";
import { AvatarGenerator } from 'random-avatar-generator';
import './StudentProfile.css'; 

const StudentProfile = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [profile, setProfile] = useState(null);
  const [mobile, setMobile] = useState("");
  const generator = new AvatarGenerator();

  const generate = () => {
    const newAvatar = generator.generateRandomAvatar();
    setAvatarUrl(newAvatar);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const userId = userData?.userId;

        if (userId) {
          const newAvatar = generator.generateRandomAvatar();
          setAvatarUrl(newAvatar);

          const response = await axios.post('http://localhost:5000/profile', { userId });
          setProfile(response.data); 
          if (response.data.mobile) {
            setMobile(response.data.mobile);
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleAddMobile = async (e) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const userId = userData?.userId;

      if (userId && mobile) {
        const response = await axios.post('http://localhost:5000/addMobile', { userId, mobile });
        setProfile(response.data.user);
        setMobile(response.data.user.mobile);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error updating mobile number:', error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="outer-container">
      <div className="profile-container">
        <div className="profile-header">
          <img src={avatarUrl} alt="Avatar" className="avatar" />
          {/* Font Awesome Refresh Icon */}
          <i 
            className="fa fa-refresh change-avatar-icon" 
            onClick={generate} 
            title="Change Avatar"
          ></i>
          <h1>{profile.username.toUpperCase()}</h1>
          <h2>{profile.course} Student</h2>
        </div>

        <div className="profile-info">
          {/* Outer box for all information */}
          <div className="info-box">
            <h3>Basic Information</h3>
            <div className="individual-info">
              <div className="field-box">
                <strong>Email:</strong> {profile.email}
              </div>
              <div className="field-box">
                <strong>Course:</strong> {profile.course}
              </div>
              <div className="field-box">
                <strong>Student ID:</strong> XXX{profile._id}
              </div>
              <div className="field-box">
                <strong>Mobile:</strong> {profile.mobile ? profile.mobile : (
                  <div className="add-mobile-box">
                    <h4>Don't hesitate to add the number</h4>
                    <form onSubmit={handleAddMobile}>
                      <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter mobile number"
                      />
                      <button type="submit">Add</button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
