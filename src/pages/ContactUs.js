import ContactForm from "../components/ContactForm";
import { motion } from "framer-motion";
import { frameParentIvert, frameAnimationIvert, pageAnimation, smoothFade } from "../utility/animation";
import { useEffect } from "react";

const ContactUs = () => {
   // Scroll to top
   useEffect(() => {
      window.scrollTo(0, 0)
      document.title = "Contact Us"
   }, [])

   return (
      <motion.div exit="exit" variants={pageAnimation} initial="hidden" animate="show">

         <motion.div variants={frameParentIvert}>
            <motion.div className="animation-frame one" variants={frameAnimationIvert}></motion.div>
            <motion.div className="animation-frame two" variants={frameAnimationIvert}></motion.div>
            <motion.div className="animation-frame three" variants={frameAnimationIvert}></motion.div>
         </motion.div>

         <motion.section className="contact-us" variants={smoothFade}>
            <div className="container">
               <div className="left">
                  <h3 className="heading">Get in touch with us</h3>

                  <ul className="social">
                     <li><a href="https://www.instagram.com/websitevikreta/" target="_BLANK" rel="noreferrer"><i class="bi bi-instagram"></i> @websitevikreta</a></li>
                     <li><a href="mailto:contact@websitevikreta.com" target="_BLANK" rel="noreferrer"><i class="bi bi-envelope"></i> contact@websitevikreta.com</a></li>
                     <li><a href="https://www.linkedin.com/company/websitevikreta/" target="_BLANK" rel="noreferrer"><i class="bi bi-linkedin"></i> @websitevikreta</a></li>
                     <li><a href="tel:+919970445198" target="_BLANK" rel="noreferrer"><i class="bi bi-telephone-fill"></i> +91 9970445198</a></li>
                  </ul>
               </div>
               <div className="line"></div>
               <div className="right">
                  <h3 className="heading">Feel Free to Contact Us</h3>
                  <p className="para">
                     We look forward to hear from you. We take pride in quick response time to all inquiries. If you are interested in receiving a quote for any of our service please fill the form
                  </p>

                  <ContactForm />
               </div>
            </div>
         </motion.section>
      </motion.div>
   )
}

export default ContactUs;