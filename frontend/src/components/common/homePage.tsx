import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';


const HomePage: React.FC = () => {
  const navigate = useNavigate()

  const brands = ["Fox", "RockShox", "Öhlins", "Marzocchi", "Manitou", "SR Suntour", "Cane Creek", "DVO"];
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))


  const [selectedBrand, setSelectedBrand] = useState('')
  const [serialNumber, setSerialNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    if (serialNumber && selectedBrand){
        navigate(`/search/${selectedBrand}/${serialNumber}`);
    }
    else {
        toast.error('Please fill both the brand and serial number fields.')
    }

  };


  return (
    <main className="bg-[#1a1a1a] text-white min-h-screen">
      {/* Hero */}
      <section className="text-center py-24 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Track Your Suspension’s History
        </h1>
        <p className="text-lg text-[#c0c0c0] max-w-xl mx-auto">
          Register your MTB fork or shock and keep a verifiable service record.
          Ride with confidence. Buy with trust.
        </p>
        <div className="mt-8 space-x-4">
          <Link
            to="/suspension/register"
            className="bg-[#f47920] hover:bg-orange-500 text-white px-6 py-3 rounded-md font-semibold transition"
          >
            Register Suspension
          </Link>
          <Link
            to="/lookup"
            className="border border-[#f47920] hover:bg-[#f47920] hover:text-white text-[#f47920] px-6 py-3 rounded-md font-semibold transition"
          >
            Check Serial
          </Link>
        </div>
      </section>


      <section  id="searchbar" className="bg-[#141414] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-10 tracking-wide">
            SEARCH FOR PRODUCT INFORMATION
          </h3>
        <form name="serialform" id="serialform"
              onSubmit={handleSubmit}
                className="inline-grid sm:flex-row items-center gap-4 justify-center mb-8">
          <div className="w-full">
          <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-200">
            Select Suspension Brand
          </label>
          <select
            id="brand"
            name="brand"
            value={selectedBrand}
            required={true}
            onChange={(event) => setSelectedBrand(event.target.value)}
            className="w-full bg-[#2a2a2a] border border-gray-600 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5"
          >
            <option value="" disabled>Select a brand</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>


            <input
                type="text"
                id="serial"
                name="serial"
                placeholder="ENTER SERIAL NUMBER"
                onChange={(event) => setSerialNumber(event.target.value)}
                className="form-control w-full sm:w-96 px-4 py-2 bg-[#2a2a2a] text-white placeholder-gray-400 border-none rounded focus:ring-2 focus:ring-[#f47920] focus:outline-none"
            />

          {/*<span className="ortext block text-gray-400 font-semibold text-sm ">OR</span>*/}

          {/*  <input*/}
          {/*      type="text"*/}
          {/*      id="code"*/}
          {/*      name="code"*/}
          {/*      placeholder="ENTER 4 DIGIT CODE"*/}
          {/*      className="form-control w-full sm:w-96 px-4 py-2 bg-[#2a2a2a] text-white placeholder-gray-400 border-none rounded focus:ring-2 focus:ring-[#f47920] focus:outline-none"*/}
          {/*  />*/}
            <button
                type="submit"
                id="codebutton"
                className="btn bg-[#f47920] hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded transition"
            >
              SEARCH
            </button>
          </form>
        </div>
      </section>


      {/* Feature Section */}
      <section className="bg-[#141414] py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[#f47920]">1. Register</h3>
            <p className="text-[#c0c0c0]">Add your fork or shock with its brand, model, and serial number.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[#f47920]">2. Log Services</h3>
            <p className="text-[#c0c0c0]">Track every oil change, rebuild, or maintenance visit.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[#f47920]">3. Share or Lookup</h3>
            <p className="text-[#c0c0c0]">Buyers can verify maintenance history using the serial number.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 px-6">
        <h2 className="text-3xl font-bold mb-4">Ride smarter. Sell easier.</h2>
        <p className="text-[#c0c0c0] max-w-xl mx-auto">
          Keep your suspension’s service history transparent and transferable.
        </p>
        <div className="mt-6">
            {loggedIn ? (
          <Link
            to="/profile"
            className="bg-[#f47920] hover:bg-orange-500 text-white px-8 py-3 rounded-md font-semibold transition"
          >
            Go to Dashboard
          </Link>
            ):(
            <Link
                to="/auth"
                className="bg-[#f47920] hover:bg-orange-500 text-white px-8 py-3 rounded-md font-semibold transition">
                Go to Dashboard
            </Link>
            )}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
