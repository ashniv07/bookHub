


import { Container, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import Sidebar from '../components/Sidebar';
import { MdPendingActions } from "react-icons/md";

const Requests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(null); 
  const [notificationStatus, setNotificationStatus] = useState(null); 

  useEffect(() => {
    axios.get('/borrow/pending-requests')
      .then((response) => setPendingRequests(response.data))
      .catch((error) => console.error('Error fetching pending requests:', error));
  }, [updateStatus]);

  const handleAccept = async (borrowId, userId, bookId, bookName) => {
    try {
      const response = await axios.patch(`/borrow/approve/${borrowId}`, { userId, bookId });
      console.log(userId);
      setUpdateStatus(response.data.url); 
  
      await axios.post('/notification/create', {
        userId,
        message: `Your request for the book "${bookName}" has been accepted! Go check it out!!`
      });
  
      setNotificationStatus(`Notification sent for book "${bookName}"`);
    } catch (error) {
      console.error('Error approving borrow request:', error.response || error);
      setNotificationStatus('Failed to approve the borrow request. Please try again later.');
    }
  };

  return (
    <div className='request' style={{ display: "flex", flexDirection: "column", minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #e9ecef)' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, width: "calc(100% - 200px)", marginLeft: '200px', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '50px' }}>
          <MdPendingActions style={{ fontSize: '2rem', marginRight: '15px' }} />
          <h1 style={{ fontSize: '2rem', display: 'inline-block', marginBottom: '30px' }}>PENDING REQUESTS</h1>
        </div>
        {pendingRequests.length === 0 ? (
          <p className='text-center'>No Borrow requests from users</p>
        ) : (
          <div style={{ overflowX: 'auto', padding: '0 20px' }}>
            <table className="table" style={{ width: '100%', borderRadius: '8px', borderCollapse: 'separate', borderSpacing: '0', overflow: 'hidden' }}>
              <thead>
                <tr style={{ backgroundColor: 'black', color: 'white' }}>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>User</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Book</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Date of Request</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((request) => (
                  <tr key={request.borrowId} style={{ backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px' }}>{request.userName}</td>
                    <td style={{ padding: '10px' }}>{request.bookname}</td>
                    <td style={{ padding: '10px' }}>{new Date(request.borrowDate).toLocaleString()}</td>
                    <td style={{ padding: '10px' }}>
                      <Button
                        variant="contained"
                        color={request.accessGranted ? "primary" : "success"}
                        onClick={() => handleAccept(request.borrowId, request.userId, request.bookId, request.bookname)}
                      >
                        {request.accessGranted ? "Read" : "Accept"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {notificationStatus && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Typography variant="h6" style={{ color: 'green' }}>{notificationStatus}</Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
