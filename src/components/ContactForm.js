import emailjs from 'emailjs-com';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ContactForm = () => {

   const [nameErr, setNameErr] = useState(null);
   const [emailErr, setEmailErr] = useState(null);
   const [mobileErr, setMobileErr] = useState(null);
   const [messageErr, setMessageErr] = useState(null);
   const sendEmail = (e) => {
      e.preventDefault();

      var { flag1, flag2, flag3, flag4 } = 0;
      const stringCheck = /^[a-zA-Z\s]*$/;
      const contactCheck = /^[789][0-9]{9}]*$/;
      const mailCheck = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      // name validation
      const tempname = e.target.name.value;
      if (!stringCheck.test(tempname) || tempname === "") { //
         setNameErr("Invalid Name");
         flag1 = 1;
      } else {
         setNameErr(null);
         flag1 = 0;
      }

      // contact validation
      const tempcontact = e.target.mobile.value;
      if (!contactCheck.test(tempcontact) || tempcontact === "") { //
         setMobileErr("Invalid Contact Number");
         flag2 = 1;
      } else {
         setMobileErr(null);
         flag2 = 0;
      }

      // email validation
      const tempemail = e.target.email.value;
      if (!mailCheck.test(tempemail) || tempemail === "") { //
         setEmailErr("Invalid Email Address");
         flag3 = 1;
      } else {
         setEmailErr(null);
         flag3 = 0;
      }

      // message validation
      const tempmsg = e.target.message.value;
      if (tempmsg === "") { //
         setMessageErr("Invalid Email Address");
         flag4 = 1;
      } else {
         setMessageErr(null);
         flag4 = 0;
      }

      if (flag1 === 0 && flag2 === 0 && flag3 === 0 && flag4 === 0) {
         emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, e.target, process.env.REACT_APP_PUBLIC_KEY)
            .then((result) => {
               console.log(result.text);
            }, (error) => {
               console.log(error.text);
            });

         toast.success('Hurray!, We got your message. Our team will soon contact you.', {
            position: "bottom-right",
            style: {
               border: '1px solid #713200',
               padding: '16px',
               backgroundColor: '#FFD600',
            },

         })
         e.target.reset();
      }
   }

   return (
      <form className="contact-form" onSubmit={sendEmail}>
         <div className="row">
            <div className="form-group">
               <input type="text" className="form-control" name="name" placeholder="Your Name" />
               <span className="error">{nameErr != null ? nameErr : ""}</span>
            </div>
            <div className="form-group">
               <input type="text" className="form-control" name="mobile" placeholder="Your Contact Number" />
               <span className="error">{mobileErr != null ? mobileErr : ""}</span>
            </div>
         </div>
         <div className="form-group">
            <input type="text" className="form-control" name="email" placeholder="Your Email" />
            <span className="error">{emailErr != null ? emailErr : ""}</span>
         </div>
         <div className="form-group">
            <textarea className="form-control" name="message" placeholder="What's your query" ></textarea>
            <span className="error">{messageErr != null ? emailErr : ""}</span>
         </div>

         <button className="normal-btn primary">Send an Enquiry</button>
         <div>
            <Toaster
               position="bottom-right"
               reverseOrder={false}
            />
         </div>
      </form>
   )
}

export default ContactForm;