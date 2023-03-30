import axios from 'axios'
import { useEffect, useState } from 'react'
import car from '../assets/car.jpg'
export default function IndexPage() {
  const [vehicles, setVehicles] = useState([])
  useEffect(() => {
    axios.get('/vehicles').then(response => {
      setVehicles([...response.data, ...response.data, ...response.data]);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between border mx-20 mt-12">
        <div className="w-1/2 flex flex-col items-start px-8 py-12">
          <h1 className="text-4xl font-bold  mb-6">
            Welcome to VRS
          </h1>
          <p className=" text-justify mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
            ultrices velit, sed molestie justo facilisis eu. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, blanditiis harum. Facilis veritatis reiciendis at dolorum! Iste, dolorem placeat sequi harum ab est? Repellendus explicabo dolorem amet veritatis iure laudantium?
          </p>
          <p className='mb-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse consequuntur tempore voluptates cumque numquam placeat veniam.</p>
          <a href="#vehicles" className="bg-primary cursor-pointer smooth-scroll-true hover:bg-green-700 text-white py-2 px-4 rounded">
            View Vehicles
          </a>
        </div>
        <div className="w-1/2 flex items-center justify-center p-4">
          <img src={car} alt="" />
        </div>
      </div>
      {/* Below the landing page button */}
      <div id='vehicles'>
        <div className='mx-16 mt-32'>
          <h1 className='font-bold text-center text-4xl text-black-200'>Available Vehicles</h1>
        </div>
        <div className='grid gap-x-8 gap-y-12 grid-cols-2 md:grid-cols-3 cursor-pointer mt-12'>
          {vehicles.length > 0 && vehicles.map(vehicle => (
            <div>
              <div className='bg-gray-500 rounded-2xl flex mb-2'>
                {vehicle.photos?.[0] && (
                  <img className='rounded-2xl aspect-square object-cover' src={'http://localhost:4000/uploads/' + vehicle.photos?.[0]} alt="" />
                )}
              </div>
              <h2 className='text-md font-bold leading-4'>{vehicle.title}</h2>
              <p className='truncate text-gray-500'>{vehicle.description}</p>
              <div>
                <div className='mt-1 flex gap-4'>
                  <p>
                    <span className='font-bold'>Rs.{vehicle.price}</span> per day
                  </p>
                  <p>
                    <span className='text-gray-700 font-semibold hover:text-black'>Available Till:</span> {vehicle.RentTill}
                  </p>
                </div>
                <p> <span className='font-semibold'>Contact:</span> {vehicle.phoneNumber}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* below the vehicle view page */}
      <section className='mt-12 mx-16'>
        <h1 className='font-bold text-center text-4xl text-black-200'>Contact Us</h1>
        <div className='mt-12 flex gap-7 justify-around  bg-gray-100 p-12 rounded-3xl'>
          <div className='w-2/5'>
            <strong className= 'mb-4'>Location:</strong>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.168153970628!2d85.3285774150018!3d27.71209398278997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb196de5da5741%3A0x652792640c70ede9!2sHerald%20College%20Kathmandu!5e0!3m2!1sen!2snp!4v1680146822929!5m2!1sen!2snp" width="400" height="300" style={{ border: '0' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>

          <div className='border w-1/2 flex gap-2 p-8'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /> 
            </svg>
            <p>heralcollegeEdu.np.com</p> 

          </div>
        </div>
      </section>
    </div>
  )
}
