export const navbarCTAScroll = () => {
   const body = document.body;
   let currentScroll;

   window.addEventListener("scroll", () => {

      currentScroll = window.pageYOffset;

      if (currentScroll > 1000) {
         body.classList.add("navbar-cta-show");
      }

   })
}