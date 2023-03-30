import React from "react";
import {useRef} from 'react'
import "./App.css";

const Plans = () => {

  return (
    <div className="container" id="plans">
      <h2>Our Plans</h2>
      <div className="row">
        <div class="col">
          <div class="card">
            <img src="./images/daypass.jpeg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h4 class="card-title">Day Pass (per day)</h4>
              <p class="card-text">
                Rs. 500 + GST
                <br /> <br />{" "}
              </p>
              <a href="#" class="btn btn-primary">
                Book Now
              </a>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="./images/pass.jpeg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h4 class="card-title">Bulk Day Pass (for 10 days) </h4>
              <p class="card-text">
                Rs. 3000 + GST <br />{" "}
              </p>
              <a href="#" class="btn btn-primary">
                Book Now
              </a>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="./images/meeting.jpg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h4 class="card-title">Meeting Room (per hour)</h4>
              <p class="card-text">
                Rs. 500 + GST <br /> Capacity: 8 people <br />
              </p>
              <a href="#" class="btn btn-primary">
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
