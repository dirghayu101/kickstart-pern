import React from 'react';
import {useRef} from 'react';
import './App.css'

const About = () => {
  return (
    <div class='about' id="about">
      <div class="about-content">
      <h2>About Us</h2>
      <p>Looking for the most flexible way to get back to work away from your home office?
We offer affordable co-working workspace solutions that keep teams productive and safe.  Choose from our offerings of  hot seat, private office space, virtual office space and  conference rooms.
<br />
Save more with our introductory offer of 25%  on our Private Office Space Package.
Refer a Friend and if they join both you and your friend get 25% off your rent for one full month.</p>
    </div>
    <div class="image-section">
      <img src="./images/img-about.jpeg" alt="" />
    </div>
    </div>
  )
}

export default About;
