import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate} from "react-router-dom";


const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<"shop" | "community" | "support" | "UserProfile" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))

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
      <div className="absolute top-full left-0 mt-1 bg-white border shadow-md rounded-md w-48 animate-fade-in z-20">
    {items.map((item, index) =>
      item.to ? (
        <Link
          key={`${key}-${index}`}
          to={item.to}
          className="block px-4 py-2 hover:bg-gray-100 text-sm"
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
          className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
        >
          {item.text}
        </button>
      )
    )}
  </div>
    );

  return (
    <nav className="bg-white border-b sticky top-0 z-50 " ref={menuRef}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 flex justify-between">
        {/* Left Menu */}
        <div className="flex space-x-6 relative w-[20%] flex justify-between">
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === "shop" ? null : "shop")}
              className="hover:text-orange-600 transition text-sm font-medium"
            >
              Shop
            </button>
            {openMenu === "shop" &&
              dropdown(
                [
                  { to: "/forks", text: "Forks" },
                  { to: "/shocks", text: "Shocks" },
                  { to: "/seatposts", text: "Seatposts" },
                  { to: "/service", text: "Service" },
                ],
                "shop"
              )}
          </div>
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === "community" ? null : "community")}
              className="hover:text-orange-600 transition text-sm font-medium"
            >
              Community
            </button>
            {openMenu === "community" &&
              dropdown(
                [
                  { to: "/stories", text: "Stories" },
                  { to: "/academy", text: "FOX Academy" },
                  { to: "/team", text: "Our Team" },
                ],
                "community"
              )}
          </div>
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === "support" ? null : "support")}
              className="hover:text-orange-600 transition text-sm font-medium"
            >
              Support
            </button>
            {openMenu === "support" &&
              dropdown(
                [
                  { to: "/service-centers", text: "Service Centers" },
                  { to: "/register", text: "Register Suspension" },
                  { to: "/help", text: "Help & Docs" },
                ],
                "support"
              )}
          </div>
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
                  <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 text-sm">
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
                           className="-mr-1 size-5 text-gray-400">
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
                  <Link to="/auth" className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 text-sm">
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
