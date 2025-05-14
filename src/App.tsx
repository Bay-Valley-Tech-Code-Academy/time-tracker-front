import { Route, Routes } from 'react-router'
import './App.css'
import CreateAccountPage from './pages/create-account'
import LoginPage from './pages/login'
import MainLayout from './pages/main/main-layout'
import TimeTrackerPage from './pages/main/time-tracker'

function App() {

  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="create-account" element={<CreateAccountPage />} />

      <Route element={<MainLayout />}>
        <Route path="time-tracker" element={<TimeTrackerPage />} />
      </Route>
    </Routes>
  )
}

export default App
