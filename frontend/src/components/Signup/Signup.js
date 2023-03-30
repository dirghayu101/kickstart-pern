import React from "react";
import './Signup.css';

const Signup = () => {
    return(
        <body class="body-signUp">
    <div class="container">
      <div class="title">Registration</div>
      <div class="content">
        <form id="reg-form" action="#">
          <div class="user-details">
            <div class="input-box">
              <span class="details">First Name</span>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
              />
              <i class="fa-solid fa-circle-check"></i>
              <i class="fa-solid fa-circle-exclamation"></i>
              <small>Error message</small>
            </div>

            <div class="input-box">
              <span class="details">Last Name</span>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
              />
              <i class="fa-solid fa-circle-check"></i>
              <i class="fa-solid fa-circle-exclamation"></i>
              <small>Error message</small>
            </div>

           
            <div class="input-box">
              <span class="details">Email</span>
              <input type="text" id="emailID" placeholder="Enter your email" />
              <i class="fa-solid fa-circle-check"></i>
              <i class="fa-solid fa-circle-exclamation"></i>
              <small>Error message</small>
            </div>

        
            <div class="input-box">
              <span class="details">Phone Number</span>
              <input
                type="text"
                id="phoneNumber"
                placeholder="Enter your number"
              />
              <i class="fa-solid fa-circle-check"></i>
              <i class="fa-solid fa-circle-exclamation"></i>
              <small>Error message</small>
            </div>

            <div class="input-box">
              <span class="details">Password</span>
              <input
                type="password"
                id="fPassword"
                placeholder="Enter your password"
              />
              <i class="fa-solid fa-circle-check"></i>
              <i class="fa-solid fa-circle-exclamation"></i>
              <small>Error message</small>
            </div>

            
            <div class="input-box">
              <span class="details">Confirm Password</span>
              <input
                type="password"
                id="sPassword"
                placeholder="Confirm your password"
              />
              <i class="fa-solid fa-circle-check"></i>
              <i class="fa-solid fa-circle-exclamation"></i>
              <small>Error message</small>
            </div>
          </div>

          <div class="gender-details">
            
            <input type="radio" name="gender" id="dot-1" />
            <input type="radio" name="gender" id="dot-2" />
            <input type="radio" name="gender" id="dot-3" />
            <span class="gender-title">Gender</span>

          
            <div class="category">
              <label for="dot-1">
                <span class="dot one"></span>
                <span class="gender">Male</span>
              </label>
              <label for="dot-2">
                <span class="dot two"></span>
                <span class="gender">Female</span>
              </label>
              <label for="dot-3">
                <span class="dot three"></span>
                <span class="gender">Prefer not to say</span>
              </label>
            </div>
          </div>

         
          <div class="button">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
    </body>
    )
}

export default Signup;