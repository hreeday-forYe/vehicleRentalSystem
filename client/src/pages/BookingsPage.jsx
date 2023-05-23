import { useEffect, useState } from 'react'
import AccountNav from '../AccountNav'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import VehicleImg from '../VehicleImg'
export default function BookingsPage() {
  const [bookings, setBookings] = useState([])
  
  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`/bookings/${id}`);
      alert('Booking cancelled successfully');
    } catch (error) {
      console.error(error);
      alert('Error cancelling booking');
    }
  };
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/bookings');
        setBookings(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookings();
  }, [bookings])
  return (<div>
    <AccountNav />
    <div className='mt-4 mx-16 h-auto'>
      {bookings?.length > 0 && bookings.map(booking => (
        <div className="relative flex mt-4 w-full max-w-[80rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <Link to={'/account/bookings/' + booking._id} className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
            <VehicleImg vehicle={booking.vehicle} />
          </Link>
          <div className="p-6">
            <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-primary antialiased">
              {booking.vehicle.brand}
            </h6>
            <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {booking.vehicle.title}
            </h4>
            <p className="mb-4 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              {booking.vehicle.description}
            </p>
            <p className="mb-3 block font-sans flex gap-2 text-base font-medium leading-relaxed text-primary antialiased">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>
              Rented From: {format(new Date(booking.rentDate), 'yyyy-MM-dd')} 
              &nbsp; &nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg> 
              Rented Till: {format(new Date(booking.rentTill), 'yyyy-MM-dd')}

            </p>
            <p className="mb-4 block font-sans flex gap-2 text-base font-medium leading-relaxed text-primary antialiased">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>


              Total Price: Rs.{booking.price}

            </p>

            <a className="inline-block" href="#">
              <button className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-red-600 transition-all hover:bg-red-600/10 active:bg-primary-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" 
              onClick={() => handleDelete(booking._id)}>
                Cancel Booking
                <ion-icon name="trash-bin" size="medium"></ion-icon>
              </button>
            </a>
          </div>
        </div>

      ))}
    </div>
  </div>)
}