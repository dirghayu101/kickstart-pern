import React, { useEffect, useState } from "react";
import axios from "axios"
import "./UserInformation.css";

const UserInformation = () => {

  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setCurrentPassword] = useState('')

  function validatedValues(){
    // Code for validation should come here.
    // Return true if successfully validates all cases.
    // You have to validate the values fName, lName, email, phoneNumber and password. They are globally declared so you can directly access them in this function.
    // Return false if not along with an alert about which value is wrong.
    return true;
  }
  async function handleClick(event){
    event.preventDefault();
    const proceed = window.confirm("This action will update your information. Are you sure you want to continue?")
    if(!proceed){
        return;
    }
    try {
        if(!validatedValues()){
            return
        }
        const urlPut = "http://localhost:3500/api/v1/user/update-information"
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.put(urlPut, {
            password,
            phoneNumber,
            firstName:fName,
            lastName: lName,
            mailID: email
        })
        if(response.data.success){
            alert(response.data.message)
            window.location.reload()
        }
    } catch (error) {
        console.error(error)
        alert("Something went wrong!")
    }
  }
  
  function storeData(user){
    setFName(user.firstName)
    setLName(user.lastName)
    setEmail(user.mailID)
    setPhoneNumber(user.phoneNumber)   
  }

  async function fetchUserData() {
    try{
      const token = localStorage.getItem("token")
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      const url = "http://localhost:3500/api/v1/user/user-info"
      const response = await axios.get(url)
      if(response.data.success){
        storeData(response.data.user)
      }
    } catch(error) {
      console.log("Error occurred", error)
    }
  }

  useEffect( () => {
    document.querySelector(".dashboard").classList.add("active");
    fetchUserData()
    return () => {
      document.querySelector(".dashboard").classList.remove("active");
    };
  }, []);

  return <>
    <form>
      <label>
        First Name: 
        <input type="text" value={fName} onChange={(event) => setFName(event.target.value)} />
      </label>
      <br/>
      <label>
        Last Name:
        <input type="text" value={lName} onChange={(event) => setLName(event.target.value)} />
      </label>
      <br/>
      <label>
        Phone Number:
        <input type="text" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}/>
      </label>
      <br/>
      <label>
        Email:
        <p>{email}</p>
      </label>
      <br/>
      <label>
        Enter your current password:
        <input type="password" value={password} onChange={(event) => setCurrentPassword(event.target.value)}/>
      </label>
    </form>
    <button onClick={handleClick}>Update</button>
  </>;
};

export default UserInformation;
