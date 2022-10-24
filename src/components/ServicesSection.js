import Service1 from "../assets/Service1.svg";
import Service2 from "../assets/Service2.svg";
import Service3 from "../assets/Service3.svg";
import Service4 from "../assets/Service4.svg";

import { Link } from "react-router-dom";

const ServicesSection = () => {
   return (
      <section className="services" id="services">
         <div className="container">
            <div className="heading">
               <h2>Our Services</h2>
               <div className="line"></div>
            </div>

            <div className="card-wrapper">

               <div className="card">
                  <img src={Service4} alt="Web Design Service Img" />

                  <h4 className="card-heading">UX  Design</h4>
                  <p className="para">
                     Every application experience should be user friendly, and when you're working with us you don't have to worry about that. We provide
                  </p>
                  <ul>
                     <li><i class="bi bi-patch-check"></i> UX Research</li>
                     <li><i class="bi bi-patch-check"></i> Interaction Design</li>
                     <li><i class="bi bi-patch-check"></i> Wireframing</li>
                     <li><i class="bi bi-patch-check"></i> Strategy & Planning</li>
                  </ul>
               </div>
               <div className="card">
                  <img src={Service3} alt="Web Development Service Img" />

                  <h4 className="card-heading">UI Design</h4>
                  <p className="para">
                     The first thing user notices about anything is how it looks, how it feels. We provide design interface, not what you need, but what you deserve.
                  </p>
                  <ul>
                     <li><i class="bi bi-patch-check"></i> Website Design / Re-Design</li>
                     <li><i class="bi bi-patch-check"></i> App Design / Re-Design</li>
                     <li><i class="bi bi-patch-check"></i> Prototyping</li>
                     <li><i class="bi bi-patch-check"></i> MockUps & Design Systems</li>
                  </ul>
               </div>
               <div className="card">
                  <img src={Service2} alt="Web & Mobile App Service Img" />

                  <h4 className="card-heading">Website Development</h4>
                  <p className="para">
                     We are an innovative web development agency delivering quality, yet affordable websites for businesses all over the globe.
                  </p>
                  <ul>
                     <li><i class="bi bi-patch-check"></i> Dynamic / Static Website</li>
                     <li><i class="bi bi-patch-check"></i> Landing Pages</li>
                     <li><i class="bi bi-patch-check"></i> Figma/XD to HTML</li>
                     <li><i class="bi bi-patch-check"></i> Front-end Development</li>
                     <li><i class="bi bi-patch-check"></i> Responsive Websites</li>
                  </ul>
               </div>
               <div className="card">
                  <img src={Service1} alt="Digital Marketing Service Img" />

                  <h4 className="card-heading">Web & Mobile Apps</h4>
                  <p className="para">
                     We provide mobile friendly and responsive web applications and well mobile applications for client needs.
                  </p>
                  <ul>
                     <li><i class="bi bi-patch-check"></i> Web Apps / Portals</li>
                     <li><i class="bi bi-patch-check"></i> Content Management Systems</li>
                     <li><i class="bi bi-patch-check"></i> CRM Systems</li>
                     <li><i class="bi bi-patch-check"></i> E-Commerce Solutions</li>
                     <li><i class="bi bi-patch-check"></i> Custom Application Development</li>
                  </ul>
               </div>
            </div>

            <div className="button-group">
               <Link to="/work" className="normal-btn primary">View Our Work</Link>
               <Link to="/contact" className="normal-btn secondary">Get a Free Quote</Link>
            </div>
         </div>
      </section>
   )
}

export default ServicesSection;