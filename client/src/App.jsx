import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { UserContextProvider } from './UserContext'
import VehiclesPage from './pages/VehiclesPage'
import VechiclesFormPage from './pages/VehiclesFormPage'
import ProfilePage from './pages/ProfilePage'
import VehiclePage from './pages/VehiclePage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ShowVehicles from './ShowVehicles'
import Dashboard from './Dashboard'
axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider> 
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/show-vehicles" element={<ShowVehicles />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/" element={<ProfilePage />} />
          <Route path="/account/vehicles" element={<VehiclesPage/>} />
          <Route path="/account/vehicles/new" element={<VechiclesFormPage />} />
          <Route path="/account/vehicles/:id" element={<VechiclesFormPage />} />
          <Route path='/vehicle/:id' element={<VehiclePage />}></Route>
          <Route path='/account/bookings' element={<BookingsPage />}></Route>
          <Route path='/account/bookings/:id' element={<BookingPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
   
  )
}

export default App
