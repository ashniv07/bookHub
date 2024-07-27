import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import Sidebar from '../components/Sidebar';
import { Button } from '@mui/material';
import { MdPendingActions } from "react-icons/md";

const Requests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(null); // To track the update status

  useEffect(() => {
    axios.get('/borrow/pending-requests')
      .then((response) => setPendingRequests(response.data))
      .catch((error) => console.error('Error fetching pending requests:', error));
  }, [updateStatus]); // Dependency array updated to re-fetch on status change

  const handleAccept = async (borrowId, userId, bookId) => {
    try {
      const response = await axios.patch(`/borrow/approve/${borrowId}`, { userId, bookId });
      // Handle the response if needed
      setUpdateStatus(response.data.url); // Update the status with the book URL
      alert(`Book URL: ${response.data.url}`); // Optionally, show the URL or update UI
    } catch (error) {
      console.error('Error approving borrow request:', error);
    }
  };

  return (
    <div className='request' style={{ display: "flex", flexDirection: "column", minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #e9ecef)' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, width: "calc(100% - 200px)", marginLeft: '200px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '50px' }}>
          <MdPendingActions style={{ fontSize: '2rem', marginRight: '15px' }} />
          <h1 style={{ fontSize: '2rem', display: 'inline-block', marginBottom: '30px' }}>PENDING REQUESTS</h1>
        </div>
        {pendingRequests.length === 0 ? (
          <p className='text-center'>No Borrow requests from users</p>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', paddingRight: '120px', paddingLeft: '120px' }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
              <table className="table table-striped table-bordered table-hover column-spacing mt-4" style={{ margin: '0 auto', border: '2px solid black', borderCollapse: 'collapse' }}>
                <thead className="thead-dark">
                  <tr>
                    <th style={{ border: '2px solid black' }}>User</th>
                    <th style={{ border: '2px solid black' }}>Book</th>
                    <th style={{ border: '2px solid black' }}>Date of Request</th>
                    <th style={{ border: '2px solid black' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((request) => (
                    <tr key={request.borrowId}>
                      <td style={{ border: '2px solid black' }}>{request.userName}</td>
                      <td style={{ border: '2px solid black' }}>{request.bookname}</td>
                      <td style={{ border: '2px solid black' }}>{new Date(request.borrowDate).toLocaleString()}</td>
                      <td style={{ border: '2px solid black' }}>
                        <Button
                          variant="contained"
                          color={request.accessGranted ? "primary" : "success"}
                          onClick={() => handleAccept(request.borrowId, request.userId, request.bookId)}
                        >
                          {request.accessGranted ? "Read" : "Accept"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Requests;
