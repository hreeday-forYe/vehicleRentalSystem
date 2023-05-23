import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import VehicleImg from "../VehicleImg";

export default function VehiclesPage() {
  const [vehicles, setvehicles] = useState([]);
  // const [data, setData] = useState([])

  

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const val = prompt("Do you want to delete this vehicle? (yes/no)")
      if (val =="yes") {
        await axios.delete(`/vehicles/${id}`);
        alert('Vehicle Removed Successfully');
      }
      else{
        alert("Vehicle was not Removed");
      }
    } catch (error) {
      console.error(error);
      alert('Error cancelling booking');
    }
  };

  useEffect(() => {
    axios.get('/user-vehicles').then(({ data }) => {
      setvehicles(data)
    });
  }, [vehicles]);
   
  

  return (
    <div>
      <AccountNav />

      <div className="text-center h-full">

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
          
          <div className="relative flex mt-4 w-full max-w-[80rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <Link to={'/account/vehicles/'+vehicle._id}  className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
              {/* {vehicles.photos.length > 0 && (
              <img src={'http://localhost:4000/uploads/'+vehicle.photos[0]} alt="image" className="h-full w-full object-cover" />
              )} */}
              <VehicleImg vehicle= {vehicle}/>
            </Link>
            <div className="p-6">
              <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-primary antialiased">
                {vehicle.brand}
              </h6>
              <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                {vehicle.title}
              </h4>
              <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                {vehicle.description}
              </p>
              <a className="inline-block" href="#">
                <button className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-primary transition-all hover:bg-green-500/10 active:bg-primary-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={() => handleDelete(vehicle._id)}>
                  Delete
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /> 
                  </svg>

                </button>
              </a>
            </div>
          </div>




        ))}
      </div>
    </div>
  )
}



          // <Link to={'/account/vehicles/'+vehicle._id} className="flex cursor-pointer gap-2 bg-gray-200 rounded-2xl p-4 mb-4">
          // <div className=" w-1/3 bg-gray-300 mb-4 ">
          //   {vehicle.photos.length>0 &&(
          //     <img className="object-center h-full w-full" src={'http://localhost:4000/uploads/'+vehicle.photos[0]} alt="Your added image" />
          //   )}
          
          // </div>
          // <div className="pl-4 w-2/3 h-40">
          //   <h2 className="text-xl">{vehicle.title}</h2>
          //   <p className="text-sm mt-2">{vehicle.description}</p>
          //   <p className="text-sm mt-2">{vehicle.phone}</p>
          //   <button className="flex ml-auto text-white bg-red-400 border-0 py-2 px-6 focus:outline-none hover:bg-primary rounded" >Delete</button>
          // </div>
          // </Link> 