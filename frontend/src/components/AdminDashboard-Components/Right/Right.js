import React from "react";

const Right = () => {
  return (
    <>
      <div className="outer-right">
        <div class="right">
          <div class="top">
            <button id="menu-btn">
              <span class="material-icons-sharp">menu</span>
            </button>
            <div class="profile">
              <div class="info">
                <p>
                  Hey, <b>Suman</b>
                </p>
                <small class="text-muted">Admin</small>
              </div>
              <div class="profile-photo">
                <img src="/images/admin/founderPicture.jpeg" alt="" srcset="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Right;
