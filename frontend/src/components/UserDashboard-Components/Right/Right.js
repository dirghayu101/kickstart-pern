import React from "react";
import {useState, useEffect} from "react";
import axios from 'axios'

const Right = () => {
    const [user, setUser] = useState({})
    useEffect(()=>{
        async function fetchUser(){
            try{
                const token = localStorage.getItem('token')
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                const url = `http://localhost:3500/api/v1/user/user-info`
                const response = await axios.get(url)
                setUser(response.data.user)
            } catch(error){
                console.log('error occurred', error)
            }
        }
        fetchUser()
    }, [])
    return (
        <>
         <div class="outer-right">
            <div class="right">
            <div class="top">
                <button id="menu-btn">
                    <span class="material-icons-sharp">
                        menu
                    </span>
                </button>
                <div class="theme-toggler">
                    <span class="material-icons-sharp active">light_mode</span>
                    <span class="material-icons-sharp">dark_mode</span>
                </div>
                <div class="profile">
                    <div class="info">
                        <p>Hey, <b>
                            {user.firstName}</b></p>
                    </div>
                    <div class="profile-photo">
                        <img src="/images/user-panel/profilePicture.png" alt="" srcset=""/>
                    </div>
                </div>
            </div>
            <div class="cart-btn">
                <button></button>
            </div>
        </div>
        </div>
        </>
    )
}

export default Right