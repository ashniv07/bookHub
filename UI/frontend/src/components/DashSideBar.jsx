
import React, { useEffect, useState } from 'react';
import axios from '../setupAxios'; // Ensure axios is correctly configured

const profileImage = 'https://via.placeholder.com/80';

const DashSideBar = () => {
  const [toDoList, setToDoList] = useState([]);
  const [newToDo, setNewToDo] = useState('');
  const [userName, setUserName] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/userinfo', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(response.data.userName);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setUserName('Guest');
      }
    };

    const fetchToDos = async () => {
      const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;
      if (userId) {
        try {
          const response = await axios.get(`/todo/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setToDoList(response.data);
        } catch (error) {
          console.error('Error fetching to-do list:', error);
        }
      }
    };

    fetchUserInfo();
    fetchToDos();
  }, [token]);

  const handleAddToDo = async () => {
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;
    if (userId && newToDo.trim()) {
      try {
        await axios.post('/todo/addtodo', { userId, bookName: newToDo }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNewToDo('');
        const response = await axios.get(`/todo/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setToDoList(response.data);
      } catch (error) {
        console.error('Error adding to-do:', error);
      }
    }
  };

  const handleCompleteToDo = async (todoId) => {
    try {
      await axios.patch(`/todo/done/${todoId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;
      if (userId) {
        const response = await axios.get(`/todo/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setToDoList(response.data);
      }
    } catch (error) {
      console.error('Error completing to-do:', error);
    }
  };

  const handleDeleteToDo = async (todoId) => {
    try {
      await axios.delete(`/todo/${todoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;
      if (userId) {
        const response = await axios.get(`/todo/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setToDoList(response.data);
      }
    } catch (error) {
      console.error('Error deleting to-do:', error);
    }
  };

  return (
    <div className="text-white vh-100 d-flex flex-column p-3" style={{ width: '300px', backgroundColor: '#1f1e2c', height: '100vh', position: 'fixed', overflowY: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', marginTop: '100px' }}>
        <img src={profileImage} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '10px' }} />
        <h2 style={{ margin: '0' }}>{userName}</h2>
      </div>

      {/* To-Do List Section */}
      <div style={{ backgroundColor: '#f8f3ed', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '20px', marginTop: '20px', height: 'calc(100vh - 220px)', overflowY: 'auto' }}>
        <h4 style={{ marginBottom: '20px', color: 'black', marginLeft: '8px', fontWeight: 'bold' }}>Book CheckList</h4>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {toDoList.map((todo) => (
            <li key={todo.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCompleteToDo(todo.id)}
                style={{ marginRight: '10px' }}
              />
              <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none', color: 'black', fontWeight: 'bold' }}>
                {todo.bookName}
              </span>
              <input
                type="button"
                value="Delete"
                onClick={() => handleDeleteToDo(todo.id)}
                style={{ marginLeft: '10px', backgroundColor: '#e57373', border: 'none', color: '#fff', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}
              />
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '30px', borderTop: '1px solid #000', paddingTop: '10px', paddingBottom: '10px', paddingRight: '10px', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={newToDo}
            onChange={(e) => setNewToDo(e.target.value)}
            placeholder="Add To List"
            style={{ flex: 1, padding: '2px', borderRadius: '5px', border: '1px solid #ddd', marginRight: '5px', width: '20px' }}
          />
          <button
            onClick={handleAddToDo}
            style={{ padding: '5px 10px', backgroundColor: '#ffeb3b', border: 'none', borderRadius: '5px', color: '#000', fontWeight: 'bold' }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashSideBar;
