import React from "react";
import './Login.css';
const Login = () => {
    return(
   

    <div class="center">
      <h1>Login</h1>
      <form method="post" id="login-form">
        <div class="txt_field">
          <input type="text" id="email" required/>
          <span></span>
          <label>Email-ID</label>
        </div>
        <div class="txt_field">
          <input type="password" id="password" required/>
          <span></span>
          <label>Password</label>
        </div>
        <div class="pass">Forgot Password?</div>
        <input type="submit" value="Login"/>
        <div class="signup_link">
          Not a member? <a href="/user/signup">Signup</a>
        </div>
      </form>
    </div>


    )
}

export default Login;