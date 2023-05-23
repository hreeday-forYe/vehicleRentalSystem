import axios from "axios";
import { useContext, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { UserContext } from "../UserContext"
import VehiclesPage from "./VehiclesPage";
import Cookies from 'js-cookie';
// import { withCookies, Cookies } from 'react-cookie';
export default function AccountPage() {
  let { subpage } = useParams();
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  // subpage which is undefined is profile
  if (subpage == undefined) {
    subpage = 'profile'
  }
  console.log(subpage)
  if (!ready) {
    return "Loading...";
  }


  async function logout() {
    await axios.post('/logout');
    Cookies.remove('token');
    setUser(null);
    setRedirect('/');
    alert("You have logged out Successfully");
  }

  // setting the redirect route
  if (redirect) {
    return <Navigate to={redirect}></Navigate>
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />
  }
  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto w-90">


          <div className="max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                User Information
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.name}
                  </dd>
                </div>
                <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.email}
                  </dd>
                </div>
                <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.address}
                  </dd>
                </div>
                <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Contact Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.phone}
                  </dd>
                </div>
                <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Role
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.role === 1 ? "Customer | Renter" : "Admin"}
                  </dd>
                </div>
                {user?.role == 0 &&
                <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <>
                  <dt className="text-sm font-medium text-gray-500">
                    Dashboard
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0  sm:col-span-2">
                    <Link to={'/dashboard'} className="bg-primary p-3 hover:bg-indigo-900 text-white rounded-md sm:mt-4" target="_blank">Visit</Link>
                  </dd>
                  </>
                </div>
                }
              </dl>
            </div>
          </div>

          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === "vehicles" && (
        <div>
          <VehiclesPage />
        </div>
      )}


      {/* <Sidebar/> */}
    </div>
  )
}