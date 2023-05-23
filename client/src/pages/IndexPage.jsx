import axios from 'axios'
import { useEffect, useState } from 'react'
import car from '../assets/car.jpg'
import { Link } from 'react-router-dom'
import ContactPage from './ContactPage'
// import AboutPage from './AboutPage'
import AboutSection from '../AboutSection'
import Footer from '../Footer'
import ShowVehicles from '../ShowVehicles'
export default function IndexPage() {
  const [vehicles, setVehicles] = useState([])
  useEffect(() => {
    axios.get('/vehicles').then(response => {
      setVehicles([...response.data, ...response.data]);
    });
  }, []);

  return (
    <div>

<section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Rent Your Own Vehicle
        <br className="hidden lg:inline-block" />Before They are Gone
      </h1>
      <p className="mb-8 leading-relaxed">Welcome to our Vehicle Rental System, where you can rent the perfect vehicle for your next adventure. Whether you're planning a road trip with friends or need a reliable car for your daily commute, our system has you covered. With a wide range of vehicles to choose from, including cars, SUVs and Bikes. you're sure to find the perfect fit for your needs. Our user-friendly platform allows you to easily search and book your desired vehicle, while our competitive pricing ensures that you get the best value for your money. Plus, our top-notch customer service team is always ready to assist you with any questions or concerns you may have. Start your journey with us today and experience the convenience and reliability of our Vehicle Rental System. </p>
      <div className="flex justify-center">
        <Link to={'/show-vehicles'} className="inline-flex text-white bg-primary  border-0 py-2 px-6 focus:outline-none hover:bg-indigo-900 rounded text-lg">View Vehicles</Link>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img className="object-cover object-center rounded" alt="hero" src={car} />
    </div>
  </div>
</section>

      {/* About us section */}
     <AboutSection/>
      {/* Below the about us Section */}
    
    <ShowVehicles/>

      {/* Contact US page */}
        <ContactPage />
    </div>
  )
}




// <div id='vehicles'>
//         <div className='mx-16 mt-32'>
//           <h1 className='font-bold text-center text-4xl text-black-200'>Available Vehicles</h1>
//         </div>
//         <div className='grid gap-x-8 gap-y-12 grid-cols-2 md:grid-cols-3 cursor-pointer mt-12'>
//           {vehicles.length > 0 && vehicles.map(vehicle => (
//             // Creating a link for each vehicles
//             <Link to={'/vehicle/' + vehicle._id}>
//               <div className='bg-gray-500 rounded-2xl flex mb-2'>
//                 {vehicle.photos?.[0] && (
//                   <img className='rounded-2xl aspect-square object-cover' src={'http://localhost:4000/uploads/' + vehicle.photos?.[0]} alt="" />
//                 )}
//               </div>
//               <h2 className='text-md font-bold leading-4'>{vehicle.title}</h2>
//               <p className='truncate text-gray-500'>{vehicle.description}</p>
//               <div>
//                 <div className='mt-1 flex gap-4'>
//                   <p>
//                     <span className='font-bold'>Rs.{vehicle.price}</span> per day
//                   </p>
//                   <p>
//                     <span className='text-gray-700 font-semibold hover:text-black'>Available Till:</span> {vehicle.RentTill}
//                   </p>
//                 </div>
//                 <p> <span className='text-gray-500'>see more.. </span></p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>