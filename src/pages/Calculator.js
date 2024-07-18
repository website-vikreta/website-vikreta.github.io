import { motion } from "framer-motion";
import { pageAnimation, smoothFade, frameParentIvert, frameAnimationIvert } from "../utility/animation";
import { useEffect, useState } from "react";
// import CalForm from "../components/CalForm";
import calData from "../json/calData";
import currancy from "../json/currancy";

const Calculator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Calculator | UI-UX";
  }, []);

  const questions = calData();
  const curr = currancy();

  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  // const [selectedFlag,setSelectedFlag] = useState()
  const [factor,setFactor] = useState(1)
  const [symbol,setSymbol] = useState('$')
  // const handleChange = (e) => setSelectedCurrency(e.target.value);

  const handleChange =(e)=>{
    const prev = curr.find((item)=>item.name===selectedCurrency);
    const back1 = prev.back;
    setSelectedCurrency(e.target.value);
    console.log(selectedCurrency);  
    const next = curr.find((item)=>item.name===e.target.value);
    const front1 = next.front;
    setSymbol(next.symbol);
    // setSelectedFlag(next.flag)
    const mul = front1*back1;
    console.log(mul);
    setFactor(front1);
    // console.log(factor)
  }




  const [totalCost,setTotalCost] = useState(0);
  const [totalTime,setTotalTime] = useState(4);


  const [timeline,setTimeline] = useState('');

  const [formState, setFormState] = useState({});
  const [visibleQuestions, setVisibleQuestions] = useState(["type","typeOfWebsite"]);

  const handleTypeChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    const currentQuestion = questions.find((item) => item.name === name);
    const cost = currentQuestion.data.find((item) => item.name === value)?.cost || 0;
    const time = currentQuestion.data.find((item) => item.name === value)?.additionalTime || 0;
    const que = questions.find((item)=> item.name===name)?.question;
    const title = currentQuestion.data.find((item)=>item.name===value)?.title
    // console.log(que);

    setFormState((prevState) => {
      const newState = {
        ...prevState,
        [name]: [title, cost, time,que]
      };
  
      console.log(newState);
  
      const nextQuestionName = currentQuestion.data.find((item) => item.name === value)?.visibleAfterLoad;
      if (nextQuestionName) {
        const newVisibleQuestions = visibleQuestions.slice(0, visibleQuestions.indexOf(name) + 1);
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
        setVisibleQuestions(visibleQuestions.slice(0, visibleQuestions.indexOf(name) + 1));
      }
  
      // calculateTotal();
  
      return newState;
    });
  };


  const calculateTotal = () => {
    let totalCost = 0;
    let totalTime = 4;

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

    if (questionType === 'dropdown') {
      return (
        <div key={name} className="type-wrapper">
        <label className="queLabel">{questionText}<span> *</span></label>
        <div className="custom-select">
            <select name={name} onChange={handleTypeChange} className="web-type">
                <option value="">Select an option</option>
                {data.map((option) => (
                    <option key={option.name} value={option.name} className="try1">
                        {option.title}
                    </option>
                ))}
            </select>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="dropdown-cursor">
              <g id="ChevronDown">
              <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M1.64689 4.64592C1.69334 4.59935 1.74852 4.56241 1.80926 4.5372C1.87001 4.512 1.93513 4.49902 2.00089 4.49902C2.06666 4.49902 2.13178 4.512 2.19253 4.5372C2.25327 4.56241 2.30845 4.59935 2.35489 4.64592L8.00089 10.2929L13.6469 4.64592C13.6934 4.59943 13.7486 4.56255 13.8093 4.53739C13.87 4.51223 13.9352 4.49929 14.0009 4.49929C14.0666 4.49929 14.1317 4.51223 14.1925 4.53739C14.2532 4.56255 14.3084 4.59943 14.3549 4.64592C14.4014 4.6924 14.4383 4.74759 14.4634 4.80833C14.4886 4.86907 14.5015 4.93417 14.5015 4.99992C14.5015 5.06566 14.4886 5.13076 14.4634 5.1915C14.4383 5.25224 14.4014 5.30743 14.3549 5.35392L8.35489 11.3539C8.30845 11.4005 8.25327 11.4374 8.19253 11.4626C8.13178 11.4878 8.06666 11.5008 8.00089 11.5008C7.93513 11.5008 7.87001 11.4878 7.80926 11.4626C7.74852 11.4374 7.69334 11.4005 7.64689 11.3539L1.64689 5.35392C1.60033 5.30747 1.56339 5.2523 1.53818 5.19155C1.51297 5.13081 1.5 5.06568 1.5 4.99992C1.5 4.93415 1.51297 4.86903 1.53818 4.80828C1.56339 4.74754 1.60033 4.69236 1.64689 4.64592Z" fill="white"/>
              </g>
            </svg>
        </div>
    </div>
      );
    }

    if (questionType === 'radio') {
      return (
        <div key={name} className="form-question">
          <label className="queLabel">{questionText}<span> *</span></label>
          <div className="extra-options">
            {data.map((option) => (
              <div key={option.name} className="form-option">
                <input
                  type="radio"
                  name={name}
                  value={option.name}
                  id={option.name}
                  onChange={handleTypeChange}
                />
                <label htmlFor={option.name}>{option.title}</label>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  function formatNumberToIndianCurrency(number) {
    const x = number.toString().split('.');
    let lastThree = x[0].substring(x[0].length - 3);
    const otherNumbers = x[0].substring(0, x[0].length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    const result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    return x.length > 1 ? result + '.' + x[1] : result;
  }


  return (
    <motion.div exit="exit" variants={pageAnimation} initial="hidden" animate="show">
      <motion.div variants={frameParentIvert}>
        <motion.div className="animation-frame one" variants={frameAnimationIvert}></motion.div>
        <motion.div className="animation-frame two" variants={frameAnimationIvert}></motion.div>
        <motion.div className="animation-frame three" variants={frameAnimationIvert}></motion.div>
      </motion.div>
      <motion.section className="motion-section" variants={smoothFade}>
        <div className="content">
          <div className="title-wrapper">
            {/* <h2>Calculate cost for UI/UX of your website</h2> */}
            <h1 className="title">
              Website <span>Cost Calculator</span>
            </h1>
            <p className="para">Find a cost effective website that meets your budget!</p>
            <div className="button-group1">
              <a href="/#cal" className="normal-btnp primary">Get Started Now</a>
            </div>
          </div>
          
          
        </div>

        <div className="cal" id={"cal"}>
          
          <div className="form-container">
            <div className="makeFlex">
              <h3 className="text-xl font-semibold">Selected Currency</h3>
              <div className="gap-x">
                <select value={selectedCurrency} onChange={handleChange} className="currency-dropdown">
                  <option value="USD">USD </option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
            <form className="test">

                {questions.filter((question) => visibleQuestions.includes(question.name)).map((question) => renderQuestion(question))}
                {Object.keys(formState).includes('cms') && (
                  <div className="type-wrapper">
                    <p>What is the timeline you have in mind for launch?</p>
                    <div className="custom-select">
                      <select name='Select Value' id="" className='web-type' value={timeline} onChange={(e)=>setTimeline(e.target.value)}>
                        <option value="">Selected Value</option>
                          {
                            totalTime>=8 && (
                              <option value="Fast Train (+ $100)">Fast Train - Under {totalTime-4} Weeks (+ $ 100)</option>
                            )
                          }
                          
                        <option value="Slow Train (+ $0.0)">Slow Train - Up to {totalTime} Weeks (No Extra Charges)</option>
                      </select>
                    </div>
                  </div>
                )}
              </form>
          </div>
          <div className="summary">
            <div className="summary-container">
              <div className="heading1">
                <h3 className="text-3xl font-semibold">Summary</h3>
              </div>
              <div className="summary-row">
                <div className="name-div">
                  <h3 >Name</h3>
                </div>
                <div className="cost-div">
                  <h3>Cost</h3>
                </div>
                <div className="cost-div">
                  <h3>Time</h3>
                </div>
              </div>
              {Object.keys(formState).map((key) => (
                <div className="summary-row">
                  <div className="">  
                    <div key={key} className="summary-item">
                      <p className="main">{formState[key][3]} : </p>
                      <p className="sub">{formState[key][0]}</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="cost">
                      <p className=""> {symbol} {selectedCurrency === "INR" ? formatNumberToIndianCurrency(formState[key][1] * factor) : (formState[key][1] * factor).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="cost">
                      <p className="">{formState[key][2]} Week</p>
                    </div>
                  </div>
                </div>
              ))}
              {timeline.length > 0 && (
                <div className="summary-row">
                  <div className="summary-item">
                    <p className="main">What is the timeline you have in mind for launch?*</p>
                    {timeline === "Fast Train (+ $100)" && (
                      <p className="sub">Fast Train ( {symbol}{100 * factor}) </p>
                    )}
                    {timeline === "Slow Train (+ $0.0)" && (
                      <p className="sub">Slow Train ( $0.0)</p>
                    )}
                  </div>
                  <div className="cost">
                    {timeline === "Fast Train (+ $100)" && (
                      <p className="main"> {symbol} {100 * factor}</p>
                    )}
                    {timeline === "Slow Train (+ $0.0)" && (
                      <p className="main"> {symbol} {0 * factor}</p>
                    )}
                  </div>
                </div>
              )}
              <div className="summary-row">
                <div className="summary-item">
                  <h2>Total :</h2>
                </div>
                
                <div className="cost">
                  {timeline === "Fast Train (+ $100)" ? (
                    <p className="total-cost">~ {symbol} {selectedCurrency === "INR" ? formatNumberToIndianCurrency((totalCost + 100) * factor) : ((totalCost + 100) * factor).toLocaleString()}</p>
                  ) : (
                    <p className="total-cost">~ {symbol} {selectedCurrency === "INR" ? formatNumberToIndianCurrency(totalCost * factor) : (totalCost * factor).toLocaleString()}</p>
                  )}
                </div>
                <div className="cost">
                  {timeline === "Fast Train (+ $100)" ? (
                    <p className="total-cost">{totalTime-4} Weeks</p>
                  ) : (
                    <p className="total-cost">{totalTime} Weeks</p>
                  )}
                </div>
              </div>
            </div>
          </div>


         </div>
        </motion.section>
      </motion.div>
    );
  };
  
  export default Calculator;




       