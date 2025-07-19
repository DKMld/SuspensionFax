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

                    <li key={index} className="border border-gray-700 rounded-lg p-4 bg-[#1e1e1e]">
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
                    </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
