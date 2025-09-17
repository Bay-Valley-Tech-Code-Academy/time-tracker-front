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
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || 'Invalid email or password. Please try again!';
        console.error("Login failed:", errorMessage);
        alert(errorMessage);
      } else {
        console.error("An unknown error occurred:", error);
        alert("An unknown error occurred during login process!");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFD9]">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-[#FCAE49]">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login Page</h1>

        <form onSubmit={submitLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium text-gray-900 mb-1">
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 bg-[#A1A1A1] text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF5531]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium text-gray-900 mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 bg-[#A1A1A1] text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF5531]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-md bg-[#FF5531] text-white font-semibold shadow-md hover:bg-[#e14a28] disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
