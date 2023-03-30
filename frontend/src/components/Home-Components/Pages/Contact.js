import React from 'react';
import { useForm } from "react-hook-form";
// import { Form, Button } from 'semantic-ui-react';
import './App.css'

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div class='contact'>
    <div class="content">
      <h2>Get In Touch</h2>
    </div>
    <div class="container">
      <div class="contactInfo">
        <div class="box">
          <div class="c_icon"><i class="fas fa-map-marker-alt"></i></div>
          <div class="c_text">
            <h3>Address</h3>
            <p>#1 & 9, 4th Floor Eshwara Temple Road, <br/>
              Off Kanakpura Road, Doddakallasandra <br/>
              Bengaluru - 62.</p>
          </div>
        </div>
        <div class="box">
          <div class="c_icon"><i class="fas fa-phone-alt"></i></div>
          <div class="c_text">
            <h3>Phone</h3>
            <p>9535672727</p>
          </div>
        </div>
        <div class="box">
          <div class="c_icon"><i class="fas fa-envelope"></i></div>
          <div class="c_text">
            <h3>Email</h3>
            <p>info@kickstartworkhubs.com</p>
          </div>
        </div>
      </div>
      <div class="contactForm">
        <h2>Send us a message</h2>
        <h3>We would love to hear from you!</h3>
        <form action="https://formsubmit.co/vulewuhu@mailgolem.com" method="POST">
        <input type="hidden" name="_subject" value="New submission!"/>
          <div class="inputBox">
            <input type="text" name='name' pattern="^[A-Za-z]+$" title="Please enter a valid name" required />
            <span>Name</span>
            {/* {errors.name && <p className="error">Name is required</p>} */}
          </div>
          <div class="inputBox">
            <input type="text" name='email' {...register('email', { required: true, pattern: /^\S+@\S+$/i })} required />
            <span>Email</span>
            {errors.email && <p className="error">Enter a valid email address</p>}
          </div>
          <div class="inputBox">
            <input type="number" name='phone' {...register('phone', { required: true, pattern: /^[0-9]*$/ })} required   />
            <span>Phone number</span>
            {errors.phone && <p className="error">Enter a valid phone number</p>}
          </div>
          <div class="inputBox">
            <textarea name='msg' title="Message is required" required></textarea>
            <span>Enter your message</span>
            {/* {errors.msg && <p className="error">Message is required</p>} */}
          </div>
          <div class="inputBox">
            <input type="submit" value="Send" />
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Contact;
