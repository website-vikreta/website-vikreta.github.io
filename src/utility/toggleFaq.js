import { useState } from "react";
import { motion } from "framer-motion";

const Toggle = ({ children, title, defaultToggle = false }) => {
   const [toggle, setToggle] = useState(defaultToggle);
   return (
      <motion.div className="card">
         <motion.div layout className="question" onClick={() => setToggle(!toggle)}>
            <h3>{title}</h3>
            {toggle ? <i layout class="bi bi-chevron-double-up"></i> : <i layout class="bi bi-chevron-double-down"></i>}
         </motion.div>
         <motion.div layout className="answer-wrapper">{toggle ? children : ""}</motion.div>
      </motion.div>
   )
}

export default Toggle;