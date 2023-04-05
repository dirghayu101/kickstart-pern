import React from "react";
import { useEffect} from "react"

const Main = () => {
  
  useEffect(() => {
    document.querySelector(".dashboard").classList.add("active");
    return () => {
     document.querySelector(".dashboard").classList.remove("active")
    }
  }, [])
  
  return (
    <>
      <main>
        <h1>Dashboard</h1>
        <div class="date">
          <input type="date" />
        </div>

        {/* <!-- This div will contain information like sales and everything. I can make it dynamically later. --> */}
        <div class="insights">
          {/* <!-- Start of sales section --> */}
          <div class="sales">
            <span class="material-icons-sharp">analytics</span>
            <div class="middle">
              <div class="left">
                <h3>Total Sales</h3>
                <h1>₹100,000</h1>
              </div>
              <div class="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div class="number">
                  <p>81%</p>
                </div>
              </div>
            </div>
            <small class="text-muted">Last 24 Hours</small>
          </div>
          {/* <!-- End of sales section --> */}

          {/* <!-- Start of expenses section. I can make it seats available and reserved section. --> */}
          <div class="expenses">
            <span class="material-icons-sharp">bar_chart</span>
            <div class="middle">
              <div class="left">
                <h3>Total Expenses</h3>
                <h1>₹23,046</h1>
              </div>
              <div class="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div class="number">
                  <p>33%</p>
                </div>
              </div>
            </div>
            <small class="text-muted">Last 24 Hours</small>
          </div>

          {/* <!-- End of expenses section. --> */}

          {/* <!-- Start of income section. --> */}

          <div class="income">
            <span class="material-icons-sharp">stacked_line_chart</span>
            <div class="middle">
              <div class="left">
                <h3>Total Income</h3>
                <h1>₹76,954</h1>
              </div>
              <div class="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div class="number">
                  <p>67%</p>
                </div>
              </div>
            </div>
            <small class="text-muted">Last 24 Hours</small>
          </div>
          {/* <!-- End of income section. --> */}
        </div>
        {/* <!-- End of insights section. --> */}

        <div class="recent-reservations">
          <h2>Recent Reservations</h2>
          <table>
            <thead>
              <tr>
                <th>Reservation Type</th>
                <th>Contact Number</th>
                <th>Holder Name</th>
                <th>Reservation Time</th>
                <th>Payment</th>
                <th>Seat ID</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- I can use a loop to dynamically generate rows here using EJS. --> */}
              <tr>
                <td>Cubicle</td>
                <td>7668722367</td>
                <td>Dirghayu Joshi</td>
                <td>21/09/2022 9-17</td>
                <td>₹800</td>
                <td>32</td>
                <td class="primary">Details</td>
              </tr>
              <tr>
                <td>Cubicle</td>
                <td>7668722367</td>
                <td>Dirghayu Joshi</td>
                <td>21/09/2022 9-17</td>
                <td>₹800</td>
                <td>32</td>
                <td class="primary">Details</td>
              </tr>
              <tr>
                <td>Cubicle</td>
                <td>7668722367</td>
                <td>Dirghayu Joshi</td>
                <td>21/09/2022 9-17</td>
                <td>₹800</td>
                <td>32</td>
                <td class="primary">Details</td>
              </tr>
              <tr>
                <td>Cubicle</td>
                <td>7668722367</td>
                <td>Dirghayu Joshi</td>
                <td>21/09/2022 9-17</td>
                <td>₹800</td>
                <td>32</td>
                <td class="primary">Details</td>
              </tr>
              <tr>
                <td>Cubicle</td>
                <td>7668722367</td>
                <td>Dirghayu Joshi</td>
                <td>21/09/2022 9-17</td>
                <td>₹800</td>
                <td>32</td>
                <td class="primary">Details</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Main;
