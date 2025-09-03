import navbarLogoHome from "../../../assets/navbar-icons/navbar-logo-home.png";
import navbarMyAccount from "../../../assets/navbar-icons/navbar-my-account.png";
import "../../../components/common/navbar/navbar.css";
import { Link } from "react-router";

const Navbar = () => {
  return (
      <nav className="time-tracker-navbar">
      <Link to="/time-tracker">
        <div className="time-tracker-navbar-left">
          <img src={navbarLogoHome} alt="home logo" className="navbar-left-icon" />
          <span className="navbar-logo">Logo Here</span>
        </div>
      </Link>

      <div className="navbar-right"> 
      <Link to="/my-account">
        <div>
          <img src={navbarMyAccount} alt="my account" className="navbar-right-icon" />
          <span className="navbar-text">My Workspace</span>
        </div>
      </Link>

      <Link to="/projects">
        <div>
          <span className="navbar-text">Projects</span>
        </div>
      </Link>

      <Link to="/create-account">
        <div>
          <span className="navbar-text">Sign Up</span>
        </div>
      </Link>
      </div>   

    </nav>
  )
}

export default Navbar;
