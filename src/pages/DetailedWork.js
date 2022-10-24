// imporing images temporary
import { workData } from "../json/ourWorkData";

// importing packages
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageAnimation, frameParentVert, frameAnimationVert, smoothFade } from "../utility/animation";

const DetailedWork = () => {

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   const history = useHistory();
   const url = history.location.pathname;
   const [ourWork, setOurWork] = useState(workData);

   const myWork = ourWork.filter((x) => x.url === url)[0];

   const customSlider = React.createRef();
   const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
   };
   // functions
   const gotoNext = () => {
      customSlider.current.slickNext()
   }
   const gotoPrev = () => {
      customSlider.current.slickPrev()
   }

   return (

      <motion.div exit="exit" variants={pageAnimation} initial="hidden" animate="show">

         <motion.div initial="hidden" animate="show" variants={frameParentVert}>
            {/* <motion.div className="animation-frame one" variants={frameAnimationVert}></motion.div> */}
            <motion.div className="animation-frame two" variants={frameAnimationVert}></motion.div>
            <motion.div className="animation-frame three" variants={frameAnimationVert}></motion.div>
         </motion.div>

         <motion.div className="detailed-work">
            <motion.div className="container" variants={smoothFade}>
               <div className="row">
                  <Link to="/work" className="close mobile"><i class="bi bi-x-lg"></i></Link>
                  <div className="details">

                     {/* Pretext of the project */}
                     <div className="titles">
                        <div className="image">
                           <img src={myWork.logo} alt={myWork.title} />
                        </div>
                        <div className="pretext">
                           <h2 className="project-heading">{myWork.title}</h2>
                           <ul className="niche">
                              {
                                 (myWork.niche.map(x => (
                                    <li>{x}</li>
                                 )))
                              }
                           </ul>
                        </div>
                     </div>

                     {/* slider */}
                     <div className="slider-wrapper">
                        <button className="prev slider-btn" id="test-prev" onClick={() => gotoPrev()}><i class="bi bi-chevron-left"></i></button>
                        <Slider {...settings} className="work-slider" ref={customSlider}>
                           {myWork.gallery.map(img =>
                              <div className="card">
                                 <img src={img} alt={img} className="gallery-image" />
                              </div>
                           )}
                        </Slider>
                        <button className="next slider-btn" id="test-next" onClick={() => gotoNext()}><i class="bi bi-chevron-right"></i></button>
                     </div>

                     {/* buttons */}
                     <div className="button-group">
                        {
                           (myWork.links.map(link => (
                              <a href={link.value} target="_blank" className="awesome-link">Visit {link.key}</a>
                           )))
                        }
                     </div>

                     {/* project description */}
                     <div className="description">
                        {parse(myWork.description)}
                     </div>
                  </div>
                  <div className="review">
                     <Link to="/work" className="close"><i class="bi bi-x-lg"></i></Link>
                     <div className="title">
                        <h2>Client Review</h2>
                        <ul>
                           <li><i class="bi bi-star-fill"></i></li>
                           <li><i class="bi bi-star-fill"></i></li>
                           <li><i class="bi bi-star-fill"></i></li>
                           <li><i class="bi bi-star-fill"></i></li>
                           <li><i class="bi bi-star-fill"></i></li>
                        </ul>
                     </div>
                     <p className="text">
                        {myWork.clientReview}
                     </p>
                     <div className="client">
                        <h4>{myWork.clientName}</h4>
                        <p>- {myWork.designation}</p>
                     </div>
                     <div className="button-group">
                        <Link to="/contact" className="normal-btn primary">Book a Call</Link>
                        <Link to="/contact" className="normal-btn secondary">Get a Free Quote</Link>
                     </div>
                  </div>
               </div>
            </motion.div>
         </motion.div>
      </motion.div>
   )
}

export default DetailedWork;