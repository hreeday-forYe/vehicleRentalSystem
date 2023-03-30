import axios from "axios";
import { useContext, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { UserContext } from "../UserContext"
import VehiclesPage from "./VehiclesPage";

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
    setRedirect('/');
    alert("You have logged out Successfully")
    setUser(null);
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
      <AccountNav/>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === "vehicles" && (
        <div>
          <VehiclesPage />
        </div>
      )}
    </div>
  )
}