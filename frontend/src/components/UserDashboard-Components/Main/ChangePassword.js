import React, { useEffect, useState } from "react";
import axios from "axios"
import "./ChangePassword.css"

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfNewPassword] = useState('')


    function passwordValidated(){
        // Return true if password values pass all validations.
        // oldPassword, newPassword and confirmNewPassword are values that you have to validate. They can be accessed directly in this function as they are declared globally.
        // Send an alert message if there is something lacking in the password.
        // Return true if all validations are successfully.
    var pwdPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    if(!oldPassword || !newPassword || !confirmNewPassword){
      alert("Enter the fields specified!")
      return false  
    }
    if(!pwdPattern.exec(oldPassword)) {
      alert("Password should have at least one uppercase character, one lowercase character, one number and one special symbol");
      return false
    }
    if(!pwdPattern.exec(newPassword)) {
        alert("Password should have at least one uppercase character, one lowercase character, one number and one special symbol");
        return false
    }
    if (newPassword !== confirmNewPassword) {
        alert("New password and confirm password do not match!");
        return false;
      }
    return true;
    }

    async function updatePassword(event){
        event.preventDefault();
        try{
            if(!passwordValidated()){
                return
            }
            const urlPut = "http://localhost:3500/api/v1/user/password/update"
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axios.put(urlPut, {
                oldPassword,
                newPassword
            })
            if(response.data.success){
                alert(response.data.message)
                window.location.reload()
            }
        } catch(error){
            console.log(error)
            alert("Something went wrong!")
        }
    }

    useEffect( () => {
        document.querySelector(".dashboard").classList.add("active");
        return () => {
          document.querySelector(".dashboard").classList.remove("active");
        };
      }, []);

    return (
        <>
            <form>
                <label>
                    Enter the current password:
                    <input type="password" value={oldPassword} onChange={(event) => setOldPassword(event.target.value)} />
                </label>
                <br/>
                <label>
                    Enter the new password:
                    <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                </label>
                <br/>
                <label>
                    Confirm new password:
                    <input type="password" value={confirmNewPassword} onChange={(event) => setConfNewPassword(event.target.value)} />
                </label>
                <br/>
            </form>
            <button id="updateBtn" onClick={updatePassword}>Update</button>
        </>
    )
}

export default ChangePassword