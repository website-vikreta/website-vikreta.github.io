import React, { useState, useEffect, useRef } from "react";

export default function CustomDropdown({
  data,
  handleTypeChange,
  name,
  factor,
  symbol,
  selectedCurrency,
  formatNumberToIndianCurrency
}) {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select");
  const dropdownRef = useRef(null);


  const handleChange = (e, title, value) => {
    // e.preventDefault();
    setIsActive(false);
    handleTypeChange(null, name, value);
    setSelectedOption(title);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="c-dropdown" ref={dropdownRef}>
      <div className="c-dropdown-btn" onClick={() => setIsActive(!isActive)}>
        <h4>{selectedOption}</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.23517 3.48456C1.27 3.44964 1.31139 3.42193 1.35695 3.40303C1.4025 3.38412 1.45134 3.37439 1.50067 3.37439C1.55 3.37439 1.59884 3.38412 1.6444 3.40303C1.68995 3.42193 1.73134 3.44964 1.76617 3.48456L6.00067 7.71981L10.2352 3.48456C10.27 3.44969 10.3114 3.42204 10.357 3.40317C10.4025 3.3843 10.4514 3.37459 10.5007 3.37459C10.55 3.37459 10.5988 3.3843 10.6444 3.40317C10.6899 3.42204 10.7313 3.44969 10.7662 3.48456C10.801 3.51943 10.8287 3.56082 10.8476 3.60637C10.8664 3.65193 10.8761 3.70075 10.8761 3.75006C10.8761 3.79937 10.8664 3.84819 10.8476 3.89375C10.8287 3.9393 10.801 3.98069 10.7662 4.01556L6.26617 8.51556C6.23134 8.55048 6.18995 8.57819 6.14439 8.59709C6.09884 8.616 6.05 8.62573 6.00067 8.62573C5.95134 8.62573 5.9025 8.616 5.85695 8.59709C5.81139 8.57819 5.77 8.55048 5.73517 8.51556L1.23517 4.01556C1.20025 3.98073 1.17254 3.93934 1.15364 3.89379C1.13473 3.84823 1.125 3.79939 1.125 3.75006C1.125 3.70073 1.13473 3.65189 1.15364 3.60633C1.17254 3.56078 1.20025 3.51939 1.23517 3.48456Z"
            fill="white"
          />
        </svg>
      </div>
      {isActive && (
        <div className="c-dropdown-content">
          <div
            className={`c-dropdown-item ${
              selectedOption === "Select" ? "selected" : ""
            }`}
            value=""
            onClick={(e) => handleChange(e, "Select", "")}
          >
            <p className="c-dropdown-item-title" value="">
              Select
            </p>
          </div>
          {data.map((option) => (
            <div
              key={option.name}
              className={`c-dropdown-item ${
                selectedOption === option.title ? "selected" : ""
              }`}
              onClick={(e) => handleChange(e, option.title, option.name)}
            >
              <p className="c-dropdown-item-title">
                {option.title}
                {option.recommended && (
                  <span className="recommended-label">Recommended</span>
                )}
              </p>

              <div className="c-option-cost">
                {option.cost === 0 && option.additionalTime === 0 ? (
                  <p className="c-option-time">
                    No additional charges / time required
                  </p>
                ) : (
                  <>
                    {option.name === "yes" || option.name === "no" ? (
                      <>
                        <p className="strikethrough">
                          {symbol}{" "}
                          {selectedCurrency === "INR"
                            ? formatNumberToIndianCurrency(
                                option.cost * factor
                              )
                            : (option.cost * factor).toLocaleString()}
                        </p>
                        <div className="c-option-rectangle"></div>
                        <p className="c-option-time">
                          additional{" "}
                          <span className="strikethrough">
                            {option.additionalTime} week
                          </span>{" "}
                          <span>0 week </span> of time
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="c-option-cost-cost">
                          {symbol}{" "}
                          {selectedCurrency === "INR"
                            ? formatNumberToIndianCurrency(
                                option.cost * factor
                              )
                            : (option.cost * factor).toLocaleString()}
                        </p>
                        <div className="c-option-rectangle"></div>
                        <p className="c-option-time">
                          additional <span>{option.additionalTime} week</span>{" "}
                          of time
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
