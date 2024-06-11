import { useState } from "react";
import Toggle from "../utility/toggleFaq";
import { AnimateSharedLayout } from "framer-motion";
import faqData from "../json/faqData";
import parse from 'html-react-parser';

const FaqSection = () => {
   const [openIndex, setOpenIndex] = useState(0);
   const faqs = faqData();

   const handleToggle = (index) => {
      setOpenIndex(openIndex === index ? null : index);
   };

   return (
      <section className="faq">
         <div className="heading">
            <h2>Frequently Asked Questions</h2>
            <div className="line"></div>
         </div>

         <div className="faq-wrapper">
            <AnimateSharedLayout>
               {faqs.map((faq, index) => (
                  <Toggle
                     key={index}
                     title={faq.title}
                     isOpen={openIndex === index}
                     onToggle={() => handleToggle(index)}
                  >
                     <div className="answer">
                        {parse(faq.answer)}
                     </div>
                  </Toggle>
               ))}
            </AnimateSharedLayout>
         </div>
      </section>
   );
};

export default FaqSection;
