import { Outlet } from "react-router"

const MainLayout = () => {
  return (
    <div>
      <nav>Navbar!</nav>

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
