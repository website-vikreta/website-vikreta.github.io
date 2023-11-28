// importing react packages
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


const NavbarCTA = () => {
   const [isNavbarCTAVisible, setIsNavbarCTAVisible] = useState(true);

   return (
      <>
         <div className="navbar-cta">
            <div className="container">
               <div className="text">
                  Just a friendly reminder. Your brand will die without a good website. ☠️
               </div>
               <Link to="/contact" className="link" onClick={() => setIsNavbarCTAVisible(false)}>
                  <span className="link-text">
                     Help us fix
                  </span>
                  <span className="link-icon">
                     <i className="bi bi-check-circle-fill"></i>
                  </span>
               </Link>
               <div className={`close ${isNavbarCTAVisible ? 'show' : 'hide'}`} onClick={() => setIsNavbarCTAVisible(false)}>
                  <i className="bi bi-x-lg"></i>
               </div>
            </div>
         </div >
      </>
   )
}

export default NavbarCTA