import React from 'react'
import Carousel from './Carousel'
import Footer from "./Footer"
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
// import { useContext, useState } from "react"
import axios from 'axios'
const Dashboard = () => {
  const [vehicles, setVehicles] = useState([])
  const [users, setUsers] = useState([])
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    axios.get('/vehicles').then(response => {
      setVehicles([...response.data]);
    });
  }, [vehicles]);
  useEffect(() => {
    axios.get('/users').then(response => {
      setUsers([...response.data]);
    });
  }, [users]);
  useEffect(() => {
    axios.get('/all-bookings').then(response => {
      setBookings([...response.data]);
    });
  }, [bookings]);
  
  return (
    <>
      {/* component */}
      {/* This is an example component */}
      <div>
        <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                  <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <svg id="toggleSidebarMobileClose" className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <a href="#" className="text-xl font-bold flex items-center gap-1 lg:ml-2.5">
                  <ion-icon name="car-sport" size="large"></ion-icon>
                  <span className="self-center whitespace-nowrap">VRS</span>
                </a>
              </div>
              <div className="flex items-center">
                <div className="hidden lg:flex items-center">
                  <span className="text-base font-normal text-gray-500 mr-5">Welcome, Admin </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex overflow-hidden bg-white pt-16">
          <aside id="sidebar" className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
            <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex-1 px-3 bg-white divide-y space-y-1">
                  <ul className="space-y-2 pb-2">
                    <li>
                      <a href="#" className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
                        <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                        </svg>
                        <span className="ml-3">Dashboard</span>
                      </a>
                    </li>
                  </ul>
                  <div className="space-y-2 pt-2">
                    <Link to="/"  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                      </svg>
                      <span className="ml-4">Home</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop" />
          <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
            <main>
              <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{vehicles.length}</span>
                      <h3 className="text-base font-normal text-gray-500">Vehicles in VRS</h3>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{users.length}</span>
                      <h3 className="text-base font-normal text-gray-500">Users in VRS</h3>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{bookings.length}</span>
                      <h3 className="text-base font-normal text-gray-500">Bookings in VRS</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6 px-4">

                <div class="relative overflow-x-auto">
                  <h3 className="text-xl font-bold leading-none text-gray-900">Latest Bookings</h3>
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-md text-gray-900 uppercase bg-white  dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Vehicles
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Booked by
                        </th>
                        <th scope="col" class="px-6 py-3">
                          price
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Commission
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                      <tr class="bg-white border-b text-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {booking.vehicle.title}
                        </th>
                        <td class="px-6 py-4">
                          {booking.user.name}
                        </td>
                        <td class="px-6 py-4">
                          Rs.{booking.price}
                        </td>
                        <td class="px-6 py-4">
                          Rs.{(booking.price * 10)/100 }
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                  <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold leading-none text-gray-900">Latest Users</h3>
                    </div>
                    <span className="text-base font-normal text-gray-500">The  list of the users in VRS</span>
                    <div className="flow-root">
                      <ul role="list" className="divide-y divide-gray-200">
                        {users.length > 0 && users.map(user => (
                          <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {user.name}
                                </p>
                                <p className="text-sm text-gray-500 truncate  border-bottom">
                                  <a href="#" className="__cf_email__" data-cfemail="17727a767e7b57607e7973646372653974787a">{user.email}</a>
                                  <br />
                                  <a href="#" className="__cf_email__" data-cfemail="17727a767e7b57607e7973646372653974787a">{(user.role == 1) ? "Customer|Seller" : "Admin"}</a>
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">Total Vehicles</h3>
                    <span className="text-base font-normal text-gray-500">The  list of the Total Vehicles in VRS</span>
                    <div className="block w-full overflow-x-auto">
                      <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                          {vehicles.length > 0 && vehicles.map(vehicle => (
                            <tr>
                              <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-md font-semibold text-left  border-l-0 border-r-0 whitespace-nowrap">{vehicle.title}</th>
                            </tr>
                          ))}
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard