import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"
export default function RegisterPage() {
  // Create react states for our inputs 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Function which will be called when the form is submitted
  async function registerUser(ev){
    ev.preventDefault(); // this will make sure when on submit our page will not be reloaded
    try{
      await axios.post('/register',{
        name,
        email,
        password,
      });
      alert("Registration Successful You can login now")
    }catch(e){
      alert("Registration Failed try again later")
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-48">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text" placeholder="John Doe"
            value={name}
            onChange={ev => setName(ev.target.value)} />
          {/* End of name input */}
          <input type="email" placeholder="johndoe@gmail.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)} />
          {/* End of Email Input */}
          <input type="password" placeholder="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)} />
          {/* End of password */}
          <button className="primary">Register</button>
          {/* Section has the bottom of the Register page */}
          <div className="text-center py-2 text-gray-500">
            Have an Account? <Link to={"/login"} className="underline text-black">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}