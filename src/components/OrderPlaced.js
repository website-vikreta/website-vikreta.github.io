import React from 'react';
import { useEffect } from 'react';

const ThankYou = ({ orderId, setIsSubmitted }) => {
   useEffect(()=>{
      window.scrollTo({top: 0, left: 0, behavior:'smooth'})
   })
   return (
      <div className="p-thanks">
         <div className="icon-wrapper">
            <div className="check-icon">
               <svg width="48" height="48" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="#FFEB3B" />
                  <path fill="#222" d="M10 15.172l-3.536-3.536 1.414-1.414L10 12.343l4.95-4.95 1.414 1.414z" />
               </svg>
            </div>
         </div>
         <h2>Thank you for your order!</h2>
         <div className="give_margin">
            <p className='main'>We have sent order details to your email.</p>
            <p className='sub'>Order ID : {orderId}</p>
         </div>
         
         
         <button className="normal-btn secondary" onClick={(e) => setIsSubmitted(false)}>
            <i className="bi bi-arrow-left"></i>
            <p className='btn-txt'>Back to calculator</p>
         </button>
      </div>
   );
};

export default ThankYou;
