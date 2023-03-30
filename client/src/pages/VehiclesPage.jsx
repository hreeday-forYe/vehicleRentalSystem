// import { useState } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";





export default function VehiclesPage() {
  const [vehicles, setvehicles] = useState([]);
  useEffect(() => {
    axios.get('/user-vehicles').then(({ data }) => {
      setvehicles(data)
    });
  }, [])
  return (
    <div>
      <AccountNav />

      <div className="text-center">

        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={'/account/vehicles/new'}>
          {/* Logo for our vehicles */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add new Vehicle
        </Link>
      </div>
      {/* div with list of vehicles */}
      <div className="mt-4 mx-16">
        {vehicles.length > 0 && vehicles.map(vehicle => (
          <Link to={'/account/vehicles/'+vehicle._id} className="flex cursor-pointer gap-2 bg-gray-200 rounded-2xl p-4 mb-4">
            <div className=" w-1/3 bg-gray-300 mb-4 ">
              {vehicle.photos.length>0 &&(
                <img className="object-center h-full w-full" src={'http://localhost:4000/uploads/'+vehicle.photos[0]} alt="Your added image" />
              )}
            
            </div>
            <div className="pl-4 w-2/3 h-40">
              <h2 className="text-xl">{vehicle.title}</h2>
              <p className="text-sm mt-2">{vehicle.description}</p>
              <p className="text-sm mt-2"> <span className="bold">Available Date:</span>  {vehicle.RentDate} </p>
              <p className="text-sm mt-2"> <span className="bold">Available Till:</span>  {vehicle.RentTill} </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// https://youtu.be/MpQbwtSiZ7E?t=15298