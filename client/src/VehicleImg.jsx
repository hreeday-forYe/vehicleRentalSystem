import React from 'react'

const VehicleImg = ({vehicle, index=0}) => {
  if(!vehicle.photos?.length){
    return "";
  }
  return (
      <img src={'http://localhost:4000/uploads/'+vehicle.photos[index]} alt="image" className="h-full w-full object-cover" />

  )
}

export default VehicleImg