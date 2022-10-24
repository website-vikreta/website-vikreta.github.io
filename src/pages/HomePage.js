// importing components
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import FaqSection from "../components/FaqSection";
import TestimonialSection from "../components/TestimonialSection";
import HireUsSection from "../components/HireUsSection";


import { motion } from "framer-motion";
import { pageAnimation, frameParentIvert, frameAnimationIvert, fade } from "../utility/animation";

import { useEffect } from "react";

const HomePage = () => {
   // Scroll to top
   useEffect(() => {
      window.scrollTo(0, 0)
      document.title = "Website Design & Development Agency | Website Vikreta"
   }, [])

   return (
      <motion.div exit="exit" variants={pageAnimation} initial="hidden" animate="show">

         <motion.div variants={frameParentIvert}>
            <motion.div className="animation-frame one" variants={frameAnimationIvert}></motion.div>
            <motion.div className="animation-frame two" variants={frameAnimationIvert}></motion.div>
            <motion.div className="animation-frame three" variants={frameAnimationIvert}></motion.div>
         </motion.div>

         <motion.div variants={fade}>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <FaqSection />
            <TestimonialSection />
            <HireUsSection />
         </motion.div>
      </motion.div>
   )
}

export default HomePage;