import React from 'react'


export default function GoTop() {

    const scrollUp = () =>{
        window.scrollTo({top: 0, left: 0, behavior:'smooth'})
    }


    // When the user scrolls down 200px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                
        document.getElementById("gototopbtn").style.display = "block";        
        document.getElementById("gototopbtn").style.animation = "fadeInUp 1s ease backwards";
      } else {        
        
        setTimeout(() => {
          document.getElementById("gototopbtn").style.display = "none";
        }, 500);        

        document.getElementById("gototopbtn").style.animation = "fadeInDown 2s ease backwards";
      }
    }

    return (
    <div>
      <button  id='gototopbtn' onClick={scrollUp} className="gototop"> <i class="bi bi-chevron-bar-up"></i> </button>
    </div>

    
  )
}
