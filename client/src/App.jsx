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

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider> 
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/" element={<ProfilePage />} />
          <Route path="/account/vehicles" element={<VehiclesPage />} />
          <Route path="/account/vehicles/new" element={<VechiclesFormPage />} />
          <Route path="/account/vehicles/:id" element={<VechiclesFormPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
   
  )
}

export default App