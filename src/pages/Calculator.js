import { motion } from "framer-motion";
import {
   pageAnimation,
   smoothFade,
   frameParentIvert,
   frameAnimationIvert,
} from "../utility/animation";
import { useEffect, useState } from "react";
// import CalForm from "../components/CalForm";
import calData from "../json/calData";
import currancy from "../json/currancy";
import PhoneInput from "react-phone-input-2";
// import customSelect from "../components/customSelect"
import CustomDropdown from "../components/CustomDropdown";
// import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "emailjs-com";
import ReactFlagsSelect from "react-flags-select";
import ThankYou from "../components/OrderPlaced";

const Calculator = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = "Calculator | UI-UX";
   }, []);

   //for order

   const [nameErr, setNameErr] = useState(null);
   const [emailErr, setEmailErr] = useState(null);
   const [mobileErr, setMobileErr] = useState(null);
   const [mobile, setMobile] = useState("");
   const [countryCode, setCountryCode] = useState("");
   const [orderId, setOrderId] = useState(1);

   useEffect(() => {
      // Fetch user's country code
      axios
         .get("https://ipapi.co/json/")
         .then((response) => {
            setCountryCode(response.data.country_code.toLowerCase());
         })
         .catch((error) => {
            console.error("Error fetching country code:", error);
         });
   }, []);

   const questions = calData();
   const curr = currancy();

   const [selectedCurrency, setSelectedCurrency] = useState("USD");
   const first = curr.find((item) => item.name === "USD")?.flag;
   // console.log(first);
   const [selectedFlag, setSelectedFlag] = useState(first);
   const [factor, setFactor] = useState(1);
   const [symbol, setSymbol] = useState("$");
   // const handleChange = (e) => setSelectedCurrency(e.target.value);

   const handleChange = (e) => {
      const prev = curr.find((item) => item.name === selectedCurrency);
      const back1 = prev.back;
      setSelectedCurrency(e.target.value);
      console.log(selectedCurrency);
      const next = curr.find((item) => item.name === e.target.value);
      const front1 = next.front;
      setSymbol(next.symbol);
      setSelectedFlag(next.flag);
      const mul = front1 * back1;
      console.log(mul);
      setFactor(front1);
      // console.log(factor)
   };

   const [totalCost, setTotalCost] = useState(0);
   const [totalTime, setTotalTime] = useState(0);
   const [selected, setSelected] = useState("");
   const [isSubmitted, setIsSubmitted] = useState(false);

   var data = [
      {
         title: `Fast Train - Under ${totalTime - 4} Weeks`,
         name: "Fast Train",
         cost: 100,
         additionalTime: 0,
      },
      {
         title: `Slow Train - Up to ${totalTime} Weeks`,
         name: "Slow Train",
         cost: 0,
         additionalTime: 0,
      },
   ];

   if (totalTime - 4 <= 4) {
      data = [
         {
            title: `Timeline - Up to ${totalTime} Weeks`,
            name: "Slow Train",
            cost: 0,
            additionalTime: 0,
         },
      ];
   }

   const [timeline, setTimeline] = useState("");

   const [isClicked, setIsClicked] = useState(false);
   const [formState, setFormState] = useState({});
   const [visibleQuestions, setVisibleQuestions] = useState([
      "type",
      "typeOfWebsite",
   ]);

   const handleTypeChange = (event = null, name = "", value = "") => {
      setIsClicked(false);
      if (name === "timeline") {
         setTimeline(value);
         return;
      }
      setTimeline("");
      var tempName = name;
      var tempValue = value;

      if (event) {
         tempName = event.target.name;
         tempValue = event.target.value;
      } else {
         tempName = name;
         tempValue = value;
      }

      const currentQuestion = questions.find((item) => item.name === tempName);
      const cost =
         currentQuestion.data.find((item) => item.name === tempValue)?.cost || 0;
      const time =
         currentQuestion.data.find((item) => item.name === tempValue)
            ?.additionalTime || 0;
      const que = questions.find((item) => item.name === tempName)?.question;
      const title = currentQuestion.data.find(
         (item) => item.name === tempValue
      )?.title;

      setFormState((prevState) => {
         const newState = {
            ...prevState,
            [tempName]: [title, cost, time, que],
         };

         const nextQuestionName = currentQuestion.data.find(
            (item) => item.name === tempValue
         )?.visibleAfterLoad;

         if (nextQuestionName) {
            const newVisibleQuestions = visibleQuestions.slice(
               0,
               visibleQuestions.indexOf(tempName) + 1
            );
            setVisibleQuestions([...newVisibleQuestions, nextQuestionName]);

            const updatedFormState = { ...newState };
            let flag = false;
            Object.keys(updatedFormState).forEach((key) => {
               if (newVisibleQuestions.indexOf(key) === -1) {
                  flag = true;
                  delete updatedFormState[key];
               }
            });
            if (flag) {
               setFormState(updatedFormState);
            }
         } else {
            const newVisibleQuestions = visibleQuestions.slice(
               0,
               visibleQuestions.indexOf(tempName) + 1
            );
            setVisibleQuestions(newVisibleQuestions);

            const updatedFormState = { ...newState };
            Object.keys(updatedFormState).forEach((key) => {
               if (visibleQuestions.indexOf(key) === -1) {
                  delete updatedFormState[key];
               }
            });
            setFormState(updatedFormState);
         }

         return newState;
      });
   };

   const calculateTotal = () => {
      let totalCost = 0;
      let totalTime = 0;

      Object.keys(formState).forEach((key) => {
         totalCost += formState[key][1];
         totalTime += formState[key][2];
      });

      setTotalCost(totalCost);
      setTotalTime(totalTime);
   };

   useEffect(() => {
      calculateTotal();
   }, [formState]);

   const renderQuestion = (question) => {
      const { name, questionType, data, question: questionText } = question;

      if (questionType === "dropdown") {
         return (
            <div key={name} className="type-wrapper">
               {name === "typeOfWebsite" ? (
                  <div className="typeDiv">
                     <label className="queLabel">
                        {questionText} <span>*</span>
                     </label>
                     <div className="curr-div">
                        <p>Select Currency</p>
                        <div className="curr-option ">
                           <div className="curr-name">
                              {/* <p className=""></p> */}
                              <p className="">
                                 <span dangerouslySetInnerHTML={{ __html: selectedFlag }}></span>
                                 <span style={{ color: "#FFD600" }}>{symbol}</span>
                              </p>
                           </div>
                           <div className="">
                              <select
                                 value={selectedCurrency}
                                 name=""
                                 onChange={handleChange}
                                 className="black-background"
                              >
                                 <option value="USD">USD </option>
                                 <option value="INR">INR</option>
                                 <option value="EUR">EUR</option>
                              </select>
                           </div>
                        </div>
                     </div>
                  </div>
               ) : (
                  <label className="queLabel">
                     {questionText}
                     <span> *</span>
                  </label>
               )}

               <CustomDropdown
                  data={data}
                  handleTypeChange={handleTypeChange}
                  name={name}
                  factor={factor}
                  symbol={symbol}
                  selectedCurrency={selectedCurrency}
                  formatNumberToIndianCurrency={formatNumberToIndianCurrency}
               />
            </div>
         );
      }

      if (questionType === "radio") {
         return (
            <div key={name} className="type-wrapper">
               <label className="queLabel">
                  {questionText}
                  <span> *</span>
               </label>
               {name === "type" ? (
                  <>
                     <div className="r-type">
                        {data.map((option) => (
                           <label
                              className="r-option"
                              onChange={(e) => handleTypeChange(e, "", "")}
                              htmlFor={option.name}
                           >
                              <input
                                 type="radio"
                                 name={name}
                                 value={option.name}
                                 id={option.name}
                              />
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="16"
                                 height="16"
                                 viewBox="0 0 16 16"
                                 fill="none"
                                 className="radio-symbol"
                              >
                                 <circle
                                    cx="8"
                                    cy="8"
                                    r="7.5"
                                    stroke="#FFD600"
                                    className="outer-circle"
                                 />
                                 <circle
                                    cx="8"
                                    cy="8"
                                    r="4"
                                    fill="#FFD600"
                                    className="inner-circle"
                                 />
                              </svg>
                              <div className="optionLabel">
                                 {option.title}
                              </div>
                           </label>
                        ))}
                        <Link to="/contact" className="r-option">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              className="radio-symbol"
                           >
                              <circle
                                 cx="8"
                                 cy="8"
                                 r="7.5"
                                 stroke="#FFD600"
                                 className="outer-circle"
                              />
                              <circle
                                 cx="8"
                                 cy="8"
                                 r="4"
                                 fill="#FFD600"
                                 className="inner-circle"
                              />
                           </svg>
                           <label className="optionLabel">Web App</label>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                           >
                              <g clip-path="url(#clip0_2524_1326)">
                                 <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.477 2.625C6.477 2.52554 6.43749 2.43016 6.36717 2.35984C6.29684 2.28951 6.20146 2.25 6.102 2.25H1.125C0.826631 2.25 0.540483 2.36853 0.329505 2.5795C0.118526 2.79048 0 3.07663 0 3.375L0 10.875C0 11.1734 0.118526 11.4595 0.329505 11.6705C0.540483 11.8815 0.826631 12 1.125 12H8.625C8.92337 12 9.20952 11.8815 9.4205 11.6705C9.63147 11.4595 9.75 11.1734 9.75 10.875V5.898C9.75 5.79854 9.71049 5.70316 9.64017 5.63283C9.56984 5.56251 9.47446 5.523 9.375 5.523C9.27554 5.523 9.18016 5.56251 9.10983 5.63283C9.03951 5.70316 9 5.79854 9 5.898V10.875C9 10.9745 8.96049 11.0698 8.89017 11.1402C8.81984 11.2105 8.72446 11.25 8.625 11.25H1.125C1.02554 11.25 0.930161 11.2105 0.859835 11.1402C0.789509 11.0698 0.75 10.9745 0.75 10.875V3.375C0.75 3.27554 0.789509 3.18016 0.859835 3.10984C0.930161 3.03951 1.02554 3 1.125 3H6.102C6.20146 3 6.29684 2.96049 6.36717 2.89016C6.43749 2.81984 6.477 2.72446 6.477 2.625Z"
                                    fill="white"
                                 />
                                 <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12.0005 0.375C12.0005 0.275544 11.961 0.180161 11.8906 0.109835C11.8203 0.0395088 11.7249 0 11.6255 0L7.87547 0C7.77602 0 7.68063 0.0395088 7.61031 0.109835C7.53998 0.180161 7.50047 0.275544 7.50047 0.375C7.50047 0.474456 7.53998 0.569839 7.61031 0.640165C7.68063 0.710491 7.77602 0.75 7.87547 0.75H10.7202L4.60997 6.8595C4.57511 6.89437 4.54745 6.93576 4.52858 6.98131C4.50971 7.02687 4.5 7.07569 4.5 7.125C4.5 7.17431 4.50971 7.22313 4.52858 7.26869C4.54745 7.31424 4.57511 7.35563 4.60997 7.3905C4.64484 7.42537 4.68623 7.45302 4.73179 7.47189C4.77734 7.49076 4.82617 7.50047 4.87547 7.50047C4.92478 7.50047 4.97361 7.49076 5.01916 7.47189C5.06472 7.45302 5.10611 7.42537 5.14097 7.3905L11.2505 1.28025V4.125C11.2505 4.22446 11.29 4.31984 11.3603 4.39016C11.4306 4.46049 11.526 4.5 11.6255 4.5C11.7249 4.5 11.8203 4.46049 11.8906 4.39016C11.961 4.31984 12.0005 4.22446 12.0005 4.125V0.375Z"
                                    fill="white"
                                 />
                              </g>
                              <defs>
                                 <clipPath id="clip0_2524_1326">
                                    <rect width="12" height="12" fill="white" />
                                 </clipPath>
                              </defs>
                           </svg>
                        </Link>
                     </div>
                  </>
               ) : (
                  <>
                     <div className="extra-options">
                        {data.map((option) => (
                           <div className="extra-options">
                              <label
                                 key={option.name}
                                 className="form-option"
                                 onChange={(e) => handleTypeChange(e, "", "")}
                                 htmlFor={option.name}
                              >
                                 <input
                                    type="radio"
                                    name={name}
                                    value={option.name}
                                    id={option.name}
                                 />
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className="radio-symbol"
                                 >
                                    <circle
                                       cx="8"
                                       cy="8"
                                       r="7.5"
                                       stroke="#FFD600"
                                       className="outer-circle"
                                    />
                                    <circle
                                       cx="8"
                                       cy="8"
                                       r="4"
                                       fill="#FFD600"
                                       className="inner-circle"
                                    />
                                 </svg>
                                 <div className="optionLabel">
                                    {option.title}
                                 </div>
                                 {option.title === "Single Country" && (
                                    <>
                                       <div className="country-options">
                                          <ReactFlagsSelect
                                             selected={selected}
                                             onSelect={(code) => setSelected(code)}
                                             className="form-control s-select"
                                             placeholder="Select Country"
                                             showSecondaryOptionLabel={true}
                                             searchable
                                          />
                                       </div>
                                    </>
                                 )}
                                 <div className="option-cost">
                                    {option.cost === 0 && option.additionalTime === 0 ? (
                                       <>
                                          <p className="option-time">
                                             No addtional charges / time required
                                          </p>
                                       </>
                                    ) : (
                                       <>
                                          {/* <p className="option-cost-cost">+{symbol}{option.cost*factor}</p> */}
                                          {option.name === "yes" || option.name === "no" ? (
                                             <>
                                                <p className="strikethrough">
                                                   {" "}
                                                   {symbol}{" "}
                                                   {selectedCurrency === "INR"
                                                      ? formatNumberToIndianCurrency(
                                                         option.cost * factor
                                                      )
                                                      : (option.cost * factor).toLocaleString()}
                                                </p>
                                                <div className="option-rectangle"></div>
                                                <p className="option-time">
                                                   <span>additional</span>
                                                   <span className="strikethrough">
                                                      {" "}{option.additionalTime} week{" "}
                                                   </span>
                                                   <span className="duration">0 week</span>
                                                   <span>of time</span>
                                                </p>
                                             </>
                                          ) : (
                                             <>
                                                <p className="option-cost-cost">
                                                   {" "}
                                                   {symbol}{" "}
                                                   {selectedCurrency === "INR"
                                                      ? formatNumberToIndianCurrency(
                                                         option.cost * factor
                                                      )
                                                      : (option.cost * factor).toLocaleString()}
                                                </p>
                                                <div className="option-rectangle"></div>
                                                <p className="option-time">
                                                   additional{" "}
                                                   <span>{option.additionalTime} week</span> of
                                                   time
                                                </p>
                                             </>
                                          )}
                                       </>
                                    )}
                                 </div>
                              </label>
                           </div>
                        ))}
                     </div>
                  </>
               )}
            </div>
         );
      }
   };

   function formatNumberToIndianCurrency(number) {
      const x = number.toString().split(".");
      let lastThree = x[0].substring(x[0].length - 3);
      const otherNumbers = x[0].substring(0, x[0].length - 3);
      if (otherNumbers !== "") {
         lastThree = "," + lastThree;
      }
      const result =
         otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      return x.length > 1 ? result + "." + x[1] : result;
   }

   const sendEmail = (e) => {
      e.preventDefault();

      let flag1 = 0,
         flag2 = 0,
         flag3 = 0;
      const stringCheck = /^[a-zA-Z\s]*$/;
      const mailCheck = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      // Name validation
      const tempname = e.target.name.value;
      if (!stringCheck.test(tempname) || tempname === "") {
         setNameErr("Invalid Name");
         flag1 = 1;
      } else {
         setNameErr(null);
         flag1 = 0;
      }

      // Contact validation
      const phoneNumber = parsePhoneNumberFromString(
         mobile,
         countryCode.toUpperCase()
      );
      if (!phoneNumber || !phoneNumber.isValid()) {
         setMobileErr("Invalid Contact Number");
         flag2 = 1;
      } else {
         setMobileErr(null);
         flag2 = 0;
      }

      // Email validation
      const tempemail = e.target.email.value;
      if (!mailCheck.test(tempemail) || tempemail === "") {
         setEmailErr("Invalid Email Address");
         flag3 = 1;
      } else {
         setEmailErr(null);
         flag3 = 0;
      }

      if (flag1 === 0 && flag2 === 0 && flag3 === 0) {
         // Format the phone number
         const formattedPhoneNumber = phoneNumber.formatInternational();

         // Update the hidden mobile input field value
         e.target.mobile.value = formattedPhoneNumber;

         // Construct the summary information as an HTML table
         let summaryHTML =
            "<table border='1' style='border-collapse:collapse; width:100%;'><tr><th>Name</th><th>Cost</th><th>Time</th></tr>";
         visibleQuestions.forEach((key) => {
            const questionState = formState[key];
            if (!questionState || !questionState[0]) return;

            summaryHTML += `
                <tr>
                    <td>
                      
                      <p>${questionState[3]}</p>
                      </p>${questionState[0]}</p>
                    
                    </td>
                    <td>${symbol}${selectedCurrency === "INR"
                  ? formatNumberToIndianCurrency(questionState[1] * factor)
                  : (questionState[1] * factor).toLocaleString()
               }</td>
                    <td>${questionState[2] === 0 ? "—" : `${questionState[2]} Week`
               }</td>
                </tr>
            `;
         });

         if (timeline.length > 0) {
            summaryHTML += `
                <tr>
                    <td>
                    <p>What is the timeline you have in mind for launch?*</p>
                    ${timeline === "Fast Train" ? `<p>Fast Train</p>` : `<p>Slow Train</p>`
               }
                    </td>
                    <td>${timeline === "Fast Train"
                  ? `${symbol}${100 * factor}`
                  : `${symbol}${0 * factor}`
               }</td>
                    <td>—</td>
                </tr>
            `;
         }

         summaryHTML += `
            <tr>
                <td>Total</td>
                <td>${timeline === "Fast Train"
               ? `~ ${symbol}${selectedCurrency === "INR"
                  ? formatNumberToIndianCurrency(
                     (totalCost + 100) * factor
                  )
                  : ((totalCost + 100) * factor).toLocaleString()
               }`
               : `~ ${symbol}${selectedCurrency === "INR"
                  ? formatNumberToIndianCurrency(totalCost * factor)
                  : (totalCost * factor).toLocaleString()
               }`
            }</td>
                <td>${timeline === "Fast Train"
               ? `${totalTime - 4} Weeks`
               : `${totalTime} Weeks`
            }</td>
            </tr>
        `;
         summaryHTML += "</table>";

         // Append summary to the form
         e.target.summary.value = summaryHTML;

         emailjs
            .sendForm(
               process.env.REACT_APP_SERVICE_ID,
               process.env.REACT_APP_TEMPLATE_ID_1,
               e.target,
               process.env.REACT_APP_PUBLIC_KEY
            )
            .then(
               (result) => {
                  console.log(result.text);
               },
               (error) => {
                  console.log(error.text);
               }
            );

         toast.success(
            "Hurray!, We got your message. Our team will soon contact you.",
            {
               position: "bottom-right",
               style: {
                  border: "1px solid #713200",
                  padding: "16px",
                  backgroundColor: "#FFD600",
               },
            }
         );
         e.target.reset();
         setMobile("");
         setVisibleQuestions([
            "type",
            "typeOfWebsite",
         ]);
         setTimeline('');
         setFormState({});
         setIsClicked(false);
         setIsSubmitted(true);
         setOrderId(orderId + 1)
         // window.location.reload()

      }
   };

   return (
      <>
         <motion.div
            exit="exit"
            variants={pageAnimation}
            initial="hidden"
            animate="show"
         >
            <motion.div variants={frameParentIvert}>
               <motion.div
                  className="animation-frame one"
                  variants={frameAnimationIvert}
               >
               </motion.div>
               <motion.div
                  className="animation-frame two"
                  variants={frameAnimationIvert}
               >
               </motion.div>
               <motion.div
                  className="animation-frame three"
                  variants={frameAnimationIvert}
               >
               </motion.div>
            </motion.div>





            <section className="calculator">
               <div className="container">

                  {/* Heading */}
                  {/* ================================================== */}
                  <div className="content">
                     <div className="title-wrapper">
                        <h1 className="title">
                           Website <span>Cost Calculator</span>
                        </h1>
                        <p className="para">
                           Find a cost effective website that meets your budget!
                        </p>
                     </div>
                     {!isSubmitted && (<div className="button-group">
                        <a href="#calculate" className="normal-btn primary">
                           <span>Get Started Now</span>
                           <i className="bi bi-arrow-right"></i>
                        </a>
                     </div>)}
                  </div>
                  {/* ================================================== */}


                  {/* Form & Summary */}
                  {/* ================================================== */}
                  {!isSubmitted && (
                     <>
                        <div className="calculatorWrapper" id={"calculate"}>
                           <div className="cal">
                              <div className="form-container">
                                 {questions
                                    .filter((question) =>
                                       visibleQuestions.includes(question.name)
                                    )
                                    .map((question) => renderQuestion(question))}
                                 {Object.keys(formState).includes("cms") && (
                                    <div className="type-wrapper">
                                       <label className="queLabel">
                                          What is the timeline you have in mind for launch?
                                       </label>
                                       <div className="form-group">
                                          <CustomDropdown
                                             data={data}
                                             handleTypeChange={handleTypeChange}
                                             name="timeline"
                                             factor={factor}
                                             symbol={symbol}
                                             selectedCurrency={selectedCurrency}
                                             formatNumberToIndianCurrency={
                                                formatNumberToIndianCurrency
                                             }
                                          />
                                       </div>
                                    </div>
                                 )}
                              </div>
                              <div className="summary">
                                 <div className="summary-container">
                                    <div className="heading1">
                                       <h3 className="text-3xl font-semibold">Summary</h3>
                                    </div>
                                    <div className="summary-row">
                                       <div className="name-div">
                                          <h3>Name</h3>
                                       </div>
                                       <div className="cost-div">
                                          <h3>Cost</h3>
                                       </div>
                                       <div className="cost-div">
                                          <h3>Time</h3>
                                       </div>
                                    </div>
                                    {visibleQuestions.map((key) => {
                                       const questionState = formState[key];
                                       if (!questionState || !questionState[0]) return null;

                                       return (
                                          <div key={key} className="summary-row dashed">
                                             <div className="summary-item">
                                                <p className="main">{questionState[3]}</p>
                                                <p className="sub">{questionState[0]}</p>
                                             </div>
                                             <div className="cost">
                                                <p>
                                                   {symbol}
                                                   {selectedCurrency === "INR"
                                                      ? formatNumberToIndianCurrency(
                                                         questionState[1] * factor
                                                      )
                                                      : (questionState[1] * factor).toLocaleString()}
                                                </p>
                                             </div>
                                             <div className="cost">
                                                {questionState[2] === 0 ? (
                                                   <p className="dash">—</p>
                                                ) : (
                                                   <p>{questionState[2]} Week</p>
                                                )}
                                             </div>
                                          </div>
                                       );
                                    })}
                                    {timeline.length > 0 && (
                                       <div className="summary-row dashed">
                                          <div className="summary-item">
                                             <p className="main">
                                                What is the timeline you have in mind for launch?*
                                             </p>
                                             {timeline === "Fast Train" && (
                                                <p className="sub">
                                                   Fast Train ( {symbol}
                                                   {100 * factor}){" "}
                                                </p>
                                             )}
                                             {timeline === "Slow Train" && (
                                                <p className="sub">Slow Train</p>
                                             )}
                                          </div>
                                          <div className="cost">
                                             {timeline === "Fast Train" && (
                                                <p className="">
                                                   {" "}
                                                   {symbol} {100 * factor}
                                                </p>
                                             )}
                                             {timeline === "Slow Train" && (
                                                <p className="">
                                                   {" "}
                                                   {symbol} {0 * factor}
                                                </p>
                                             )}
                                          </div>
                                          <div className="cost">
                                             <p className="">—</p>
                                          </div>
                                       </div>
                                    )}
                                    <div className="summary-row">
                                       <div className="summary-item"></div>

                                       <div className="cost">
                                          {timeline === "Fast Train" ? (
                                             <p className="total-cost">
                                                ~ {symbol}
                                                {selectedCurrency === "INR"
                                                   ? formatNumberToIndianCurrency(
                                                      (totalCost + 100) * factor
                                                   )
                                                   : ((totalCost + 100) * factor).toLocaleString()}
                                             </p>
                                          ) : (
                                             <p className="total-cost">
                                                ~ {symbol}
                                                {selectedCurrency === "INR"
                                                   ? formatNumberToIndianCurrency(totalCost * factor)
                                                   : (totalCost * factor).toLocaleString()}
                                             </p>
                                          )}
                                       </div>
                                       <div className="cost">
                                          {timeline === "Fast Train" ? (
                                             <p className="total-cost">{totalTime - 4} Weeks</p>
                                          ) : (
                                             <p className="total-cost">{totalTime} Weeks</p>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                                 {!isClicked && timeline.length > 0 && (
                                    <div className="place-order">
                                       <div className="button-group1">
                                          <p
                                             className="normal-btn primary"
                                             onClick={() => setIsClicked(true)}
                                          >
                                             Place Order
                                          </p>
                                          {/* <p className="orderLabel" onClick={()=>setIsClicked(true)}>Place Order</p> */}
                                       </div>
                                    </div>
                                 )}
                                 {isClicked && (
                                    <form className="order-form" onSubmit={sendEmail}>
                                       <div className="form-group">
                                          <input
                                             type="text"
                                             name="name"
                                             placeholder="Your Name"
                                             className="form-control"
                                          />
                                          <span className="error">
                                             {nameErr != null ? nameErr : ""}
                                          </span>
                                       </div>
                                       <div className="form-group">
                                          <PhoneInput
                                             country={countryCode}
                                             value={mobile}
                                             onChange={(phone) => setMobile(phone)}
                                             inputClass="form-control"
                                             placeholder="Your Contact Number"
                                          />
                                          <span className="error">
                                             {mobileErr != null ? mobileErr : ""}
                                          </span>
                                          {/* Hidden input field for mobile number */}
                                          <input type="hidden" name="mobile" value={mobile} />
                                       </div>
                                       <div className="form-group">
                                          <input
                                             type="text"
                                             className="form-control"
                                             name="email"
                                             placeholder="Your Email"
                                          />
                                          <span className="error">
                                             {emailErr != null ? emailErr : ""}
                                          </span>
                                       </div>
                                       <div className="form-group">
                                          <textarea
                                             className="form-control"
                                             name="message"
                                             placeholder="What's your message?"
                                          ></textarea>
                                       </div>
                                       <input type="hidden" name="summary" />
                                       <button className="normal-btn primary">
                                          Place Order
                                          <svg
                                             width="17"
                                             height="17"
                                             viewBox="0 0 17 17"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg"
                                          >
                                             <g id="Send" clip-path="url(#clip0_2530_2660)">
                                                <path
                                                   id="Vector"
                                                   d="M16.3522 0.646028C16.4214 0.71536 16.4688 0.803502 16.4883 0.899505C16.5079 0.995508 16.4988 1.09514 16.4622 1.18603L10.6432 15.733C10.5919 15.8611 10.5063 15.9726 10.3958 16.0552C10.2852 16.1378 10.154 16.1883 10.0166 16.2011C9.87921 16.2139 9.74094 16.1886 9.61702 16.1279C9.49309 16.0672 9.38832 15.9734 9.31422 15.857L6.13622 10.862L1.14122 7.68403C1.02454 7.61001 0.930574 7.5052 0.869693 7.38116C0.808811 7.25711 0.783381 7.11866 0.796208 6.98108C0.809035 6.8435 0.859621 6.71214 0.942384 6.60148C1.02515 6.49083 1.13687 6.4052 1.26522 6.35403L15.8122 0.537028C15.9031 0.50044 16.0027 0.49136 16.0987 0.510916C16.1947 0.530473 16.2829 0.577803 16.3522 0.647028V0.646028ZM7.13422 10.57L9.89522 14.908L14.6282 3.07603L7.13422 10.57ZM13.9212 2.36903L2.08922 7.10203L6.42822 9.86203L13.9212 2.36903Z"
                                                   fill="black"
                                                />
                                             </g>
                                             <defs>
                                                <clipPath id="clip0_2530_2660">
                                                   <rect
                                                      width="16"
                                                      height="16"
                                                      fill="white"
                                                      transform="translate(0.5 0.5)"
                                                   />
                                                </clipPath>
                                             </defs>
                                          </svg>
                                       </button>
                                    </form>
                                 )}{
                                    !isClicked &&
                                    (<div>
                                       <Toaster position="bottom-right" reverseOrder={false} />
                                    </div>)
                                 }
                              </div>
                           </div>
                        </div>
                     </>
                  )}
                  {/* ================================================== */}

                  {/* Form Success */}
                  {/* ================================================== */}
                  {isSubmitted && (
                     <>
                        <ThankYou orderId={orderId} setIsSubmitted={setIsSubmitted} />
                     </>
                  )}
               </div>
            </section>

         </motion.div>



      </>
   );
};

export default Calculator;
