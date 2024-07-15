// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import '../styles/login.css';
// import '../components/NavBar';
// import axios from 'axios';
// import NavBar from '../components/NavBar';

// function LoginRegister() {
//     <NavBar/>
//   useEffect(() => {
//     const content = document.getElementById('content');
//     const registerBtn = document.getElementById('register');
//     const loginBtn = document.getElementById('login');

//     const addActiveClass = () => content.classList.add('active');
//     const removeActiveClass = () => content.classList.remove('active');

//     registerBtn.addEventListener('click', addActiveClass);
//     loginBtn.addEventListener('click', removeActiveClass);

//     return () => {
//       registerBtn.removeEventListener('click', addActiveClass);
//       loginBtn.removeEventListener('click', removeActiveClass);
//     };
//   }, []);

//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   function register(event) {
//     event.preventDefault();
//     axios.post("http://localhost:8081/register", { username, email, password })
//       .then(res => {
//         navigate("/home");
//       }).catch(err => console.log(err));
//   }

//   const[values,setValues]=useState(
//     {
//       email:'',
//       password:''
//     }
//   )

//   function login(event){
//     event.preventDefault();
//     axios.post("http://localhost:8081/login", values)
//       .then(res => {
//         if(res.data.Status=="Success"){
//           navigate("/home");
//         }
//         else{
//           alert(res.data.Error)
//         }
        
//       }).catch(err => console.log(err));

//   }

//   return (
//     <div className='login-container'>
//       <NavBar />
//       <div className='content justify-content align-items-center d-flex shadow-lg' id='content'>
//         <div className='col-md-6 d-flex justify-content-center'>
//           <form onSubmit={register}>
//             <div className='header-text mb-4'>
//               <h1>Create Account</h1>
//             </div>
//             <div className='input-group mb-3'>
//               <input
//                 type='text'
//                 className='form-control form-control-lg bg-light fs-6'
//                 placeholder='Name'
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div className='input-group mb-3'>
//               <input
//                 type='email'
//                 className='form-control form-control-lg bg-light fs-6'
//                 placeholder='Email'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className='input-group mb-3'>
//               <input
//                 type='password'
//                 className='form-control form-control-lg bg-light fs-6'
//                 placeholder='Password'
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className='input-group mb-3 justify-content-center'>
//               <button className='btn-border-white text-white w-50 fs-6'>Register</button>
//             </div>
//           </form>
//         </div>

//         <div className='col-md-6 right-box'>
//           <form onSubmit={login}>
//             <div className='header-text mb-4'>
//               <h1>Login</h1>
//             </div>
//             <div className='input-group mb-3'>
//               <input type='email' className='form-control form-control-lg bg-light fs-6' placeholder='Email'
//               onChange={e=>setValues({...values,email:e.target.value})}
//               />
//             </div>
//             <div className='input-group mb-3'>
//               <input type='password' className='form-control form-control-lg bg-light fs-6' placeholder='Password' 
//               onChange={e=>setValues({...values,password:e.target.value})}
//               />
//             </div>
//             <div className='input-group mb-5 d-flex justify-content-between'>
//               <div className='form-check'>
//                 <input type='checkbox' className='form-check-input' />
//                 <label htmlFor='formcheck' className='form-check-label text-secondary'><small>Remember Me</small></label>
//               </div>
//               <div className='forgot'>
//                 <small><a href='#'>Forgot password?</a></small>
//               </div>
//             </div>
//             <div className='input-group mb-3 justify-content-center'>
//               <button className='btn-border-white text-white w-50 fs-6'>Login</button>
//             </div>
//           </form>
//         </div>

//         <div className='switch-content'>
//           <div className='switch'>
//             <div className='switch-panel switch-left'>
//               <h1>Hello, again</h1>
//               <p>We are happy to see you again</p>
//               <button className='hidden btn text-white w-50 fs-6' id='login'>Login</button>
//             </div>

//             <div className='switch-panel switch-right'>
//               <h1>Welcome</h1>
//               <p>Get started with BookHub</p>
//               <button className='hidden btn border-white text-white w-50 fs-6' id='register'>Register</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginRegister;
