import React from "react";
import "./Login.css";
const Login = () => {
  const handleClick = (event) => {
    event.preventDefault()
    console.log('clicked.')
  }
  return (
    <body className="body-loginPage">
      <div class="center">
        <h1>Login</h1>
        <form method="post" id="login-form">
          <div class="txt_field">
            <input type="text" id="email" required />
            <span></span>
            <label>Email-ID</label>
          </div>
          <div class="txt_field">
            <input type="password" id="password" required />
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
    </body>
  );
};

export default Login;
