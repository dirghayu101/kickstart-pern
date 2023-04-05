import React from "react"

const Aside = () => {
    const logoutAdmin = () => {
        localStorage.removeItem('token')
    }

    return (
        <aside>
            <div class="top">
                <div class="logo">
                    <h2><span class="danger">K</span>ick<span class="danger">S</span>tart</h2>
                </div>
                <div class="close" id="close-btn">
                    <span class="material-icons-sharp">close</span>
                </div>
            </div>

            <div class="sidebar">
                <a href="/admin/dashboard/home" class="dashboard">
                    <span class="material-icons-sharp">
                        grid_view
                    </span>
                    <h3>Dashboard</h3>
                </a>
                <a href="/admin/dashboard/users" class="users">
                    <span class="material-icons-sharp">
                        person_outline
                    </span>
                    <h3>Users</h3>
                </a>
                <a href="/admin/dashboard/orders" class="orders">
                    <span class="material-icons-sharp">
                        receipt_long
                    </span>
                    <h3>Orders</h3>
                </a>
                <a href="/admin/dashboard/feedback" class="messages">
                    <span class="material-icons-sharp">
                        mail_outline
                    </span>
                    <h3>Messages</h3>
                    <span class="message-count">12</span>
                </a>
                <a href="/admin/dashboard/spaces" class="products">
                    <span class="material-icons-sharp">
                        inventory
                    </span>
                    <h3>Products</h3>
                </a>
                <a href="/admin/dashboard/settings" class="settings">
                    <span class="material-icons-sharp">
                        settings
                    </span>
                    <h3>Settings</h3>
                </a>
                <a href="/admin/dashboard/add" class="addProducts">
                    <span class="material-icons-sharp">
                        add
                    </span>
                    <h3>Add Products</h3>
                </a>
                <a href="/admin/login" onClick={logoutAdmin}>
                    <span class="material-icons-sharp">
                        logout
                    </span>
                    <h3>Logout</h3>
                </a>
            </div>
        </aside>
    )
}

export default Aside