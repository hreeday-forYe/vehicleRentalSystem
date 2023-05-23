import React, { useContext, useEffect } from 'react'
import { DatePicker, Space, Modal, Button } from 'antd';
import { useState } from 'react';
const { RangePicker } = DatePicker;
import { differenceInCalendarDays } from "date-fns"
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import paymentImg from "./assets/payment.png"

const BookingWidget = ({ vehicle }) => {
  console.log(vehicle)
  const [rentDate, setRentDate] = useState();
  const [rentTill, setRentTill] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [price, setPrice] = useState();
  let [payment, setPayment] = useState();
  const [redirect, setredirect] = useState('');
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    alert("Payment was successfull");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    alert("Payment has been cancelled");
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (user) {
      setName(user.name)
      setPhone(user.phone)
    }
  }, [user])
  // Date Picker function
  const onCalendarChange = (dates, dateStrings) => {
    console.log("the date strings ", dateStrings);
    console.log("The dates array is ", dates);
    setRentDate(dateStrings[0]);
    setRentTill(dateStrings[1]);
  };

  console.log(payment) // displaying to check 

  let numberOfDays = 0;
  if (rentDate && rentTill) {
    numberOfDays = differenceInCalendarDays(new Date(rentTill), new Date(rentDate));
  }

  async function handleBooking() {
    // const data = 
    const response = await axios.post('/bookings', { rentDate, rentTill, name, phone, vehicle: vehicle._id, price: numberOfDays * vehicle.price, payment });
    console.log(response)
    const bookingId = response.data._id;
    setredirect("/account/bookings/");
    alert("Booking successfull")
  }

  function handlePayment() {
    alert("Your payment was successfull")
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }


  return (
    <>
      <div className=" flex flex-col bg-white shadow-md shadow-gray-300 rounded-2xl p-4 gap-3">
        <span className="title-font font-medium text-2xl text-gray-700">Rs.{vehicle.price} <span className="text-md font-normal">per day</span></span>
        {/* <br /> */}
        <div className="my-2 bg-gray-50 shadow-md flex flex-col gap-3 shadow-gray-300 border py-2 px-2 rounded-2xl">
          <RangePicker placeholder={["Rent From", "Rent Till"]} onCalendarChange={onCalendarChange}
            style={{
              height: "33px",
              width: "100%",
              fontSize: '22px',
              marginTop: "7px",
              borderRadius: "10px"
            }}
          />
          <input type="text" placeholder="Full Name: " className="border " value={name}  required onChange={ev => setName(ev.target.value)} />
          <input type="tel" placeholder="Phone Number: " className="border" value={phone} required onChange={ev => setPhone(ev.target.value)} />
          <div>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 px-2">Choose Payment Option</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue="{Cash}" value={payment} onChange={e => setPayment(e.target.value)} required>
              <option value="Cash">Cash</option>
              <option value="Bank">Bank Transaction</option>
              <option value="Wallets">Wallets</option>
            </select>
            <Button type="primary" className='bg-primary text-white mt-4 hover:bg-indigo-900 ' onClick={showModal}>
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg> */}
              Pay Now
            </Button>
            <Modal title="QR Payment" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
              okButtonProps={{ className: 'bg-primary text-white hover:bg-green-500 hover:text-white' }}
              cancelButtonProps={{ className: 'bg-red-600 text-white  hover:bg-red-500 hover:text-white' }}
            >
              <img src={paymentImg} alt="Qr Image" className='' />
              
            </Modal>
          </div>

        </div>
        <div>{numberOfDays > 0 && (
          <span className=''>Total Price: Rs. {numberOfDays * vehicle.price} <br /></span>
        )}
        </div>
        {/* {setPrice(numberOfDays*vehicle.price)} */}

        <button className="text-white bg-primary border-0 py-2 px-6  rounded-2xl hover:bg-indigo-900" onClick={handleBooking}>
          Book Now
        </button>
      </div>
    </>
  )
}

export default BookingWidget