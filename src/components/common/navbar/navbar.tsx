import navbarLogoHome from "../../../assets/navbar-icons/navbar-logo-home.png";
import navbarMyAccount from "../../../assets/navbar-icons/navbar-logo-home.png";
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
          
      <div className="navbar-workspace">My Workspace</div>
      <Link to="/my-account">
        <div className="navbar-right">
          <img src={navbarMyAccount} alt="my account" className="navbar-right-icon" />
        </div>
      </Link>
    </nav>
  )
}

export default Navbar;
