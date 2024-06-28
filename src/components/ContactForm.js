import emailjs from 'emailjs-com';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ContactForm = () => {
   const [nameErr, setNameErr] = useState(null);
   const [emailErr, setEmailErr] = useState(null);
   const [mobileErr, setMobileErr] = useState(null);
   const [mobile, setMobile] = useState('');
   const [service, setService] = useState('');
   const [budget, setBudget] = useState('');
   const [serviceErr, setServiceErr] = useState(null);
   const [budgetErr, setBudgetErr] = useState(null);

   const sendEmail = (e) => {
      e.preventDefault();

      let flag1 = 0, flag2 = 0, flag3 = 0, flag4 = 0, flag5 = 0, flag6 = 0;
      const stringCheck = /^[a-zA-Z\s]*$/;
      const mailCheck = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      // name validation
      const tempname = e.target.name.value;
      if (!stringCheck.test(tempname) || tempname === "") {
         setNameErr("Invalid Name");
         flag1 = 1;
      } else {
         setNameErr(null);
         flag1 = 0;
      }

      // contact validation
      if (mobile === "" || mobile.length < 10) {
         setMobileErr("Invalid Contact Number");
         flag2 = 1;
      } else {
         setMobileErr(null);
         flag2 = 0;
      }

      // email validation
      const tempemail = e.target.email.value;
      if (!mailCheck.test(tempemail) || tempemail === "") {
         setEmailErr("Invalid Email Address");
         flag3 = 1;
      } else {
         setEmailErr(null);
         flag3 = 0;
      }

      // service validation
      if (service === "") {
         setServiceErr("Please select a service");
         flag4 = 1;
      } else {
         setServiceErr(null);
         flag4 = 0;
      }

      // budget validation
      if (budget === "") {
         setBudgetErr("Please enter your budget");
         flag5 = 1;
      } else {
         setBudgetErr(null);
         flag5 = 0;
      }

      if (flag1 === 0 && flag2 === 0 && flag3 === 0 && flag4 === 0 && flag5 === 0 && flag6 === 0) {
         // Update the hidden mobile input field value
         e.target.mobile.value = mobile;
         e.target.service.value = service;
         e.target.budget.value = budget;

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
         });
         e.target.reset();
         setMobile(''); // Reset mobile state
         setService(''); // Reset service state
         setBudget(''); // Reset budget state
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
               <PhoneInput
                  country={'in'}
                  value={mobile}
                  onChange={(phone) => setMobile(phone)}
                  inputClass="form-control"
                  placeholder="Your Contact Number"
               />
               <span className="error">{mobileErr != null ? mobileErr : ""}</span>
               {/* Hidden input field for mobile number */}
               <input type="hidden" name="mobile" value={mobile} />
            </div>
         </div>
         <div className="form-group">
            <input type="text" className="form-control" name="email" placeholder="Your Email" />
            <span className="error">{emailErr != null ? emailErr : ""}</span>
         </div>
         <div className="form-group">
            <select className="form-control" name="service" value={service} onChange={(e) => setService(e.target.value)}>
               <option value="">Select Service</option>
               <option value="Web Design">Web Design</option>
               <option value="Web Development">Web Development</option>
               <option value="MVPs">MVPs</option>
               <option value="Mobile Apps">Mobile Apps</option>
               <option value="E-commerce">E-commerce</option>
               <option value="UI/UX & Prototyping">UI/UX & Prototyping</option>
               <option value="Web Apps">Web Apps</option>
            </select>
            <span className="error">{serviceErr != null ? serviceErr : ""}</span>
         </div>
         <div className="form-group">
            <input type="text" className="form-control" name="budget" placeholder="Your Budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
            <span className="error">{budgetErr != null ? budgetErr : ""}</span>
         </div>
         <div className="form-group">
            <textarea className="form-control" name="message" placeholder="What's your query"></textarea>
         </div>
         <button className="normal-btn primary">Send an Enquiry</button>
         <div>
            <Toaster position="bottom-right" reverseOrder={false} />
         </div>
      </form>
   )
}

export default ContactForm;
