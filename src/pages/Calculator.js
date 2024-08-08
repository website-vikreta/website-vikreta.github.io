import { motion } from "framer-motion";
import {
  pageAnimation,
  frameParentIvert,
  frameAnimationIvert,
} from "../utility/animation";
import { useEffect, useState } from "react";
// import CalForm from "../components/CalForm";
import calData from "../json/calData";
import countries from "../json/countries";
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
// import Summary from "../components/Summary";

const Calculator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Website Cost Calculator";
  }, []);

  //for order

  const [nameErr, setNameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [mobileErr, setMobileErr] = useState(null);
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [orderId, setOrderId] = useState(Date.now());
  const [toggleSummary, setToggleSummary] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    // Fetch user's country code
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        setCountryCode(response.data.country_code.toLowerCase());
        console.log(response.data.country_code.toLowerCase());
        setSelected(response.data.country_code.toUpperCase());
      })
      .catch((error) => {
        console.error("Error fetching country code:", error);
      });
  }, []);

  const questions = calData();
  const curr = currancy();
  const countryNames = countries();

  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const first = curr.find((item) => item.name === "USD")?.flag;
  const [selectedFlag, setSelectedFlag] = useState(first);
  const [factor, setFactor] = useState(1);
  const [symbol, setSymbol] = useState("$");

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
  };

  const [totalCost, setTotalCost] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const [isSubmitted, setIsSubmitted] = useState(false);

  var data = [
    {
      title: `Fast Train - Under ${totalTime - 4} Weeks`,
      name: "Fast Train",
      cost: 100,
      recommended: true,
      additionalTime: 0,
    },
    {
      title: `Slow Train - Up to ${totalTime} Weeks`,
      name: "Slow Train",
      cost: 0,
      recommended: false,
      additionalTime: 0,
    },
  ];

  if (totalTime - 4 <= 4) {
    data = [
      {
        title: `Timeline - Up to ${totalTime} Weeks`,
        name: "Slow Train",
        cost: 0,
        recommended: false,
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

    if (tempName === "type") {
      setFormState((prevState) => ({
        ...prevState,
        [tempName]: [title, cost, time, que],
      }));
    } else {
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
    }
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

    //code for rendering question with question-type dropdown
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
                    <p className="">
                      <span
                        dangerouslySetInnerHTML={{ __html: selectedFlag }}
                      ></span>
                      <span style={{ color: "#FFD600" }}>{symbol}</span>
                    </p>
                  </div>
                  <div className="">
                    <select
                      value={selectedCurrency}
                      name=""
                      onChange={handleChange}
                      className="font black-background"
                    >
                      <option value="INR">INR</option>
                      <option value="AUD">AUD </option>
                      <option value="CAD">CAD </option>
                      <option value="USD">USD </option>
                      <option value="EUR">EUR</option>
                      <option value="YUAN">YUAN</option>
                      <option value="YEN">YEN </option>
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
    //code for rendering question with question-type radio
    if (questionType === "radio") {
      return (
        <div key={name} className="type-wrapper">
          <label className="queLabel">
            {name === "responsive" ? (
              <>
                <div className="recommend">
                  {questionText}
                  <span> *</span>
                  <span className="recommended-label1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_2528_2145)">
                        <path
                          d="M6.70056 5.46616C6.79681 5.17741 7.20456 5.17741 7.30081 5.46616L7.86519 7.16103C7.98941 7.53361 8.19871 7.87213 8.4765 8.14976C8.75428 8.4274 9.09292 8.63651 9.46556 8.76053L11.1596 9.32491C11.4483 9.42116 11.4483 9.82891 11.1596 9.92516L9.46469 10.4895C9.09211 10.6138 8.75359 10.8231 8.47596 11.1008C8.19833 11.3786 7.98921 11.7173 7.86519 12.0899L7.30081 13.7839C7.28006 13.8471 7.23987 13.9022 7.18598 13.9412C7.13208 13.9803 7.06724 14.0013 7.00069 14.0013C6.93414 14.0013 6.8693 13.9803 6.8154 13.9412C6.76151 13.9022 6.72132 13.8471 6.70056 13.7839L6.13619 12.089C6.01205 11.7165 5.80289 11.3781 5.52526 11.1005C5.24763 10.8228 4.90917 10.6137 4.53669 10.4895L2.84181 9.92516C2.77859 9.90441 2.72353 9.86422 2.68449 9.81032C2.64545 9.75643 2.62444 9.69158 2.62444 9.62503C2.62444 9.55849 2.64545 9.49364 2.68449 9.43974C2.72353 9.38585 2.77859 9.34566 2.84181 9.32491L4.53669 8.76053C4.90917 8.63639 5.24763 8.42723 5.52526 8.1496C5.80289 7.87197 6.01205 7.53351 6.13619 7.16103L6.70056 5.46616ZM3.32044 1.00453C3.33299 0.96664 3.35716 0.933666 3.38951 0.910294C3.42187 0.886923 3.46077 0.874344 3.50069 0.874344C3.5406 0.874344 3.57951 0.886923 3.61186 0.910294C3.64422 0.933666 3.66839 0.96664 3.68094 1.00453L4.01956 2.02128C4.17094 2.47453 4.52619 2.82978 4.97944 2.98116L5.99619 3.31978C6.03408 3.33233 6.06706 3.3565 6.09043 3.38886C6.1138 3.42122 6.12638 3.46012 6.12638 3.50003C6.12638 3.53995 6.1138 3.57885 6.09043 3.61121C6.06706 3.64357 6.03408 3.66773 5.99619 3.68028L4.97944 4.01891C4.75577 4.09314 4.55252 4.21857 4.38587 4.38522C4.21923 4.55186 4.0938 4.75511 4.01956 4.97878L3.68094 5.99553C3.66839 6.03342 3.64422 6.0664 3.61186 6.08977C3.57951 6.11314 3.5406 6.12572 3.50069 6.12572C3.46077 6.12572 3.42187 6.11314 3.38951 6.08977C3.35716 6.0664 3.33299 6.03342 3.32044 5.99553L2.98181 4.97878C2.90758 4.75511 2.78215 4.55186 2.6155 4.38522C2.44886 4.21857 2.24561 4.09314 2.02194 4.01891L1.00519 3.68028C0.967296 3.66773 0.934322 3.64357 0.910951 3.61121C0.887579 3.57885 0.875 3.53995 0.875 3.50003C0.875 3.46012 0.887579 3.42122 0.910951 3.38886C0.934322 3.3565 0.967296 3.33233 1.00519 3.31978L2.02194 2.98116C2.24561 2.90692 2.44886 2.78149 2.6155 2.61485C2.78215 2.4482 2.90758 2.24495 2.98181 2.02128L3.32044 1.00453ZM9.50581 0.0866576C9.51445 0.0617431 9.53064 0.040139 9.55212 0.024849C9.57361 0.00955894 9.59932 0.00134277 9.62569 0.00134277C9.65206 0.00134277 9.67777 0.00955894 9.69926 0.024849C9.72074 0.040139 9.73693 0.0617431 9.74556 0.0866576L9.97131 0.763908C10.0719 1.06666 10.3091 1.30378 10.6118 1.40441L11.2891 1.63016C11.314 1.6388 11.3356 1.65498 11.3509 1.67647C11.3662 1.69795 11.3744 1.72366 11.3744 1.75003C11.3744 1.7764 11.3662 1.80212 11.3509 1.8236C11.3356 1.84508 11.314 1.86127 11.2891 1.86991L10.6118 2.09566C10.4627 2.14553 10.3273 2.22935 10.2162 2.3405C10.105 2.45165 10.0212 2.58709 9.97131 2.73616L9.74556 3.41341C9.73693 3.43832 9.72074 3.45993 9.69926 3.47522C9.67777 3.49051 9.65206 3.49872 9.62569 3.49872C9.59932 3.49872 9.57361 3.49051 9.55212 3.47522C9.53064 3.45993 9.51445 3.43832 9.50581 3.41341L9.28006 2.73616C9.23019 2.58709 9.14637 2.45165 9.03522 2.3405C8.92408 2.22935 8.78863 2.14553 8.63956 2.09566L7.96319 1.86991C7.93827 1.86127 7.91667 1.84508 7.90138 1.8236C7.88609 1.80212 7.87787 1.7764 7.87787 1.75003C7.87787 1.72366 7.88609 1.69795 7.90138 1.67647C7.91667 1.65498 7.93827 1.6388 7.96319 1.63016L8.64044 1.40441C8.94319 1.30378 9.18031 1.06666 9.28094 0.763908L9.50581 0.0866576Z"
                          fill="#1B1B1B"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2528_2145">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p>Limited time offer</p>
                  </span>
                </div>
              </>
            ) : (
              <>
                {questionText}
                <span> *</span>
              </>
            )}
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
                    <div className="optionLabel">{option.title}</div>
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
              {name === "responsive" ? (
                <>
                  <div className="responsive-flex">
                    {data.map((option) =>
                      option.name === "yes" ? (
                        <>
                          {/* <div className="yes-option"></div> */}
                          <label
                            key={option.name}
                            className={`yes-option`}
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
                            <div className="optionLabel">{option.title}</div>

                            <div className="option-cost-res">
                              {option.cost === 0 &&
                              option.additionalTime === 0 ? (
                                <>
                                  <p className="strikethrough">
                                    {" "}
                                    {symbol}{" "}
                                    {selectedCurrency === "INR"
                                      ? formatNumberToIndianCurrency(
                                          20 * factor
                                        )
                                      : (20 * factor).toLocaleString()}
                                    /page
                                  </p>
                                  <p className="option-cost-cost">+ $0</p>
                                  <div className="option-rectangle"></div>
                                  <p className="option-time">additional</p>
                                  <p className="strikethrough">01</p>
                                  <p className="option-cost-cost">0 week</p>
                                  <p className="option-time">of time</p>
                                </>
                              ) : (
                                <>
                                  {/* <p className="option-cost-cost">+{symbol}{option.cost*factor}</p> */}
                                  {option.name === "yes" ||
                                  option.name === "no" ? (
                                    <>
                                      <p className="strikethrough">
                                        {" "}
                                        {symbol}{" "}
                                        {selectedCurrency === "INR"
                                          ? formatNumberToIndianCurrency(
                                              20 * factor
                                            )
                                          : (
                                              option.cost * factor
                                            ).toLocaleString()}
                                        /page
                                      </p>
                                      <p className="option-cost-cost">+ $0</p>
                                      <div className="option-rectangle"></div>
                                      <p className="option-time">additional</p>
                                      <p className="strikethrough">01</p>
                                      <p className="option-cost-cost">0 week</p>
                                      <p className="option-time">of time</p>
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
                                          : (
                                              option.cost * factor
                                            ).toLocaleString()}
                                      </p>
                                      <div className="option-rectangle"></div>
                                      <p className="option-time">
                                        additional{" "}
                                        <span>
                                          {option.additionalTime} week
                                        </span>{" "}
                                        of time
                                      </p>
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </label>
                        </>
                      ) : (
                        <>
                          <div className="no-option">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <circle
                                cx="8"
                                cy="8"
                                r="7.5"
                                stroke="white"
                                stroke-opacity="0.3"
                              />
                            </svg>
                            <label key={option.name} className="no-label">
                              No
                            </label>
                          </div>
                        </>
                      )
                    )}
                  </div>
                </>
              ) : (
                <div
                  className={
                    name === "responsive" ? "responsive-radio" : `extra-options`
                  }
                >
                  {data.map((option) => (
                    <div className={`extra-options`}>
                      <label
                        key={option.name}
                        className={`form-option`}
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
                        <div className="optionLabel">{option.title}</div>
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
                                      {" "}
                                      {option.additionalTime} week{" "}
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
              )}
            </>
          )}
        </div>
      );
    }
  };

  const handleClick = (event) => {
    console.log("Click event triggered");
    setShowSummary(false);
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
                     
                     <p>${questionState[3]} <br/>
                        ${
                          questionState[0] === "Single Country"
                            ? `<strong>${questionState[0]} : (${countryNames[selected]})</strong>`
                            : `<strong>${questionState[0]}<strong>`
                        }
                     </p>
                     
                   
                   </td>
                   <td>${symbol}${
          selectedCurrency === "INR"
            ? formatNumberToIndianCurrency(questionState[1] * factor)
            : (questionState[1] * factor).toLocaleString()
        }</td>
                   <td>${
                     questionState[2] === 0 ? "—" : `${questionState[2]} Week`
                   }</td>
               </tr>
           `;
      });

      if (timeline.length > 0) {
        summaryHTML += `
               <tr>
                   <td>
                   <p>What is the timeline you have in mind for launch?* <br/>
                   ${
                     timeline === "Fast Train"
                       ? `<strong>Fast Train</strong>`
                       : `<s>Fast Train</s> <strong>Slow Train</strong>`
                   }     </p>
                   </td>
                   <td>${
                     timeline === "Fast Train"
                       ? `${symbol}${100 * factor}`
                       : `${symbol}${0 * factor}`
                   }</td>
                   <td>—</td>
               </tr>
           `;
      }
      summaryHTML += `
           <tr>
               <td><strong>Total</strong></td>
               <td>${
                 timeline === "Fast Train"
                   ? `~ ${symbol}${
                       selectedCurrency === "INR"
                         ? formatNumberToIndianCurrency(
                             (totalCost + 100) * factor
                           )
                         : ((totalCost + 100) * factor).toLocaleString()
                     }`
                   : `~ ${symbol}${
                       selectedCurrency === "INR"
                         ? formatNumberToIndianCurrency(totalCost * factor)
                         : (totalCost * factor).toLocaleString()
                     }`
               }</td>
               <td>${
                 timeline === "Fast Train"
                   ? `${totalTime - 4} Weeks`
                   : `${totalTime} Weeks`
               }</td>
           </tr>
       `;
      summaryHTML += "</table>";

      e.target.summary.value = summaryHTML;

      const generateOrderId = () => {
        const now = new Date();
        const uniqueNumber = now.getTime() % 10000; // Get the last 4 digits of the timestamp
        return uniqueNumber.toString().padStart(4, "0"); // Ensure it's 4 digits
      };
      const orderId = generateOrderId();
      e.target.orderId.value = orderId;

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
      setVisibleQuestions(["type", "typeOfWebsite"]);
      setTimeline("");
      setFormState({});
      setIsClicked(false);
      setIsSubmitted(true);
      setOrderId(orderId);
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
          ></motion.div>
          <motion.div
            className="animation-frame two"
            variants={frameAnimationIvert}
          ></motion.div>
          <motion.div
            className="animation-frame three"
            variants={frameAnimationIvert}
          ></motion.div>
        </motion.div>

        <section className="calculator">
          <div className="container">
            {/* Heading */}
            {/* ================================================== */}
            {!showSummary && (
              <div className="content-cal">
                <div className="title-wrapper">
                  <h1 className="title">
                    Website <span>Cost Calculator</span>
                  </h1>
                  <p className="para">
                    Find a cost effective website that meets your budget!
                  </p>
                </div>
                {!isSubmitted && (
                  <div className="button-group">
                    <a href="#calculate" className="normal-btn primary">
                      <span>Get Started Now</span>
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                )}
              </div>
            )}

            {!showSummary && (
              <div className="content1">
                <div className="title-wrapper">
                  <h1 className="title">
                    Website <span>Cost Calculator</span>
                  </h1>
                  <p className="para">
                    Find a cost effective website that meets your budget!
                  </p>
                </div>
                {!isSubmitted && (
                  <div className="button-group">
                    <a href="#calculate" className="normal-btn primary">
                      <span>Get Started Now</span>
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                )}
              </div>
            )}
            {/* ================================================== */}

            {/* Form & Summary */}
            {/* ================================================== */}
            {!isSubmitted && (
              <>
                <div
                  className={showSummary ? `calWrap` : `calculatorWrapper`}
                  id={"calculate"}
                >
                  <div className="cal">
                    {!showSummary && (
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
                        {timeline.length > 0 && (
                          <div className="hidden place-order">
                            <div className="button-group1">
                              <p
                                className="normal-btn primary"
                                onClick={() => setShowSummary(true)}
                              >
                                Proceed To Pay
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="summary">
                      <div className="summary-container">
                        <div className="heading1">
                          <h3 className="text-3xl font-semibold">Summary</h3>
                          <i
                            className={
                              toggleSummary
                                ? `bi bi-caret-up-fill`
                                : `bi bi-caret-down-fill`
                            }
                            onClick={() => setToggleSummary(!toggleSummary)}
                          ></i>
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
                        {toggleSummary &&
                          visibleQuestions.map((key) => {
                            const questionState = formState[key];
                            if (!questionState || !questionState[0])
                              return null;

                            return (
                              <div key={key} className="summary-row dashed">
                                <div className="summary-item">
                                  <p className="main">{questionState[3]}</p>
                                  {questionState[0] === "Single Country" ? (
                                    <>
                                      <div className="country-flex">
                                        <p className="sub">
                                          {questionState[0]} :
                                        </p>
                                        {selected && (
                                          <p className="sub">({selected})</p>
                                        )}
                                      </div>
                                    </>
                                  ) : (
                                    <p className="sub">{questionState[0]}</p>
                                  )}
                                </div>
                                <div className="cost">
                                  <p>
                                    {symbol}
                                    {selectedCurrency === "INR"
                                      ? formatNumberToIndianCurrency(
                                          questionState[1] * factor
                                        )
                                      : (
                                          questionState[1] * factor
                                        ).toLocaleString()}
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
                        {toggleSummary && timeline.length > 0 && (
                          <div className="summary-row dashed">
                            <div className="summary-item">
                              <p className="main">
                                What is the timeline you have in mind for
                                launch?*
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
                                  : (
                                      (totalCost + 100) *
                                      factor
                                    ).toLocaleString()}
                              </p>
                            ) : (
                              <p className="total-cost">
                                ~ {symbol}
                                {selectedCurrency === "INR"
                                  ? formatNumberToIndianCurrency(
                                      totalCost * factor
                                    )
                                  : (totalCost * factor).toLocaleString()}
                              </p>
                            )}
                          </div>
                          <div className="cost1">
                            {timeline === "Fast Train" ? (
                              <p className="total-cost">
                                {symbol}
                                {selectedCurrency === "INR"
                                  ? formatNumberToIndianCurrency(
                                      (totalCost + 100) * factor
                                    )
                                  : (
                                      (totalCost + 100) *
                                      factor
                                    ).toLocaleString()}
                              </p>
                            ) : (
                              <p className="total-cost">
                                {symbol}
                                {selectedCurrency === "INR"
                                  ? formatNumberToIndianCurrency(
                                      totalCost * factor
                                    )
                                  : (totalCost * factor).toLocaleString()}
                              </p>
                            )}
                            <div className="total-label">Total:</div>
                          </div>
                          <div className="cost">
                            {timeline === "Fast Train" ? (
                              <p className="total-cost">
                                {totalTime - 4} Weeks
                              </p>
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
                          <input type="hidden" name="orderId" />
                          <button className="normal-btn primary">
                            <p className="btn-txt">Place Order</p>
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
                      )}
                      {!isClicked && (
                        <div>
                          <Toaster
                            position="bottom-right"
                            reverseOrder={false}
                          />
                        </div>
                      )}
                    </div>

                    {/* summary for mobile devices  */}

                    {showSummary && (
                      <div className="summary-mobile">
                        <div className="go-back" onClick={handleClick}>
                          <div className="back-svg-bg" onClick={handleClick}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="16"
                              viewBox="0 0 10 16"
                              fill="none"
                            >
                              <path d="M10 0H0V16H10V0Z" fill="#484848" />
                            </svg>
                            <div className="back-svg" onClick={handleClick}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="4"
                                height="6"
                                viewBox="0 0 4 6"
                                fill="none"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M3.53377 0.184609C3.51234 0.164166 3.48688 0.147947 3.45884 0.13688C3.43081 0.125814 3.40076 0.120117 3.37041 0.120117C3.34006 0.120117 3.31 0.125814 3.28197 0.13688C3.25394 0.147947 3.22848 0.164166 3.20704 0.184609L0.438136 2.81882C0.416647 2.83921 0.399599 2.86343 0.387967 2.8901C0.376334 2.91677 0.370347 2.94536 0.370347 2.97424C0.370347 3.00311 0.376334 3.0317 0.387967 3.05837C0.399599 3.08504 0.416647 3.10926 0.438136 3.12966L3.20704 5.76387C3.25037 5.80509 3.30913 5.82824 3.37041 5.82824C3.43168 5.82824 3.49045 5.80509 3.53377 5.76387C3.5771 5.72265 3.60144 5.66674 3.60144 5.60845C3.60144 5.55015 3.5771 5.49425 3.53377 5.45303L0.927771 2.97424L3.53377 0.495446C3.55526 0.475054 3.57231 0.45083 3.58394 0.424161C3.59558 0.397492 3.60156 0.368901 3.60156 0.340027C3.60156 0.311153 3.59558 0.282563 3.58394 0.255893C3.57231 0.229224 3.55526 0.205 3.53377 0.184609Z"
                                  fill="#FFD600"
                                />
                              </svg>
                            </div>
                          </div>

                          <p>Go Back</p>
                        </div>
                        <div className="summary-container">
                          <div className="heading1">
                            <h3 className="text-3xl font-semibold">Summary</h3>
                            <i
                              className={
                                toggleSummary
                                  ? `bi bi-caret-up-fill`
                                  : `bi bi-caret-down-fill`
                              }
                              onClick={() => setToggleSummary(!toggleSummary)}
                            ></i>
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
                          {toggleSummary &&
                            visibleQuestions.map((key) => {
                              const questionState = formState[key];
                              if (!questionState || !questionState[0])
                                return null;

                              return (
                                <div key={key} className="summary-row dashed">
                                  <div className="summary-item">
                                    <p className="main">{questionState[3]}</p>
                                    {questionState[0] === "Single Country" ? (
                                      <>
                                        <div className="country-flex">
                                          <p className="sub">
                                            {questionState[0]} :
                                          </p>
                                          {selected && (
                                            <p className="sub">({selected})</p>
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <p className="sub">{questionState[0]}</p>
                                    )}
                                  </div>
                                  <div className="cost">
                                    <p>
                                      {symbol}
                                      {selectedCurrency === "INR"
                                        ? formatNumberToIndianCurrency(
                                            questionState[1] * factor
                                          )
                                        : (
                                            questionState[1] * factor
                                          ).toLocaleString()}
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
                          {toggleSummary && timeline.length > 0 && (
                            <div className="summary-row dashed">
                              <div className="summary-item">
                                <p className="main">
                                  What is the timeline you have in mind for
                                  launch?*
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
                                    : (
                                        (totalCost + 100) *
                                        factor
                                      ).toLocaleString()}
                                </p>
                              ) : (
                                <p className="total-cost">
                                  ~ {symbol}
                                  {selectedCurrency === "INR"
                                    ? formatNumberToIndianCurrency(
                                        totalCost * factor
                                      )
                                    : (totalCost * factor).toLocaleString()}
                                </p>
                              )}
                            </div>

                            <div className="cost">
                              {timeline === "Fast Train" ? (
                                <p className="total-cost">
                                  {totalTime - 4} Weeks
                                </p>
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
                              <input
                                type="hidden"
                                name="mobile"
                                value={mobile}
                              />
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
                            <input type="hidden" name="orderId" />
                            <button className="normal-btn primary">
                              <p className="btn-txt">Place Order</p>
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
                        )}
                        {!isClicked && (
                          <div>
                            <Toaster
                              position="bottom-right"
                              reverseOrder={false}
                            />
                          </div>
                        )}
                      </div>
                    )}
                    {!showSummary && (
                      <div
                        className="cost1"
                        onClick={() => setShowSummary(!showSummary)}
                      >
                        {timeline === "Fast Train" ? (
                          <p className="total-cost">
                            Total: {symbol}
                            {selectedCurrency === "INR"
                              ? formatNumberToIndianCurrency(
                                  (totalCost + 100) * factor
                                )
                              : ((totalCost + 100) * factor).toLocaleString()}
                          </p>
                        ) : (
                          <p className="total-cost">
                            Total: {symbol}
                            {selectedCurrency === "INR"
                              ? formatNumberToIndianCurrency(totalCost * factor)
                              : (totalCost * factor).toLocaleString()}
                          </p>
                        )}
                        <div className="total-label">Total:</div>
                      </div>
                    )}
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
