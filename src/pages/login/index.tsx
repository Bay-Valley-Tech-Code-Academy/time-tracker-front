import { Link } from "react-router";

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>

      <Link to="/create-account">
        Go to create account page
      </Link>

      <Link to="/time-tracker">
        Log In
      </Link>
    </div>
  );
};

export default LoginPage;
