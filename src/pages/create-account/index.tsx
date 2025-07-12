import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const CreateAccountPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState<boolean>(false);

  //Account variables
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [conPass, setConPass] = React.useState('');   //Confirm password

  const registerAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !conPass) {
      alert("All fields are required!");
      return;
    }

    if (password !== conPass) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      //API call to register endpoint
      const response = await axios.post("http://localhost:5000/api/accounts/register", {
        email,
        password
      });

      alert(response.data.message || 'Registration successful.');

      //Stores token and then navigates to the "My Account" page
      //localStorage.setItem("token", response.data.jwt);
      navigate("/my-account");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Registration failed:', error.message);
        alert(error.message || 'Registration failed. Please try again.');
      } else {
        console.error("An unknown error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigate("/login-page");
  };

  return (
    <div>
      <h1>Create Account</h1>

      <form onSubmit={registerAccount}>
        <div>
          <label htmlFor="email"><b>Email</b></label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          >
          </input>
        </div>

        <div>
          <label htmlFor="psw"><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            id="psw"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          >
          </input>
        </div>

        <div>
          <label htmlFor="psw-confirm"><b>Confirm Password</b></label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="psw-confirm"
            id="psw-confirm"
            value={conPass}
            onChange={(e) => setConPass(e.target.value)}
            required
          >
          </input>
        </div>


        {/*<button onClick={goToAccount}> Register </button>*/}
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default CreateAccountPage;
