import { useContext, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {
//  State for inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setredirect] = useState(false);
  const [adminRedirect, setAdminRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
//   const history = useHistory();
  const navigate = useNavigate();
  async function handleLoginSubmit(ev){
    ev.preventDefault();
    try{
      const {data} = await axios.post('/login',{email, password});
      if (data === "not found") {
        alert("User not found")
      }else{
          setUser(data);
          if(data.role == 0){
            alert("Welcome Admin");
            setAdminRedirect(true)
          }else{
              alert("login Success");
              setredirect(true)
          }
      }
        
    }catch{
      alert("login failed");
    }
  }

  if (redirect){
    return <Navigate to ={'/'} />
  }
  if (adminRedirect){
    return <Navigate to ={'/dashboard'} />
  }
  return (    
          <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
              <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
                  <div className="text-center">
                      <ion-icon name="car-sport" size="large"></ion-icon>
                      <div className="mt-5 space-y-2">
                          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                          <p className="">Don't have an account? <Link to={'/register'} href="javascript:void(0)" className="font-medium text-primary hover:text-indigo-500">Sign up</Link></p>
                      </div>
                  </div>
                  <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">

                      
                      <form
                          onSubmit={handleLoginSubmit}
                          className="space-y-5"
                      >
                          <div>
                              <label className="font-medium">
                                  Email
                              </label>
                              <input
                                  type="email"
                                  required
                                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                  onChange={ev=>setEmail(ev.target.value)} 
                              />
                          </div>
                          <div>
                              <label className="font-medium">
                                  Password
                              </label>
                              <input
                                  type="password"
                                  required
                                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                  onChange={ev=>setPassword(ev.target.value)}
                              />
                          </div>
                          <button
                              className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-indigo-900 active:bg-indigo-600 rounded-lg duration-150"
                          >
                              Sign in
                          </button>
                      </form>
                  </div>
                  <div className="text-center">
                      {/* <a href="javascript:void(0)" className="hover:text-indigo-600">Forgot password?</a> */}
                  </div>
              </div>
          </main>
      
  )
}
    // <div className="mt-4 grow flex items-center justify-around">
    //   <div className= "mb-48">
    //     <h1 className="text-4xl text-center mb-4">Login</h1>
    //     <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
    //       <input type="email" 
    //       placeholder="johndoe@gmail.com" 
    //       value={email} 
    //       onChange={ev=>setEmail(ev.target.value)} />
    //       <input type="password" 
    //       placeholder="password"
    //       value={password}
    //       onChange={ev=>setPassword(ev.target.value)} />
    //       <button className="primary">Login</button>
    //       <div className="text-center py-2 text-gray-500">
    //         Don't have an Account? <Link to={"/register"} className="underline text-black">Register Now</Link>
    //       </div>
    //     </form>
    //   </div>
    // </div>