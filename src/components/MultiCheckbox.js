import React, { useState, useEffect } from "react";

export default function MultiCheckbox ({ options, defaultOptions, setOptions }) {
  const [checkedOptions, setCheckedOptions] = useState([]);

  useEffect(() => {
    setCheckedOptions(defaultOptions);
  }, [defaultOptions]);

  const handleCheckboxChange = (option) => {
    const newCheckedOptions = checkedOptions.includes(option)
      ? checkedOptions.filter((item) => item !== option)
      : [...checkedOptions, option];

    setCheckedOptions(newCheckedOptions);
    setOptions(newCheckedOptions);
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option} style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="checkbox"
            checked={checkedOptions.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};