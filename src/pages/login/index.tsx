import { Link } from "react-router";

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      
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
      
      <Link to="/time-tracker">
        <button>Log In</button>
      </Link>

    </div>
  );
};

export default LoginPage;
