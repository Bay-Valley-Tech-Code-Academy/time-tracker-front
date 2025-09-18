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
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || 'Registration failed. Please try again.';
        console.error('Registration failed:', errorMessage);
        alert(errorMessage);
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
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFD9]">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-[#FCAE49]">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h1>

        <form onSubmit={registerAccount} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium text-gray-900 mb-1">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 bg-[#A1A1A1] text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF5531]"
            />
          </div>

          <div>
            <label htmlFor="psw" className="block font-medium text-gray-900 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              id="psw"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 bg-[#A1A1A1] text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF5531]"
            />
          </div>

          <div>
            <label htmlFor="psw-confirm" className="block font-medium text-gray-900 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="psw-confirm"
              id="psw-confirm"
              value={conPass}
              onChange={(e) => setConPass(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 bg-[#A1A1A1] text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF5531]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-md bg-[#FF5531] text-white font-semibold shadow-md hover:bg-[#e14a28] disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;
