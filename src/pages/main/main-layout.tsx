import { Outlet } from "react-router"
import Navbar from "../../components/common/navbar/navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />

      <div>
        <div>
          <p>Sidemenu!</p>
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout;
