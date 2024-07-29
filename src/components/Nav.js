import { Link, useLocation } from "react-router-dom";
import { HashLink as ScrollLink } from "react-router-hash-link";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import NavbarCTA from "./NavbarCTA";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoIcon from "../assets/LogoIcon.svg";

const Nav = () => {
  const location = useLocation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const unCheck = () => {
    document.querySelectorAll("#navToggle")[0].checked = false;
  };

  const scrollUp = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      scrollUp();
    }
    unCheck();
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="container">
          <input type="checkbox" id="navToggle" />
          <div className="top-nav-wrapper">
            <Link to="/">
              <div className="logo" onClick={scrollUp}>
                <img src={LogoIcon} alt="Website Vikreta Logo" />
                <h1><span>Website</span>Vikreta</h1>
              </div>
            </Link>
          </div>
          <label className="toggle-btn" htmlFor="navToggle">
            <div className="line one"></div>
            <div className="line two"></div>
          </label>
          <div className="wrapper">
            <ul className="nav-list">
              <li className="nav-item" onClick={handleHomeClick}>
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item" onClick={unCheck}>
                <ScrollLink smooth to="../#aboutUs">About Us</ScrollLink>
              </li>
              <li className="nav-item" onClick={unCheck}>
                <ScrollLink smooth to="../#services">Our Services</ScrollLink>
              </li>
              <li className="nav-item">
                <Link to="/" onClick={toggleDropdown}>
                  Calculator
                </Link>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="dropdown-icon"
                  onClick={toggleDropdown}
                />
                <div className={`dropdown ${dropdownVisible ? 'show' : ''}`}>
                  <ul className="dropdown-menu">
                    <li onClick={unCheck}><Link to="/website-cost-calculator">Website Cost Calculator</Link></li>
                  </ul>
                </div>
              </li>
              <li className="nav-item" onClick={unCheck}>
                <Link to="/work">Our Work</Link>
              </li>
              <li className="nav-item" onClick={unCheck}>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
            <ul className="social-icons">
              <li className="social">
                <a href="https://www.instagram.com/websitevikreta/" target="_BLANK" rel="noreferrer">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li className="social">
                <a href="https://www.linkedin.com/company/websitevikreta/" target="_BLANK" rel="noreferrer">
                  <i className="bi bi-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <NavbarCTA />
    </header>
  );
}

export default Nav;
