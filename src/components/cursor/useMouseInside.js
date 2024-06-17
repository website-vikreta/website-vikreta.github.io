import { useEffect, useState } from "react";

export default function useMouseInside() {
   const [isMouseInside, setIsMouseInside] = useState(true);

   useEffect(() => {
      const handleMouseOut = (event) => {
         // Check if the mouse is leaving the window
         if (!event.relatedTarget || event.relatedTarget.nodeName === "HTML") {
            setIsMouseInside(false);
         }
      };

      const handleMouseOver = (event) => {
         // Check if the mouse is entering the window
         if (event.relatedTarget === null) {
            setIsMouseInside(true);
         }
      };

      window.addEventListener("mouseout", handleMouseOut);
      window.addEventListener("mouseover", handleMouseOver);

      return () => {
         window.removeEventListener("mouseout", handleMouseOut);
         window.removeEventListener("mouseover", handleMouseOver);
      };
   }, []);

   return isMouseInside;
}
