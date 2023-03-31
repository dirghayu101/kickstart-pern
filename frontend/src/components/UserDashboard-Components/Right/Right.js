import React from "react"

const Right = () => {
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
                            </b></p>
                        <small class="text-muted">User</small>
                    </div>
                    <div class="profile-photo">
                        {/* <img src="/assets/user-panel/profilePicture.png" alt="" srcset=""> */}
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