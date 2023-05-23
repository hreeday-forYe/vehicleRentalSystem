import axios from "axios";
import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
export default function RegisterPage() {
  // Create react states for our inputs 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [redirect, setredirect] = useState(false);
  // Function which will be called when the form is submitted
  async function registerUser(ev){
    ev.preventDefault(); // this will make sure when on submit our page will not be reloaded
    try{
      await axios.post('/register',{
        name,
        email,
        password,
        phone,
        address
      });
      alert("Registration Successful You can login now");
      setredirect(true)
    }catch(e){
      alert("Registration Failed try again later")
    }
  }
  if (redirect){
    return <Navigate to ={'/login'} />
  }
  return (
    
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
    <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
            <div className="mt-5 space-y-2">
                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Create an Account</h3>
                <p className="">Already have an account? <Link to={'/login'} href="javascript:void(0)" className="font-medium text-primary hover:text-indigo-500">Sign In</Link></p>
            </div>
        </div>
        <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">

            
            <form
                onSubmit={registerUser}
                className="space-y-5"
            >
                <div>
                    <label className="font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        value={name}
                        onChange={ev=>setName(ev.target.value)} 
                    />
                </div>
                <div>
                    <label className="font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        value={email}
                        onChange={ev=>setEmail(ev.target.value)}
                    />
                </div>
                <div>
                    <label className="font-medium">
                        Phone
                    </label>
                    <input
                        type="tel"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        value={phone}
                        onChange={ev=>setPhone(ev.target.value)}
                    />
                </div>
                <div>
                    <label className="font-medium">
                        Address
                    </label>
                    <input
                        type="tel"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        value={address}
                        onChange={ev=>setAddress(ev.target.value)}
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
                        value={password}
                        onChange={ev=>setPassword(ev.target.value)}
                    />
                </div>
                <button
                    className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-indigo-900 active:bg-indigo-600 rounded-lg duration-150"
                >
                    Sign Up
                </button>
            </form>
        </div>
    </div>
</main>
  )
}
    // <div className="mt-4 grow flex items-center justify-around">
    //   <div className="mb-48">
    //     <h1 className="text-4xl text-center mb-4">Register</h1>
    //     <form className="max-w-md mx-auto" onSubmit={registerUser}>
    //       <input type="text" placeholder="John Doe"
    //         value={name}
    //         onChange={ev => setName(ev.target.value)} />
    //       {/* End of name input */}
    //       <input type="email" placeholder="johndoe@gmail.com"
    //         value={email}
    //         onChange={ev => setEmail(ev.target.value)} />
    //       {/* End of Email Input */}
    //       <input type="password" placeholder="password"
    //         value={password}
    //         onChange={ev => setPassword(ev.target.value)} />
    //       {/* End of password */}
    //       <button className="primary">Register</button>
    //       {/* Section has the bottom of the Register page */}
    //       <div className="text-center py-2 text-gray-500">
    //         Have an Account? <Link to={"/login"} className="underline text-black">Login</Link>
    //       </div>
    //     </form>
    //   </div>
    // </div>