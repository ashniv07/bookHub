import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import Box from '@mui/material/Box';
import { Button, TextField, Typography, Modal, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import dummyProfile from '../assets/profile1.jpeg';
import Appbar from '../components/Appbar';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = token ? JSON.parse(atob(token.split(".")[1])).userId : null;
    setUserId(id);

    if (id) {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get('/userinfo', { params: { userId: id } });
          setUserName(response.data.userName);
          setUserEmail(response.data.userEmail);
        } catch (error) {
          console.error('Error fetching user info:', error);
          alert('Failed to fetch user info.');
        }
      };

      fetchUserInfo();
    }
  }, []);

  const handleEditProfile = async () => {
    if (userId) {
      try {
        await axios.patch('/updateUser', {
          userId,
          userName: newUserName || userName,
          userEmail: newUserEmail || userEmail,
        });
        setUserName(newUserName || userName);
        setUserEmail(newUserEmail || userEmail);
        setEditMode(false);
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile.');
      }
    }
  };

  const handleChangePassword = async () => {
    if (userId) {
      try {
        await axios.post('/change-password', {
          userId,
          oldPassword,
          newPassword,
        });
        setPasswordModalOpen(false);
        setOldPassword('');
        setNewPassword('');
      } catch (error) {
        console.error('Error changing password:', error);
        alert('Failed to change password.');
      }
    }
  };

  return (
    <div>
      <Appbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '110vh', flexDirection: 'column' }}>
        <Box
          width={700}
          my={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            border: '2px solid grey',
            textAlign: 'center',
            backgroundColor: '#261709',
            boxShadow: '5px 5px 5px 5px rgba(0,0,0,0.1)',
            borderRadius: '10px',
            padding: '80px'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={15}>
              <div
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid white',
                  margin: '0 auto',
                }}
              >
                <img
                  src={dummyProfile}
                  alt="profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={20}>
              <div>
                <Typography variant="h5" style={{ color: 'white', fontSize: '40px', fontWeight: 'bold' }}>Profile Details</Typography>
                <Box component="form" noValidate autoComplete="off" >
                  <h2 style={{ color: "white", fontSize: '20px', marginRight: '500px' }}>Name</h2>

                  <TextField
                    fullWidth
                    margin="normal"
                    value={editMode ? newUserName : userName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    InputProps={{
                      readOnly: !editMode,
                    }}
                    style={{ background: '#f8f3ed', borderRadius: '10px', marginTop: '20px' }}
                  />
                  <h2 style={{ color: "white", fontSize: '20px', marginRight: '500px', marginTop: '20px' }}>Email</h2>

                  <TextField
                    fullWidth
                    margin="normal"
                    value={editMode ? newUserEmail : userEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    InputProps={{
                      readOnly: !editMode,
                    }}
                    style={{ background: '#f8f3ed', borderRadius: '10px', fontWeight: 'bold', marginBottom: '20px' }}
                  />
                  {editMode && (
                    <Button
                      variant="contained"
                      onClick={handleEditProfile}
                      style={{ marginTop: '10px', backgroundColor: '#f8f3ed', color: 'black', fontWeight: 'bold' }}
                      startIcon={<EditIcon />}
                    >
                      Save Changes
                    </Button>
                  )}
                </Box>
                {!editMode && (
                  <Button
                    variant="contained"
                    onClick={() => setEditMode(true)}
                    style={{ marginTop: '20px', backgroundColor: '#f8f3ed', color: 'black', fontWeight: 'bold' }}
                    startIcon={<EditIcon />}
                  >
                    Edit Profile
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={() => setPasswordModalOpen(true)}
                  style={{ marginTop: '20px', marginLeft: '10px', backgroundColor: '#f8f3ed', color: 'black', fontWeight: 'bold' }}
                >
                  Change Password
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>

      {/* Change Password Modal */}
      <Modal open={passwordModalOpen} onClose={() => setPasswordModalOpen(false)}>
        <Box
          sx={{
            width: 400,
            padding: 4,
            margin: 'auto',
            marginTop: '15%',
            backgroundColor: 'white',
            boxShadow: 24,
          }}
        >
          <Typography variant="h6">Change Password</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleChangePassword}
            style={{ marginTop: '10px', backgroundColor: 'brown', color: 'white' }}
          >
            Change Password
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Profile;
