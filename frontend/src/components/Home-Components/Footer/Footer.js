import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div class='footer'>
      <p>Questions? Call 9535672727</p>
      <div class="footer-cols">
      <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">Account</a></li>
          <li><a href="/">About Us</a></li>
        </ul>
        <ul>
          <li><a href="/">FAQ</a></li>
          <li><a href="/">Contact Us</a></li>
          <li><a href="/">Privacy Policy</a></li>
        </ul>
        <ul>
          <li><a href="/">Help</a></li>
          <li><a href="/">Terms and Conditions</a></li>
          <li><a href="/">Legal Notices</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
