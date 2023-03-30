import React from 'react';
import Accordion from './Accordion';
import './App.css'

const Faq = () => {
  return (
     <div className='faq-container'>
      <h2>Frequently Asked Questions</h2>
      <Accordion title="What is a co-working space?">
        <p>Coworking is a global movement that provides collaborative and innovative office space solutions for
              people to grow their businesses. It is generally defined as flexible, membership-based workspaces where
              diverse groups of freelancers, remote workers, and other independent professionals work together in a
              shared, communal setting.</p>
      </Accordion>
      <Accordion title="Where are you located?">
        <p>We are located in Bengaluru. <br/>
              Address: #1 & 9, 4th Floor Eshwara Temple Road,
              Off Kanakpura Road, Doddakallasandra
              Bengaluru - 62.</p>
      </Accordion>
      <Accordion title="What are the amenities?">
        <p>Following amenities are offered by Kick Start Work Hubs :
            <ul type="disc">
              <li>High speed Internet</li>
              <li>Power back up</li>
              <li>A/C</li>
              <li>Comfortable seating</li>
              <li>Broad cubicle</li>
              <li>Conference room</li>
              <li>Coffee/Tea </li>
              </ul></p>
      </Accordion>
      
    </div>

  )
}

export default Faq;
