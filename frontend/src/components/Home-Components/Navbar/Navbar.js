import React, { useState, useEffect } from 'react';
import { Button } from '../Buttons/Button.js';
import "./Navbar.css"
import {Link} from "react-router-dom";
import {HashLink} from "react-router-hash-link"

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [navbar, setNavbar] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {  //hook to call function after render
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const changeBackground = () => {
    if (window.pageYOffset >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }

  window.addEventListener('scroll', changeBackground);

  return (
    
    <>
    <nav className={navbar ? 'navbar active' : 'navbar'}>
      <div className='navbar-container'>
        <HashLink smooth to='/#home' className='navbar-logo' onClick={closeMobileMenu}>
        <span className="styleBrand"> K</span>ick<span className="styleBrand">S</span>tart
         &nbsp; <span className="styleBrand"> W</span>ork<span className="styleBrand">H</span>ubs
        </HashLink>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <HashLink smooth to='/#home' className='nav-links' onClick={closeMobileMenu}>
              Home
            </HashLink>
          </li>
          <li className='nav-item'>
            <HashLink
              smooth to='#about'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              About
            </HashLink>
          </li>
          <li className='nav-item'>
            <HashLink
              to='/#plans'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Our Plans
            </HashLink>
          </li>
          <li className='nav-item'>
            <Link
              to='/login'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to='/sign-up'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </li>
        </ul>
        {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
      </div>
    </nav>
  </>
  )
}

export default Navbar
