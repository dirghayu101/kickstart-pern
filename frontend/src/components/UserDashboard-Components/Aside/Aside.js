import React from "react"

const Aside = () => {
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
                <a href="/user/dashboard/home" class="dashboard">
                    <span class="material-icons-sharp">
                        grid_view
                    </span>
                    <h3>Dashboard</h3>
                </a>
                <a href="/user/dashboard" class="users spaces">
                    <span class="material-icons-sharp">
                        workspaces
                    </span>
                    <h3>Spaces</h3>
                </a>
                <a href="/user/dashboard/order" class="orders">
                    <span class="material-icons-sharp">
                        receipt_long
                    </span>
                    <h3>Orders</h3>
                </a>
                <a href="/user/dashboard/feedback" class="reports feedback">
                    <span class="material-icons-sharp">
                        auto_awesome
                    </span>
                    <h3>Feedback</h3>
                </a>
                <a href="/user/dashboard/support"  class="messages support">
                    <span class="material-icons-sharp">
                        handshake
                    </span>
                    <h3>Support</h3>
                </a>
                <a href="/user/dashboard/re-schedule"  class="settings reschedule">
                    <span class="material-icons-sharp">
                        settings
                    </span>
                    <h3>Re-schedule</h3>
                </a>
                <a href="/login">
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