import { Route, Routes } from 'react-router'
import './App.css'
import CreateAccountPage from './pages/create-account'
import LoginPage from './pages/login'
import MainLayout from './pages/main/main-layout'
import TimeTrackerPage from './pages/main/time-tracker'
import MyAccountPage from './pages/main/my-account'
import ProjectsPage from './pages/main/admin/projects'
import ForgotPassword from './pages/password/forgot-pw'
import ConfirmResetPassword from './pages/password/confirm-reset'

function App() {

  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="create-account" element={<CreateAccountPage />} />

      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ConfirmResetPassword />} />

      <Route element={<MainLayout />}>
        <Route path="time-tracker" element={<TimeTrackerPage />} />

        <Route path="my-account" element={<MyAccountPage />}></Route>

        <Route path="projects" element={<ProjectsPage />} />
      </Route>
    </Routes>
  )
}

export default App
