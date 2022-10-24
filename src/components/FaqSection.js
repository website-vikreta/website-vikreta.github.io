import Toggle from "../utility/toggleFaq";
import { AnimateSharedLayout } from "framer-motion";
import faqData from "../json/faqData";
import parse from 'html-react-parser'

const FaqSection = () => {
   const faqs = faqData();
   return (
      <section className="faq">
         <div className="heading">
            <h2>Frequently Asked Questions</h2>
            <div className="line"></div>
         </div>

         <div className="faq-wrapper">
            <AnimateSharedLayout>
               {faqs.map(faq =>
                  <Toggle title={faq.title} defaultToggle={faq.toggle ? faq.toggle : false}>
                     <div className="answer">
                        {parse(faq.answer)}
                     </div>
                  </Toggle>
               )}
            </AnimateSharedLayout>
         </div>
      </section>
   )
}

export default FaqSection