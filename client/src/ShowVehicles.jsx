import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ShowVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [sortingOption, setSortingOption] = useState(['random']);
  

  // sorting the vehicles
  const sortVehicles = () => {
    switch(sortingOption) {
      case 'highest-to-lowest':
        setVehicles([...vehicles].sort((a, b) => b.price - a.price));
        break;
      case 'lowest-to-highest':
        setVehicles([...vehicles].sort((a, b) => a.price - b.price));
        break;
      default:
        // if the option is 'random' or unknown, do not sort the vehicles
        break;
    }
  };


// Function to handle the select input change values
const handleSelectChange = (event) => {
  setSortingOption(event.target.value);
};

// use Effect for sorting Vehicles
  useEffect(() => {
    sortVehicles();
  }, [sortingOption]);


// use effect for displaying the vehicles
useEffect(() => {
  axios.get('/vehicles').then(response => {
    setVehicles([...response.data]);
  });
}, []);
  return (
    <div>
      <h1 className='text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest text-center'>View Vehicles</h1>
      <div className='w-80'>
        <select id="countries" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleSelectChange}>
          <option value="random">Random</option>
          <option value="highest-to-lowest">Highest to Lowest</option>
          <option value="lowest-to-highest">Lowest to Highest</option>
        </select>

      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {/* Single vehicle card */}
            {vehicles.length > 0 && vehicles.map(vehicle => (

              <Link to={'/vehicle/' + vehicle._id} className="lg:w-1/3 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={'http://localhost:4000/uploads/' + vehicle.photos?.[0]} />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{vehicle.brand}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{vehicle.title}</h2>
                  <p className="mt-1">Rs.{vehicle.price}</p>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>
    </div>
  )
}

export default ShowVehicles;