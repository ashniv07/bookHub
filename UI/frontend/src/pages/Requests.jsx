import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import Sidebar from '../components/Sidebar';
import { Button } from '@mui/material';

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
    <div className='request' style={{ display: "flex" }}>
      <Sidebar />
      <Container>
        <h1 className='mt-4 text-center'>PENDING REQUESTS</h1>
        {pendingRequests.length === 0 ? (
          <p className='mt-4 text-center'>No Borrow requests from users</p>
        ) : (
          <table className="table table-striped table-bordered table-hover column-spacing mt-4">
            <thead className="thead-dark">
              <tr>
                <th>User</th>
                <th>Book</th>
                <th>Date of Request</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request) => (
                <tr key={request.borrowId}>
                  <td>{request.userName}</td>
                  <td>{request.bookname}</td>
                  <td>{new Date(request.borrowDate).toLocaleString()}</td>
                  <td>
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
        )}
      </Container>
    </div>
  );
}

export default Requests;
