import navbarLogoHome from "../../../assets/navbar-icons/navbar-logo-home.png";
import navbarMyAccount from "../../../assets/navbar-icons/navbar-my-account.png";
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
          
      <Link to="/my-account">
        <div className="navbar-right">
          <img src={navbarMyAccount} alt="my account" className="navbar-right-icon" />
          <span className="navbar-text">My Workspace</span>
        </div>
      </Link>

      <Link to="/projects">
        <div className="navbar-right">
          <span className="navbar-text">Projects</span>
        </div>
      </Link>

      <Link to="/create-account">
        <div className="navbar-right">
          <span className="navbar-text">Sign Up</span>
        </div>
      </Link>

    </nav>
  )
}

export default Navbar;
