import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';

const RegisterSuspension: React.FC = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serial_number, setSerial] = useState("");
  const [type, setType] = useState("fork");
  const [additional_description, setDescription] = useState("");

  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const API_URL = 'http://127.0.0.1:8000/api'
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/suspension/register`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body:
                JSON.stringify({brand, model, serial_number, type, additional_description}),
        })

        if (response.ok) {
          toast.success(`Product with serial number: ${serial_number} successfully added!`)
          navigate('/profile')
        }else {
          toast.error('There was a problem with registering this product, please try again!')
        }
    };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white px-6 py-12 flex justify-center">
      <div className="w-full max-w-2xl bg-[#141414] p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#f47920]">Register Suspension</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm">Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded placeholder-gray-400 focus:ring-2 focus:ring-[#f47920] focus:outline-none"
              placeholder="e.g. Fox, RockShox"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded placeholder-gray-400 focus:ring-2 focus:ring-[#f47920] focus:outline-none"
              placeholder="e.g. Float X2, Lyrik Ultimate"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Serial Number</label>
            <input
              type="text"
              value={serial_number}
              onChange={(e) => setSerial(e.target.value)}
              required
              maxLength={20}
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded placeholder-gray-400 focus:ring-2 focus:ring-[#f47920] focus:outline-none"
              placeholder="e.g. 826-57-128"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded focus:ring-2 focus:ring-[#f47920] focus:outline-none"
            >
              <option value="fork">Fork</option>
              <option value="shock">Shock</option>
              <option value="dropper">Dropper Post</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm">Notes (optional)</label>
            <textarea
              value={additional_description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded placeholder-gray-400 focus:ring-2 focus:ring-[#f47920] focus:outline-none"
              placeholder="Service history, purchase info, etc."
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#f47920] hover:bg-orange-500 text-white font-semibold py-3 rounded transition"
            >
              Register Suspension
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RegisterSuspension;
