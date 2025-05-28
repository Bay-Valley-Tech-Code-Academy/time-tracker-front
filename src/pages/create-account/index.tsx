import { Link } from "react-router";

const CreateAccountPage = () => {
  return (
    <div>
      <h1>Create Account</h1>

      {/* 
      <Link to="/login-page">
        Login Page
      </Link>*/}

      <label htmlFor="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" id="email" required></input>

      <label htmlFor="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" id="psw" required></input>

      <label htmlFor="psw-confirm"><b>Confirm Password</b></label>
      <input type="password" placeholder="Confirm Password" name="psw-confirm" id="psw-confirm" required></input>

      <button> Register </button>

    </div>
  );
};

export default CreateAccountPage;
