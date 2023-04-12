import React from "react";
import "./Signup.css";
import {useState} from "react"
import { useNavigate} from "react-router-dom";
import axios from "axios"

const Signup = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFName] = useState('')
  const [lastName, setLName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
 
  const validatedValues = (password, email, firstName, lastName, phoneNumber) => {
    // First Name Validation
    var namePattern = /^[a-zA-Z]+$/;
    if(!firstName){
      alert("First name not entered!")
      return false;  
    }
    if(!namePattern.exec(firstName)) {
      alert("First name should contain only alphabets");
      return false;
    }
    // Last Name Validation
    if(!namePattern.exec(lastName)) {
      alert("Last name should contain only alphabets");
      return false;
    }
    // Email Validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email){
      alert("Email not entered!")
      return false  //Return false in case the validation fails. DO NOT FORGET.
    }
    if(!emailPattern.exec(email)) {
      alert("Invalid email format!");
      return false;
    }
    // Phonenumber validation
    var phonePattern = /^(?!0{10})\+?\d{10,}$/;
    if(!phoneNumber){
      alert("Phone number not entered!")
      return false;  
    }
    if(!phonePattern.exec(phoneNumber)) {
      alert("Invalid phone number!");
      return false;
    }
    // Password validation: Should have small character, alphanumeric and a symbol and one character in caps. Put validation for that.
    var pwdPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/;
    if(!password){
      alert("Password not entered!")
      return false  //Return false in case the validation fails. DO NOT FORGET.
    }
    if(!pwdPattern.exec(password)) {
      alert("Password should have atleast one uppercase character, one lowercase character, one number and one special symbol");
      return false
    }
    return true   //Return true only is all the values have been successfully validated.

  }

  const handleClick = async (event) => {
    event.preventDefault()
    let response
    try {
      if(!validatedValues(password, email, firstName, lastName, phoneNumber)){
        return
      }
      response = await axios.post('http://localhost:3500/api/v1/user/register', {
      password,
      mailID:email,
      firstName,
      lastName,
      phoneNumber,
      gender:'Male'
    })
    if(response.data.success){
      navigate('/login')
    }
    } catch (error) {
      console.log("error", error)
      alert("An error occurred.")
      navigate('/sign-up')
    }
    
     
  }

  return (
    <body class="body-signUp">
      <div class="container">
        <div class="title">Registration</div>
        <div class="content">
          <form id="reg-form">
            <div class="user-details">
              <div class="input-box">
                <span class="details">First Name</span>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e)=>setFName(e.target.value)}
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
                  value={lastName}
                  onChange={(e)=>setLName(e.target.value)}
                  placeholder="Enter your last name"
                />
                <i class="fa-solid fa-circle-check"></i>
                <i class="fa-solid fa-circle-exclamation"></i>
                <small>Error message</small>
              </div>

              <div class="input-box">
                <span class="details">Email</span>
                <input
                  type="text"
                  id="emailID"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <i class="fa-solid fa-circle-check"></i>
                <i class="fa-solid fa-circle-exclamation"></i>
                <small>Error message</small>
              </div>

              <div class="input-box">
                <span class="details">Phone Number</span>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e)=>setPhoneNumber(e.target.value)}
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
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
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
              <input type="submit" value="Register" onClick={handleClick} />
            </div>
          </form>
        </div>
      </div>
    </body>
  );
};

export default Signup;
