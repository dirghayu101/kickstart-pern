import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Aside = () => {
  const [newMessage, setNewMessage] = useState(0);
  const logoutAdmin = () => {
    localStorage.removeItem("token");
  };
  async function getAllMessages() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const getURL =
      "http://localhost:3500/api/v1/admin/reservation/feedbacks/unread";
    const response = await axios.get(getURL);
    if (response.data.success) {
      setNewMessage(response.data.length);
    }
  }

  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <aside>
      <div class="top">
        <div class="logo">
          <h2>
            <span class="danger">K</span>ick<span class="danger">S</span>tart
          </h2>
        </div>
        <div class="close" id="close-btn">
          <span class="material-icons-sharp">close</span>
        </div>
      </div>

      <div class="sidebar">
        <a href="/admin/dashboard/home" class="dashboard">
          <span class="material-icons-sharp">grid_view</span>
          <h3>Dashboard</h3>
        </a>
        <a href="/admin/dashboard/users" class="users">
          <span class="material-icons-sharp">person_outline</span>
          <h3>Users</h3>
        </a>
        <a href="/admin/dashboard/orders" class="orders">
          <span class="material-icons-sharp">receipt_long</span>
          <h3>Orders</h3>
        </a>
        <a href="/admin/dashboard/feedback" class="messages">
          <span class="material-icons-sharp">mail_outline</span>
          <h3>Messages</h3>
          <span class="message-count">{newMessage}</span>
        </a>
        <a href="/admin/dashboard/spaces" class="products">
          <span class="material-icons-sharp">inventory</span>
          <h3>Products</h3>
        </a>
        {/* <a href="/admin/dashboard/settings" class="settings">
          <span class="material-icons-sharp">settings</span>
          <h3>Settings</h3>
        </a> */}
        {/* <a href="/admin/dashboard/add" class="addProducts">
          <span class="material-icons-sharp">add</span>
          <h3>Add Products</h3>
        </a> */}
        <a href="/admin/login" onClick={logoutAdmin}>
          <span class="material-icons-sharp">logout</span>
          <h3>Logout</h3>
        </a>
      </div>
    </aside>
  );
};

export default Aside;
