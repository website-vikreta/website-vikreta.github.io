// slick slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import HeroImage from "../assets/Hero Slider/Slide 1.jpg";
import HeroImage2 from "../assets/Hero Slider/Slide 2.jpg";
import HeroImage3 from "../assets/Hero Slider/Slide 3.png";

import { Link } from "react-router-dom";

const HeroSection = () => {
   // slider settings
   const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'ease-out',
      autoplay: true,
      autoplaySpeed: 4000,
   };
   return (
      <section className="hero">
         <div className="container">
            {/* left section */}
            <div className="content">
               <div className="title-wrapper">
                  {/* <p className="sub-title">Celebrating 1 Year in the industry</p> */}
                  <h1 className="title">
                     Your <span>creative</span> web development partner.
                  </h1>
               </div>
               <p className="para">
                  Website Vikreta is an answer to all your web development needs. We provide services to whoever need, from small start-ups to large corporation. Our mission is to fulfil your needs and give you the best service.
               </p>
               <ul className="features">
                  <li ><i class="bi bi-check2-all"></i> Innovate</li>
                  <li><i class="bi bi-check2-all"></i> Inspire</li>
                  <li><i class="bi bi-check2-all"></i> Impact</li>
               </ul>

               <div className="button-group" >
                  <Link to="/contact" className="awesome-link">Get a Quote</Link>
                  <a href="/#aboutUs" className="awesome-link">Learn More</a>
               </div>
            </div>
            {/* right section */}
            <div className="hero-image">
               <div className="slider-wrapper">
                  <Slider {...settings} className="hero-slider">
                     <div className="image">
                        <img src={HeroImage} alt="Hero One" />
                     </div>
                     <div className="image">
                        <img src={HeroImage2} alt="Hero One" />
                     </div>
                     <div className="image">
                        <img src={HeroImage3} alt="Hero Three" />
                     </div>
                  </Slider>
               </div>
            </div>
         </div>
      </section>
   )
}

export default HeroSection;