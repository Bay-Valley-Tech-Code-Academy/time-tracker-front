import React from "react";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>Login</h1>
      
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email:</label><br />
          <input 
            type="text"
            id="email"
          />
        </div>
      </div>

      <div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password:</label><br />
          <input 
            type="password"
            id="password"
          />
        </div>
      </div>

      <div>
       <h6>Don't have an account? Sign Up</h6>
      </div>

    </div>
  );
};

export default App;
