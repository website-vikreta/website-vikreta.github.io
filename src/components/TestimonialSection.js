// import from react
import testimonialData from "../json/testimonialData";

import Quote from "../assets/Quote.svg"

// slick slider
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const TestimonialSection = () => {

   const customeSlider = React.createRef();

   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      responsive: [
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         },
      ]
   };
   // grabbing testimonials from json
   const testimonials = testimonialData();

   // functions
   const gotoNext = () => {
      customeSlider.current.slickNext()
   }

   const gotoPrev = () => {
      customeSlider.current.slickPrev()
   }

   return (
      <section className="testimonials" >
         <div className="container">
            <div className="heading">
               <h2>What Our Clients Think About Us</h2>
               <div className="line"></div>
            </div>

            <div className="testimonial-slider-wrapper">
               {/* prev button */}
               <button className="prev slider-btn" id="test-prev" onClick={() => gotoPrev()}><i class="bi bi-chevron-left"></i></button>
               {/* slider */}
               <Slider {...settings} className="testimonial-slider" ref={customeSlider}>
                  {testimonials.map(test =>
                     <div className="card">
                        <img src={Quote} alt="quote svg" className="quote" />

                        <p className="review">{test.review}</p>

                        <div className="group">
                           <div className="user">
                              {test.image !== "" &&
                                 <img src={test.image} alt="" />
                              }
                              <div className="text">
                                 <p className="name">{test.userName}</p>
                                 <p className="des">{test.userDes}</p>
                              </div>
                           </div>
                           <div className="ratings">
                              <i class="bi bi-star-fill"></i>
                              <i class="bi bi-star-fill"></i>
                              <i class="bi bi-star-fill"></i>
                              <i class="bi bi-star-fill"></i>
                              <i class="bi bi-star-fill"></i>
                           </div>
                        </div>
                     </div>
                  )}
               </Slider>

               {/* next button */}
               <button className="next slider-btn" id="test-next" onClick={() => gotoNext()}><i class="bi bi-chevron-right"></i></button>
            </div>
         </div>
      </section >
   )
}

export default TestimonialSection;