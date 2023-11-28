export const navbarCTAScroll = () => {
   const body = document.body;
   let previousScroll = 0;
   let currentScroll;

   window.addEventListener("scroll", () => {

      currentScroll = window.pageYOffset;

      if (currentScroll > 1000) {
         body.classList.add("navbar-cta-show");
      }

      previousScroll = currentScroll
   })
}