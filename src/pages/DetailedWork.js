// imporing images temporary
import { workData } from "../json/ourWorkData";

import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import parse from 'html-react-parser';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import Modal from 'react-modal';
//import workData from "../json/ourWorkData";
import { pageAnimation, frameParentVert, frameAnimationVert, smoothFade } from "../utility/animation";

Modal.setAppElement('#root'); // Set the root element for accessibility

const DetailedWork = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();
  const url = history.location.pathname;
  const myWork = workData.find((x) => x.url === url);

  const customSlider = React.createRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  const gotoNext = () => {
    customSlider.current.slickNext();
  };

  const gotoPrev = () => {
    customSlider.current.slickPrev();
  };

  const openModal = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  return (
    <motion.div exit="exit" variants={pageAnimation} initial="hidden" animate="show">
      <motion.div initial="hidden" animate="show" variants={frameParentVert}>
        <motion.div className="animation-frame two" variants={frameAnimationVert}></motion.div>
        <motion.div className="animation-frame three" variants={frameAnimationVert}></motion.div>
      </motion.div>

      <motion.div className="detailed-work">
        <motion.div className="container" variants={smoothFade}>
          <div className="row">
            <Link to="/work" className="close mobile"><i className="bi bi-x-lg"></i></Link>
            <div className="details">
              <div className="titles">
                <div className="image">
                  <img src={myWork.logo} alt={myWork.title} />
                </div>
                <div className="pretext">
                  <h2 className="project-heading">{myWork.title}</h2>
                  <ul className="niche">
                    {myWork.niche.map((x, index) => <li key={index}>{x}</li>)}
                  </ul>
                </div>
              </div>

              <div className="slider-wrapper">
                <button className="prev slider-btn" id="test-prev" onClick={gotoPrev}>
                  <i className="bi bi-chevron-left"></i>
                </button>
                <Slider {...settings} className="work-slider" ref={customSlider}>
                  {myWork.gallery.map((img, index) => (
                    <div className="card" key={index}>
                      <div className="videobuttton">
                        {myWork.links2.map((link, linkIndex) => (
                          <button
                            key={linkIndex}
                            className="play-button"
                            onClick={() => openModal(link.value)}
                          >
                            
                          </button>
                        ))}
                      </div>
                      <img src={img} alt={`Gallery ${index}`} className="gallery-image" />
                    </div>
                  ))}
                </Slider>
                <button className="next slider-btn" id="test-next" onClick={gotoNext}>
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>

              <div className="button-group">
                {myWork.links.map((link, index) => (
                  <a key={index} href={link.value} target="_blank" className="awesome-link" rel="noreferrer">
                    Visit {link.key}
                  </a>
                ))}
              </div>

              <div className="description">
                {parse(myWork.description)}
              </div>
            </div>
            <div className="review">
              <Link to="/work" className="close"><i className="bi bi-x-lg"></i></Link>
              <div className="title">
                <h2>Client Review</h2>
                <ul>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
              </div>
              <p className="text">{myWork.clientReview}</p>
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

      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Video Player"
  className="video-modal"
  overlayClassName="video-modal-overlay"
>
  {currentVideo && (
    <ReactPlayer
      url={currentVideo}
      playing={isModalOpen}
      controls
      width="100%" // Ensure it fills the modal width
      height="100%" // Ensure it fills the modal height
    />
  )}
  <button className="close-modal-btn" onClick={closeModal}> <i class="bi bi-x-lg"></i>  </button>
</Modal>

    </motion.div>
  );
};

export default DetailedWork;
