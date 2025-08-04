import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate} from "react-router-dom";


const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<"shop" | "community" | "support" | "UserProfile" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))

  const [searchDropdown, setSearchDropdown] = useState(false)
  const [dropdownSelected, setDropdownSelected] = useState('Brands')

  const handleDropdownSelection = (option:string) =>{
      setDropdownSelected(option)
      setSearchDropdown(false)
    }

  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')

  const navigate = useNavigate()

  const API_URL = 'http://127.0.0.1:8000/api'

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'))
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleLogout = async () => {
            if (token) {
                const response = await fetch(`${API_URL}/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                });

                if (response.ok) {
                    toast.success(`Logged out successfully, hope to see you soon ${username}`)

                    localStorage.removeItem('token');
                    localStorage.removeItem('username')

                    navigate('/');


                } else {
                  toast.error('Logout failed, please try again!')
                }
            }
        };


  const dropdown = (
    items: { to?: string; text: string, onClick?: ()=>void }[],
    key: string
    ) => (
      <div className="absolute top-full left-0 mt-1 bg-white border shadow-md rounded-md w-20 animate-fade-in z-20">
    {items.map((item, index) =>
      item.to ? (
        <Link
          key={`${key}-${index}`}
          to={item.to}
          className="block px-4 py-2 hover:bg-gray-100 text-sm text-black"
          onClick={() => setOpenMenu(null)}
        >
          {item.text}
        </Link>
      ) : (
        <button
          key={`${key}-${index}`}
          onClick={() => {
            setOpenMenu(null);
            item.onClick?.();
          }}
          className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black text-sm"
        >
          {item.text}
        </button>
      )
    )}
  </div>
    );


  return (
    <nav className="bg-black  sticky top-0 z-50 " ref={menuRef}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 flex justify-between">

        {/* Search bar */}
        <div className="flex space-x-6 relative w-[20%] flex justify-between">
            <form className="max-w-lg mx-auto">
                <div className="flex">
                    <label htmlFor="search-dropdown"
                           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                    <button id="dropdown-button" data-dropdown-toggle="dropdown"
                        onClick={() => setSearchDropdown(!searchDropdown)}
                        className="shrink-0 z-50 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                            type="button">{dropdownSelected}
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                                                              xmlns="http://www.w3.org/2000/svg" fill="none"
                                                              viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="m1 1 4 4 4-4"/>
                    </svg></button>

                    {searchDropdown && (
                    <div id="dropdown"
                         className="absolute top-12 left-0 z-50 bg-white rounded shadow w-36 z-50 absolute  bg-white divide-y divide-gray-100 rounded-lg shadow-sm  dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                                <button type="button"
                                        onClick={() => handleDropdownSelection('Fox')}
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Fox
                                </button>
                            </li>
                            <li>
                                <button type="button"
                                        onClick={() => handleDropdownSelection('RockShox')}
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">RockShox
                                </button>
                            </li>
                            <li>
                                <button type="button"
                                        onClick={() => handleDropdownSelection('Ohlins')}
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ohlins
                                </button>
                            </li>
                            <li>
                                <button type="button"
                                        onClick={() => handleDropdownSelection('Dvo')}
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">DVO
                                </button>
                            </li>
                        </ul>
                    </div>
                        )}
                    <div className="relative w-full">
                        <input type="search" id="search-dropdown"
                               className="w-60 block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                               placeholder="Enter product serial code" required/>
                        <button type="submit"
                                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-orange-600 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>


        </div>

        {/* Center Logo */}
        <div className="flex items-center space-x-4 flex justify-between">
          <Link to="/" className="text-2xl font-extrabold text-orange-600">
            SuspensionFax
          </Link>
        </div>


        {/* Right Icons */}
        <div className="flex items-center space-x-4 w-[20%] flex justify-center">

          {loggedIn ? (
              <>
                  <Link to="/profile" className="flex items-center space-x-1 text-white-600 hover:text-orange-600 text-sm">
                    <FaUser />
                    <span className="hidden sm:inline">{username}</span>
                  </Link>

                  <div className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === "UserProfile" ? null : "UserProfile")}
                    className="hover:text-orange-600 transition text-sm font-medium"
                  >
                    <div className="flex items-center">
                    Profile
                      <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true"
                           className="-mr-1 size-5 text-orange-600">
                        <path
                            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd" fill-rule="evenodd"/>
                      </svg>
                    </div>

                  </button>

                  {openMenu === "UserProfile" &&
                    dropdown(
                      [
                        { to: "/profile", text: "Profile" },
                        { text: "Logout", onClick: handleLogout },
                      ],
                      "UserProfile"
                    )}
                </div>
                </>
            )

              :(
                  <Link to="/auth" className="flex items-center space-x-1 text-white hover:text-orange-600 text-sm">
                    <FaUser />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
              )}
          <div><Toaster/></div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
