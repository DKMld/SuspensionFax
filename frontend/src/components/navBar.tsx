import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<"shop" | "community" | "support" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [loggedIn, setLoggedIn] = useState(false)

  const username = localStorage.getItem('username')

  // Close dropdowns when clicking outside
  useEffect(() => {
    // We are making a quick check if the user is logged in or not !
    const token = localStorage.getItem("token")
    setLoggedIn(!!token)
    // We are making a quick check if the user is logged in or not !


    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdown = (
    items: { to: string; text: string }[],
    key: string
  ) => (
    <div className="absolute top-full left-0 mt-1 bg-white border shadow-md rounded-md w-48 animate-fade-in z-20">
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="block px-4 py-2 hover:bg-gray-100 text-sm"
          onClick={() => setOpenMenu(null)}
        >
          {item.text}
        </Link>
      ))}
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
          {/*<Link to="/search" className="text-gray-600 hover:text-orange-600">*/}
          {/*  <FaSearch />*/}
          {/*</Link>*/}

          {loggedIn ? (
                  <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 text-sm">
                    <FaUser />
                    <span className="hidden sm:inline">{username}</span>
                  </Link>)
              :(
                  <Link to="/auth" className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 text-sm">
                    <FaUser />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
              )}


        </div>
      </div>
    </nav>
  );
};

export default Navbar;
