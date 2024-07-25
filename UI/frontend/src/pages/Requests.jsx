import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import Sidebar from '../components/Sidebar';

const Requests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    axios.get('/borrow/pending-requests')
      .then((response) => setPendingRequests(response.data))
      .catch((error) => console.error('Error fetching pending requests:', error));
  }, []);

  return (
    <div className='request' style={{display:"flex"}}>
      <Sidebar/>
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
              <th>Accept</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((request) => (
              <tr key={request.borrowId}>
                <td>{request.userName}</td>
                <td>{request.bookname}</td>
                <td>{new Date(request.borrowDate).toLocaleString()}</td>
                <td><button type="button" className="btn btn-success">Accept</button></td>
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
