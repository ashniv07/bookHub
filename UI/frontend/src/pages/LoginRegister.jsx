import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/login.css';

function LoginRegister() {
  useEffect(() => {
    const content = document.getElementById('content');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    const addActiveClass = () => content.classList.add('active');
    const removeActiveClass = () => content.classList.remove('active');

    registerBtn.addEventListener('click', addActiveClass);
    loginBtn.addEventListener('click', removeActiveClass);

    return () => {
      registerBtn.removeEventListener('click', addActiveClass);
      loginBtn.removeEventListener('click', removeActiveClass);
    };
  }, []);

  const [userName, setUsername] = useState('');
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [values, setValues] = useState({ userEmail: '', password: '' });
  const navigate = useNavigate();

  function register(event) {
    event.preventDefault();
    axios.post("http://localhost:8080/register", { userName, userEmail, password })
      .then(res => navigate("/manage"))
      .catch(err => {
        if (err.response && err.response.status === 400) {
          alert("Registration failed. Please try again"); 
        } 
      });
  }


  const login = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/login", values)
    .then(response => {
      const token = response.data;
      console.log(token);
      localStorage.setItem("token", token);
      const role = JSON.parse(atob(token.split(".")[1])).roleId;
          console.log(role);
  
          try {
              if (role === 0) {
                  navigate("/addbook");
              } else {
                  navigate("/all");
              }
          } catch {
              setError("Unexpected response data");
          }
      } )
      .catch(err => {
        if (err.response && err.response.data) {
          setError(err.response.data);
        } else {
          setError("An unexpected error occurred");
        }
      });
  };

  return (
    <div className='login-container'>
      <div className='header'>
        <h1 className='brand-name' onClick={() => navigate('/')}>BookHub</h1>
      </div>
      <div className='content justify-content align-items-center d-flex shadow-lg' id='content'>
        <div className='col-md-6 d-flex justify-content-center'>
          <form onSubmit={register}>
            <div className='header-text mb-4'>
              <h1>Create Account</h1>
            </div>
            <div className='input-group mb-3'>
              <input
                type='text'
                className='form-control form-control-lg bg-light fs-6'
                placeholder='Name'
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='input-group mb-3'>
              <input
                type='email'
                className='form-control form-control-lg bg-light fs-6'
                placeholder='Email'
                value={userEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='input-group mb-3'>
              <input
                type='password'
                className='form-control form-control-lg bg-light fs-6'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='input-group mb-3 justify-content-center'>
              <button className='btn-register'>Register</button>
            </div>
          </form>
        </div>

        <div className='col-md-6 right-box'>
          <form onSubmit={login}>
            <div className='header-text mb-5 ' style={{marginLeft:'100px'}}>
              <h1>Login</h1>
            </div>
            <div className='input-group mb-3'>
              <input
                type='email'
                className='form-control form-control-lg bg-light fs-6'
                placeholder='Email'
                onChange={e => setValues({ ...values, userEmail: e.target.value })}
              />
            </div>
            <div className='input-group mb-3'>
              <input
                type='password'
                className='form-control form-control-lg bg-light fs-6'
                placeholder='Password'
                onChange={e => setValues({ ...values, password: e.target.value })}
              />
            </div>
            {/* <div className='input-group mb-5 d-flex justify-content-between'>
              <div className='form-check'>
                <input type='checkbox' className='form-check-input' />
                <label htmlFor='formcheck' className='form-check-label text-secondary'>
                  <small>Remember Me</small>
                </label>
              </div>
              <div className='forgot'>
                <small><a href='#'>Forgot password?</a></small>
              </div>
            </div> */}
            <div className='input-group mb-3 justify-content-center'>
              <button className='btn-login'>Login</button>
            </div>
            {error && <div className='error-message'>{error}</div>}
          </form>
        </div>

        <div className='switch-content'>
          <div className='switch'>
            <div className='switch-panel switch-left'>
              <h1>Hello, again</h1>
              <p>Welcome, We are happy to have you </p>
              <p>Already have an accout?</p>
              <button className='hidden btn border-white text-white w-50 fs-6' id='login'>Login</button>
            </div>
            <div className='switch-panel switch-right'>
              <h1>Welcome</h1>
              <p>Get started with the book paradise</p>
              <p>Don't have an accout?</p>
              <button className='hidden btn border-white text-white w-50 fs-6' id='register'>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
