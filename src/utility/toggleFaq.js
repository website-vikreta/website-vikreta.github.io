import { motion } from "framer-motion";

const Toggle = ({ children, title, isOpen, onToggle }) => {
   return (
      <motion.div className="card">
         <motion.div layout className="question" onClick={onToggle}>
            <h3>{title}</h3>
            {isOpen ? <i layout className="bi bi-chevron-double-up"></i> : <i layout className="bi bi-chevron-double-down"></i>}
         </motion.div>
         <motion.div layout className="answer-wrapper">{isOpen ? children : ""}</motion.div>
      </motion.div>
   );
};

export default Toggle;
