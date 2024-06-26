import useMousePosition from "./useMousePosition";
import useMouseInside from "./useMouseInside";

const DotRing = () => {
   const { x, y } = useMousePosition();
   const isMouseInside = useMouseInside();

   return (
      <>
         {isMouseInside && (
            <div className="mouse" style={{ left: `${x}px`, top: `${y}px` }}>
               <svg viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d)">
                     <path d="M35.8783 25.2623L15.5829 4.80338C14.9434 4.15873 13.845 4.63136 13.8735 5.53895L14.7711 34.2005C14.8029 35.2178 16.1568 35.5428 16.647 34.6508L22.1337 24.6665C22.3502 24.2727 22.8028 24.0716 23.2401 24.1749L34.9383 26.9398C35.9167 27.171 36.5863 25.9761 35.8783 25.2623Z" fill="#F9D000" />
                  </g>
                  <path d="M19 39.5L24.5 29.5L35.5 32" stroke="#FFD600" stroke-width="2" />
                  <defs>
                     <filter id="filter0_d" x="0.873779" y="0.205414" width="40.8471" height="40.7944" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dx="-1" dy="-2" />
                        <feGaussianBlur stdDeviation="1" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.133333 0 0 0 0 0.133333 0 0 0 0 0.133333 0 0 0 0.2 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                     </filter>
                  </defs>
               </svg>
            </div>
         )}
      </>
   );
};

export default DotRing;
