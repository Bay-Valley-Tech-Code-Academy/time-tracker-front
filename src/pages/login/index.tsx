import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";


const LoginPage = () => {
  //Login Details
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  //Router
  const navigate = useNavigate();

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post(`http://localhost:5000/api/accounts/login`, { email, password });
      localStorage.setItem("token", response.data.token); //Stores the token in local storage for authentication

      console.log('You logged in!');
      navigate("/time-tracker");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
        alert(error.message || "Invalid email or password. Please try again.");
      } else {
        console.error("An unknown error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={submitLogin}>
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email">Email:</label><br />
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password">Password:</label><br />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>


    </div>
  );
};

export default LoginPage;
