import { useEffect, useState } from "react";

export default function useMouseInside() {
    const [isMouseInside, setIsMouseInside] = useState(true);

    useEffect(() => {
        const handleMouseLeave = () => {
           setIsMouseInside(false);
        };
  
        const handleMouseEnter = () => {
           setIsMouseInside(true);
        };
  
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);
  
        return () => {
           document.removeEventListener("mouseleave", handleMouseLeave);
           document.removeEventListener("mouseenter", handleMouseEnter);
        };
     }, []);

   return isMouseInside;
}
