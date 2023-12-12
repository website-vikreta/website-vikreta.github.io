import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LogoIcon from "../assets/LogoIcon.svg";
import { HashLink as ScrollLink } from "react-router-hash-link";

const Footer = () => {
   return (
      <motion.footer layout>
         <section className="footer">
            <div className="container">
               <div className="left">
                  <Link to="/">
                     <div className="logo">
                        <img src={LogoIcon} alt="Website Vikreta Logo" /><h1><span>Website</span>Vikreta</h1>
                     </div>                              
                  </Link>
                  <p className="des">
                     Website Vikreta is an answer to all your web development needs. We provide services to whoever need, from small start-ups to large corporation. Our mission is to fulfil your needs and give you the best service.
                  </p>
               </div>
            
               <div className="right">
                  <div className="quickLinks">
                     <span className="link"><i class="icon bi bi-chevron-right"></i><Link to="/">Home</Link></span>
                     <span className="link"><i class="icon bi bi-chevron-right"></i><ScrollLink smooth to="../#aboutUs">About Us</ScrollLink></span>
                     <span className="link"><i class="icon bi bi-chevron-right"></i><ScrollLink smooth to="../#services">Our Services</ScrollLink></span>
                     <span className="link"><i class="icon bi bi-chevron-right"></i><Link to="/work">Our Work</Link></span>
                     <span className="link"><i class="icon bi bi-chevron-right"></i><Link to="/contact">Contact Us</Link></span>
                  </div>

                  <div className="social-media">
                     <a href="https://www.instagram.com/websitevikreta/" target="_BLANK" rel="noreferrer"><i className="icon bi bi-instagram"></i>&nbsp; instagram</a>
                     <a href="https://www.linkedin.com/company/websitevikreta/" target="_BLANK" rel="noreferrer"><i className="icon bi bi-linkedin"></i>&nbsp;  linkedin</a>
                  </div>
                  <div className="line"></div>
                  <p className="copyright">© 2020-23 <span>Website</span>Vikreta.<br className="break" /> All rights reserved</p>
               </div>
            </div>
         </section>
      </motion.footer>
   )
}

export default Footer;