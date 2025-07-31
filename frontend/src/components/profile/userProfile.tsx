import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

// TODO Implement the EDIT PROFILE button logic
const UserProfile: React.FC = () => {
  const username = localStorage.getItem('username')

  const [userRegisteredSuspension, setUserRegisteredSuspension] = useState([])

  const API_URL = 'http://127.0.0.1:8000/api'

  useEffect( () => {
    const token = localStorage.getItem('token')
    const getUserSuspension = async () => {
      const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      })

      if (response.ok) {
            const data = await response.json()
            setUserRegisteredSuspension(data)
        //   TODO set a message alerting that the suspension has been created
      } else {
        //   TODO set a message alerting that there is a problem with registering the suspension
      }
    }
    getUserSuspension().then(r => {});
  }, [])


  return (
      <>
    <div className="min-h-screen bg-[#1a1a1a] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto bg-[#141414] p-8 rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <div className="flex gap-4">
            <Link
              to="/suspension/register"
              className="text-sm bg-[#f47920] hover:bg-orange-500 px-4 py-2 rounded font-semibold transition"
            >
              + Register Suspension
            </Link>
            <Link
              to="/profile"
              className="text-sm border border-[#f47920] text-[#f47920] hover:bg-[#f47920] hover:text-white px-4 py-2 rounded font-semibold transition"
            >
              Edit Profile
            </Link>
          </div>
        </div>
        {/* User Info */}
        <div className="flex items-center gap-6 mb-10">
          {/*<div className="w-20 h-20 bg-[#2a2a2a] rounded-full flex items-center justify-center text-2xl font-bold text-[#f47920]">*/}
          {/*  {user.fullName[0]}*/}
          {/*</div>*/}
          <div>
            <h2 className="text-xl font-semibold">{username}</h2>
            {/*<p className="text-gray-400">{user.email}</p>*/}
          </div>
        </div>

        {/* Suspension List */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#f47920]">
            Registered Suspensions
          </h3>
          {userRegisteredSuspension.length === 0 ? (
            <p className="text-gray-400">No suspensions registered yet.</p>
          ) : (
            <ul className="space-y-4">
              {userRegisteredSuspension.map((susp, index) => (
                    <li key={index} className="border border-gray-700 rounded-lg p-4 bg-[#1e1e1e] flex">
                        <Link
                            to={`/suspension/${susp.serial_number}`}
                            className="block w-full h-full p-4 hover:bg-[#2a2a2a] transition rounded-lg"
                        >

                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-lg font-medium">
                              {susp.brand} – {susp.model}
                            </p>
                            <p className="text-sm text-gray-400">
                              Serial: {susp.serial_number}
                            </p>
                          </div>
                          <div className="text-sm text-gray-400">
                            {/*TODO add last service in profile page suspension list*/}
                            {/*Last Service: {susp.lastService}*/}

                          </div>
                        </div>
                      </Link>
                                              <div className="inline-flex items-center rounded-md shadow-sm z-50">
                                                      <button
                                                          className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                                                          <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                                     stroke="currentColor" className="w-6 h-6">
                                                                  <path stroke-linecap="round" stroke-linejoin="round"
                                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                                              </svg>
                                                          </span>
                                                                                  <span className="hidden md:inline-block">Edit</span>
                                                        </button>

                                                        <Link to={`/suspension/${susp.serial_number}`}>

                                                        <button
                                                      className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border-y border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center">
                                                          <span>
                                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                                   stroke="currentColor" className="w-6 h-6">
                                                                  <path stroke-linecap="round" stroke-linejoin="round"
                                                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                                                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                              </svg>
                                                          </span>
                                                          <span className="hidden md:inline-block">View</span>
                                                        </button>
                                                        </Link>


                                                        <button

                                                            className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                                                            <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                                     stroke="currentColor" className="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                                                </svg>
                                                            </span>
                                                          <span className="hidden md:inline-block text-red-600">Delete</span>
                                                        </button>

                                                      </div>
                                              </li>



              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
        </>
  );
};

export default UserProfile;
