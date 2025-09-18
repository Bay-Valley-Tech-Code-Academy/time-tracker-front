import { useNavigate } from "react-router";

const MyAccountPage = () => {
  const navigate = useNavigate();

  const goLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFD9]">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-[#FCAE49] text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">My Account Page!</h1>

        <button
          type="button"
          onClick={goLogout}
          className="px-6 py-2 rounded-md bg-[#FF5531] text-white font-semibold shadow-md hover:bg-[#e14a28] disabled:opacity-50"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default MyAccountPage;
