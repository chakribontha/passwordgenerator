
import { useState } from 'react';
import './App.css';
import usePasswordGenerator from './hooks/usePasswordGenerator';

function App() {
  
  const [length, setLength] = useState(0);
  const [copied, setCopied] = useState(false);

  const [checkboxesdata, setCheckboxesdata] = useState([
    { title: "Include Uppercase", status: false },
    { title: "Include lowercase", status: false },
    { title: "Include Number", status: false },
    { title: "Include symboles", status: false },
  ]);

  
  const handlecheckboxchange = (i) => {
    const updatecheckboxdata=[...checkboxesdata]
    updatecheckboxdata[i].status = !updatecheckboxdata[i].status;
    setCheckboxesdata(updatecheckboxdata);
  }
   
  const handlecopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }
  const {password,errorMessage,gerenatePassword}=usePasswordGenerator();

  return (
    <div className="conatiner">
      <div className="header">
        <div className="title">{password}</div>
        <button className="copyBtn" onClick={handlecopy}>
          {copied ? "copied":"copy"}
        </button>
      </div>
      {/* charlength */}
      <div className="charlength">
        <span>
          <label>charLength</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="100"
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
        {/* checkboxes */}
        <div className="checkboxes">
          {checkboxesdata.map((checkbox, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  onChange={() => handlecheckboxchange(index)}
                  checked={checkbox.status}
                />
                <label>{checkbox.title}</label>
              </div>
            );
          })}
        </div>
        {/* strength */}
        {/* errorMessage */}
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        {/* generate buuton */}
        <button
          className="generateBtn"
          onClick={() => gerenatePassword(checkboxesdata, length)}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
