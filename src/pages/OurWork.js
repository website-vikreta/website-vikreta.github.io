// importing data
import { filterList, workData } from "../json/ourWorkData";
import DetailedWork from "./DetailedWork";
// Importing Bootstrap Icon
import "bootstrap-icons/font/bootstrap-icons.css";
// importing packages
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageAnimation, smoothFade, frameParentIvert, frameAnimationIvert } from "../utility/animation";


const OurWork = () => {

   // Filter List
   const [items, setItems] = useState(workData);

   // filter item list
   const filterItem = (categItem) => {
      const updatedItems = workData.filter((curElem) => {
         return curElem.category === categItem;
      });

      setItems(updatedItems);
   }

   // Scroll to top
   useEffect(() => {
      window.scrollTo(0, 0)
      document.title = "Our Work"
   }, [])


   return (
      <motion.div exit="exit" variants={pageAnimation} initial="hidden" animate="show">

         <motion.div variants={frameParentIvert}>
            <motion.div className="animation-frame one" variants={frameAnimationIvert}></motion.div>
            <motion.div className="animation-frame two" variants={frameAnimationIvert}></motion.div>
            <motion.div className="animation-frame three" variants={frameAnimationIvert}></motion.div>
         </motion.div>

         <motion.section className="our-work" variants={smoothFade}>
            <div className="container">
               <div className="heading">
                  <h2>Glimpse of Our Past Projects</h2>
                  <div className="line"></div>
               </div>
               <div className="filter-container">
                  <button onClick={() => setItems(workData)}>All</button>
                  <button onClick={() => filterItem('Web Design')}>Web Design</button>
                  <button onClick={() => filterItem('Web Development')}>Web Development</button>
                  <button onClick={() => filterItem('Landing Pages')}>Landing Pages</button>
                  <button onClick={() => filterItem('Portfolio')}>Portfolio</button>
                  <button onClick={() => filterItem('Business')}>Business</button>
               </div>
               <div>
                  <div class="gallery-grid">
                     {
                        items.map((project) => {
                           return (
                              <div className="grid-item">
                                 <img src={project.thumbnail} alt={project.title} />
                                 <div className="content">
                                    <h3 className="project-heading">{project.title}</h3>
                                    <p className="project-para">{project.shortDescription}</p>
                                    <Link to={project.url} className="normal-btn primary">Learn More</Link>
                                 </div>
                              </div>
                           )
                        })
                     }
                  </div>
               </div>
            </div>
         </motion.section>
      </motion.div>
   )
}

export default OurWork;