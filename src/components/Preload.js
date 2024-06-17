import LogoIcon from "../assets/LogoIcon.svg";
import React from 'react';


const Preload = () => {
  return (
    <div className="preload">
      <div className="spinner"> <img src={LogoIcon}
        alt="no img"
      />
      </div>
      
    </div>
  );
}

export default Preload;
