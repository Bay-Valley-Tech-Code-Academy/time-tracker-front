import React from "react";
import "./App.css";

const App = () => {
  return (
    <div className="fPass">
       <div className="fText">
          <h2>Forgot Your Password</h2>
           <p>Enter your email and a code will be sent</p>
       </div>
      
      <input type="email" id="email" required placeHolder="Email"></input>

      <button id="button">Send Code</button>

      
    </div>
  );
};

export default App;
