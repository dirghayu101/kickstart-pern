import React from "react";
import axios from "axios"
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = ({filler, urlPost, urlNavigate}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return '';
  }

  const handleClick = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(urlPost, {
        mailID:email,
        password
      });
      if(response.data.success){
        const token = response.data.token
        localStorage.setItem('token', token)
        navigate(urlNavigate)
      } else{
        alert('User/Password is incorrect!')
      }
      // do something with the response data
    } catch (error) {
      console.error(error);
      alert('User/Password is incorrect!')
    }
  }
  return (
    <div className="body-loginPage">
      <div class="center">
        <h1>{filler} Login</h1>
        <form method="post" id="login-form">
          <div class="txt_field">
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}  required />
            <span></span>
            <label>Email-ID</label>
          </div>
          <div class="txt_field">
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <span></span>
            <label>Password</label>
          </div>
          <div class="pass">Forgot Password?</div>
          <input type="submit" value="Login" onClick={handleClick} />
          <div class="signup_link">
            Not a member? <a href="/sign-up">Signup</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
