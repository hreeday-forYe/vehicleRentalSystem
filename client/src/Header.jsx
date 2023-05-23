import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext"
// import Dropdown from "./Dropdown";
export default function Header() {
  const { user } = useContext(UserContext);
  return (
   
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to={'/'} className="flex title-font font-medium items-center text-black mb-4 md:mb-0">
          <ion-icon name="car-sport" size="large"></ion-icon>
          <span className="ml-3 text-xl">VRS</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex  font-medium  flex-wrap items-center text-base justify-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
          <Link to={"/"} className="cursor-pointer mr-5 hover:text-black">Home</Link>
          <Link to={"/about"} className="cursor-pointer  mr-5 hover:text-black">About</Link>
          <Link to={"/show-vehicles"} className="cursor-pointer  mr-5 hover:text-black">Vehicles</Link>
          <Link to={"/contact"} className="cursor-pointer  mr-5 hover:text-black">Contact</Link>
          
        </nav>
        <div >
        {/* <Search/> */}
        </div>
        <Link to={user ? "/account" : "/register"} className="inline-flex items-center bg-white-200 shadow-md shadow-gray-300 rounded-xl text-black border-0 py-1 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <div className='bg-gray-500 mr-2 text-white rounded-full border border-gray-500 overflow-hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </div>
          {/* <Dropdown/> */}
          {
            !!user && (
              <div>
                {user.name}
              </div>
            )
          }
        </Link>
      </div>
    </header>





  )
}




// <header className='flex justify-between'>
// <Link to={'/'} className='flex items-center gap-1'>
//   {/*----------------------- SOME ICONS------------------ */}
//   <ion-icon name="car-sport" size="large"></ion-icon>
//   <span className='font-bold text-xl'>VRS</span>
// </Link>
// {/* -----------------------Navigation Bar Section-------------------------------------- */}
// <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
//   <Link href="/">Home</Link>
//   <Link className='border-l border-gray-300'></Link>
//   <Link href="#vehicles">Services</Link>
//   <Link className='border-l border-gray-300'></Link>
//   <Link href="#contact">Contact</Link>
//   <button className='bg-primary text-white p-1 w-15 h-15 rounded-3xl'>
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
//     </svg>
//   </button>
// </div>
// {/*----------------------------------- User profile --------------------------*/}
// <Link to={user?"/account":"/login"} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 '>
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//   </svg>
//   <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
//       <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
//     </svg>
//   </div>
//   {
//     !!user && (
//       <div>
//         {user.name}
//       </div>
//     )
//   }
// </Link>

// </header> 


    