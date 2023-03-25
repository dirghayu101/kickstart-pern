import React, { useState } from 'react';
import '../../App.css';

function Accordion(props) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleAccordion() {
      setIsOpen(!isOpen);
    }
  
    return (
      <div className="accordion">
        <div className="accordion-header" onClick={toggleAccordion}>
          <h3>{props.title}</h3>
          <span className={isOpen ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}></span>
        </div>
        {isOpen && (
          <div className="accordion-body">
            {props.children}
          </div>
        )}
      </div>
    );
        }

export default Accordion;
