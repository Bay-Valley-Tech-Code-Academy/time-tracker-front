import { useNavigate } from "react-router";

const MyAccountPage = () => {
  const navigate = useNavigate();

  const goLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1>My Account Page!</h1>

      <button
        type="button"
        onClick={goLogout}
        className="navbar-logout-button"
      >
      Log Out
      </button>
    </div>
  );
};

export default MyAccountPage;
