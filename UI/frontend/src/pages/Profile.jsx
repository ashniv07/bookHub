// // import React, { useEffect, useState } from 'react';
// // import axios from '../setupAxios';
// // import NavBar from '../components/NavBar';
// // import Box from '@mui/material/Box';
// // import profile1 from '../assets/profile1.jpeg';

// // const Profile = () => {
// //   const [userName, setUserName] = useState('');

// //   useEffect(() => {
// //     const fetchUserInfo = async () => {
// //       try {
// //         const response = await axios.get('/userinfo', {
// //           params: { userName: 'ashley' } // Replace 'ashley' with the actual username you want to fetch
// //         });
// //         setUserName(response.data.userName);
// //       } catch (error) {
// //         console.error('Error fetching user info:', error);
// //         alert('Failed to fetch user info.');
// //       }
// //     };

// //     fetchUserInfo();
// //   }, []);

// //   return (
// //     <div>
// //       <NavBar />
// //       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
// //         <Box
// //           height={500}
// //           width={500}
// //           my={8}
// //           display="flex"
// //           alignItems="center"
// //           justifyContent="center"
// //           sx={{
// //             border: '2px solid grey',
// //             textAlign: 'center',
// //             backgroundColor: 'grey',
// //             boxShadow: '5px 5px 5px 5px rgba(0,0,0,0.5)',
// //             position: 'relative'
// //           }}
// //         >
// //           <div
// //             style={{
// //               width: '130px',
// //               height: '130px',
// //               borderRadius: '50%',
// //               overflow: 'hidden',
// //               position: 'absolute',
// //               bottom: '70%',
// //               left: '50%',
// //               border: '2px solid white',
// //               transform: 'translateX(-50%)',
// //             }}
// //           >
// //             <img
// //               src={profile1}
// //               alt="profile"
// //               style={{
// //                 width: '100%',
// //                 height: '100%',
// //                 objectFit: 'cover',
// //               }}
// //             />
// //           </div>
// //           <div>
// //             <h2>{userName}</h2>
// //           </div>
// //         </Box>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;


// import React, { useEffect, useState } from 'react';
// import axios from '../setupAxios';
// import NavBar from '../components/NavBar';
// import Box from '@mui/material/Box';
// import { Button, TextField, Typography, Modal, Grid } from '@mui/material';
// import dummyProfile from '../assets/profile1.jpeg';

// const Profile = () => {
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [editMode, setEditMode] = useState(false);
//   const [newUserName, setNewUserName] = useState('');
//   const [newUserEmail, setNewUserEmail] = useState('');
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [passwordModalOpen, setPasswordModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const response = await axios.get('/userinfo');
//         setUserName(response.data.userName);
//         setUserEmail(response.data.userEmail);
//       } catch (error) {
//         console.error('Error fetching user info:', error);
//         alert('Failed to fetch user info.');
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   const handleEditProfile = async () => {
//     try {
//       await axios.put('/updateUser', {
//         userName: newUserName || userName,
//         userEmail: newUserEmail || userEmail,
//       });
//       setUserName(newUserName || userName);
//       setUserEmail(newUserEmail || userEmail);
//       setEditMode(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Failed to update profile.');
//     }
//   };

//   const handleChangePassword = async () => {
//     if (newPassword !== confirmPassword) {
//       alert('Passwords do not match.');
//       return;
//     }
//     try {
//       const response = await axios.post('/verifyPassword', { password: oldPassword });
//       if (response.data.valid) {
//         await axios.put('/updateUserPassword', { password: newPassword });
//         setPasswordModalOpen(false);
//         setOldPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//       } else {
//         alert('Old password is incorrect.');
//       }
//     } catch (error) {
//       console.error('Error changing password:', error);
//       alert('Failed to change password.');
//     }
//   };

//   return (
//     <div>
//       <NavBar />
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
//         <Box
//           width={800}
//           my={8}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           sx={{
//             border: '2px solid grey',
//             textAlign: 'center',
//             backgroundColor: 'white',
//             boxShadow: '5px 5px 5px 5px rgba(0,0,0,0.1)',
//             borderRadius: '10px',
//             padding: '20px'
//           }}
//         >
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={4}>
//               <div
//                 style={{
//                   width: '130px',
//                   height: '130px',
//                   borderRadius: '50%',
//                   overflow: 'hidden',
//                   border: '2px solid white',
//                   margin: '0 auto',
//                 }}
//               >
//                 <img
//                   src={dummyProfile}
//                   alt="profile"
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover',
//                   }}
//                 />
//               </div>
//             </Grid>
//             <Grid item xs={12} sm={8}>
//               <div>
//                 <Typography variant="h5">Profile Details</Typography>
//                 <Box component="form" noValidate autoComplete="off">
//                   <TextField
//                     fullWidth
//                     margin="normal"
//                     label="Name"
//                     value={editMode ? newUserName : userName}
//                     onChange={(e) => setNewUserName(e.target.value)}
//                     InputProps={{
//                       readOnly: !editMode,
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     margin="normal"
//                     label="Email"
//                     value={editMode ? newUserEmail : userEmail}
//                     onChange={(e) => setNewUserEmail(e.target.value)}
//                     InputProps={{
//                       readOnly: !editMode,
//                     }}
//                   />
//                   {editMode && (
//                     <Button
//                       variant="contained"
//                       onClick={handleEditProfile}
//                       style={{ marginTop: '10px' }}
//                     >
//                       Save Changes
//                     </Button>
//                   )}
//                 </Box>
//                 {!editMode && (
//                   <Button
//                     variant="contained"
//                     onClick={() => setEditMode(true)}
//                     style={{ marginTop: '20px' }}
//                   >
//                     Edit Profile
//                   </Button>
//                 )}
//                 <Button
//                   variant="contained"
//                   onClick={() => setPasswordModalOpen(true)}
//                   style={{ marginTop: '20px', marginLeft: '10px' }}
//                 >
//                   Change Password
//                 </Button>
//               </div>
//             </Grid>
//           </Grid>
//         </Box>
//       </div>

//       {/* Change Password Modal */}
//       <Modal open={passwordModalOpen} onClose={() => setPasswordModalOpen(false)}>
//         <Box
//           sx={{
//             width: 400,
//             padding: 4,
//             margin: 'auto',
//             marginTop: '15%',
//             backgroundColor: 'white',
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6">Change Password</Typography>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Old Password"
//             type="password"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="New Password"
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Confirm Password"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <Button variant="contained" onClick={handleChangePassword} style={{ marginTop: '10px' }}>Change Password</Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import NavBar from '../components/NavBar';
import Box from '@mui/material/Box';
import { Button, TextField, Typography, Modal, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import dummyProfile from '../assets/profile1.jpeg';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/userinfo');
        setUserName(response.data.userName);
        setUserEmail(response.data.userEmail);
      } catch (error) {
        console.error('Error fetching user info:', error);
        alert('Failed to fetch user info.');
      }
    };

    fetchUserInfo();
  }, []);

  const handleEditProfile = async () => {
    try {
      await axios.patch('/updateUser', {
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
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    try {
      await axios.patch('/updateUserPassword', { oldPassword, newPassword });
      setPasswordModalOpen(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password.');
    }
  };

  return (
    <div>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <Box
          width={800}
          my={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            border: '2px solid grey',
            textAlign: 'center',
            backgroundColor: 'white',
            boxShadow: '5px 5px 5px 5px rgba(0,0,0,0.1)',
            borderRadius: '10px',
            padding: '20px'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <div
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid white',
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
            <Grid item xs={12} sm={8}>
              <div>
                <Typography variant="h5">Profile Details</Typography>
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    value={editMode ? newUserName : userName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    InputProps={{
                      readOnly: !editMode,
                    }}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    value={editMode ? newUserEmail : userEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    InputProps={{
                      readOnly: !editMode,
                    }}
                  />
                  {editMode && (
                    <Button
                      variant="contained"
                      onClick={handleEditProfile}
                      style={{ marginTop: '10px', backgroundColor: 'brown', color: 'white' }}
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
                    style={{ marginTop: '20px', backgroundColor: 'brown', color: 'white' }}
                    startIcon={<EditIcon />}
                  >
                    Edit Profile
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={() => setPasswordModalOpen(true)}
                  style={{ marginTop: '20px', marginLeft: '10px', backgroundColor: 'brown', color: 'white' }}
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
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
