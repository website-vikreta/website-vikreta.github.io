// importing react packages
import { Link } from "react-router-dom";
import { HashLink as ScrollLink } from "react-router-hash-link";

// Importing Bootstrap Icon
import "bootstrap-icons/font/bootstrap-icons.css";

// Importing assets
import LogoIcon from "../assets/LogoIcon.svg";


const Nav = () => {

   const unCheck = () => {
      document.querySelectorAll("#navToggle")[0].checked = false;
   }
   const scrollUp = () =>{
      window.scrollTo({top: 0, left: 0, behavior:'smooth'})
  }

   return (
      <nav className="navbar">
         <div className="container">
            {/* toggle check */}
            <input type="checkbox" id="navToggle" />
            {/* top nav */}
            <div className="top-nav-wrapper">
               <Link to="/">
                  <div className="logo" onClick={scrollUp}>
                     <img src={LogoIcon} alt="Website Vikreta Logo" /> <h1><span>Website</span>Vikreta</h1>
                  </div>
               </Link>
            </div>
            {/* html toggle */}
            <label className="toggle-btn" htmlFor="navToggle">
               <div className="line one"></div>
               <div className="line two"></div>
            </label>
            {/* navigation list items */}
            <div className="wrapper">
               <ul className="nav-list">
                  <li className="nav-item" onClick={unCheck}><Link to="/">Home</Link></li>
                  <li className="nav-item" onClick={unCheck}><ScrollLink smooth to="../#aboutUs">About Us</ScrollLink></li>
                  <li className="nav-item" onClick={unCheck}><ScrollLink smooth to="../#services">Our Services</ScrollLink></li>
                  <li className="nav-item" onClick={unCheck}><Link to="/work">Our Work</Link></li>
                  <li className="nav-item" onClick={unCheck}><Link to="/contact">Contact Us</Link></li>
               </ul>
               {/* Social Icons */}
               <ul className="social-icons">
                  <li className="social"><a href="https://www.instagram.com/websitevikreta/" target="_BLANK" rel="noreferrer"><i class="bi bi-instagram"></i></a></li>
                  <li className="social"><a href="https://www.linkedin.com/company/websitevikreta/" target="_BLANK" rel="noreferrer"><i class="bi bi-linkedin"></i></a></li>
               </ul>
            </div>
         </div>
      </nav>
   )
}

export default Nav;