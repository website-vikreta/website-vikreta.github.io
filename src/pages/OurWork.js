// importing data
import { workData } from "../json/ourWorkData";
// Importing Bootstrap Icon
import "bootstrap-icons/font/bootstrap-icons.css";
// importing packages
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageAnimation, smoothFade, frameParentIvert, frameAnimationIvert } from "../utility/animation";


const OurWork = () => {
   const filters = [
      'All Work',
      'Web Design',
      'Web Development',
      'MVPs',
      'Mobile Apps',
      'E-commerce',
      'UI/UX & Prototyping',
      'Web Apps',
   ]

   // Filter List
   const [items, setItems] = useState(workData)
   const [activeBtn, setActiveBtn] = useState(filters[0])

   // filter item list
   const filterItem = (selectedCategory) => {
      const updatedItems = workData.filter((workDataCard) => {
         if (selectedCategory === filters[0]) {
            return workData
         }
         return workDataCard.category.includes(selectedCategory)
      });
      setItems(updatedItems);
      setActiveBtn(selectedCategory)
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
                  {/* <button onClick={() => setItems(workData)}>All Work</button> */}
                  {
                     filters.map((filter, index) => {
                        return (
                           <button
                              key={index}
                              className={activeBtn === filter ? "active-button" : ""}
                              onClick={() => filterItem(filter)}>
                              {filter}
                           </button>
                        )
                     })
                  }
               </div>
               <div>
                  <div className="gallery-grid">
                     {
                        items.map((project) => {
                           return (
                              <div className="grid-item" key={project.id}>
                                 <img src={project.thumbnail} alt={project.title} />
                                 <div className="content">
                                    <ul className="category">
                                       {
                                          project.category.map((el, index) => <li key={index}> {el} </li>)
                                       }
                                    </ul>
                                    <h3 className="project-heading">{project.title}</h3>
                                    <p className="project-para">{project.shortDescription}</p>
                                    <Link to={project.url} className="normal-btn primary">
                                       <span>Read More</span>
                                       <i className="bi bi-arrow-right"></i>
                                    </Link>
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