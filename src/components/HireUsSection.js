import { Link } from "react-router-dom";

const HireUsSection = () => {
   return (
      <section className="hire-us">
         <div className="container">
            <div className="left">
               <h2 className="heading">Hire us for your next project</h2>
               <p className="para">
                  We can help! We are passionate about making beautiful websites help you to grow your business.
               </p>
            </div>

            <div className="center">
               <div className="line"></div>
               <div className="line"></div>
               <div className="line"></div>
            </div>

            <div className="right">
               <Link to="/work" className="normal-btn primary">View Our Work</Link>
               <Link to="/contact" className="normal-btn secondary">Get a Free Quote</Link>
            </div>
         </div>
      </section>
   )
}

export default HireUsSection;