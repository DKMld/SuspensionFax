import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddServiceRecord: React.FC = () => {
  const { id } = useParams();

  const [service_date, setServiceDate] = useState("");
  const [serviced_by, setServicedBy] = useState("");
  const [type_of_service, setTypeOfService] = useState("");
  // const [notes, setNotes] = useState("");

  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const API_URL = 'http://127.0.0.1:8000/api'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/suspension/${id}/add-service`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body:
                JSON.stringify({service_date, serviced_by, type_of_service})
        })

        if (response.ok){
            navigate(`/suspension/${id}`)
        //     TODO Msg for succsessful added suspension service record
        }else {
        //     TODO Alert that there is an error adding the service history !
        }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white px-6 py-12 flex justify-center">
      <div className="w-full max-w-2xl bg-[#141414] p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#f47920]">
          Add Service Record
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm">Service Date</label>
            <input
              type="date"
              value={service_date}
              onChange={(e) => setServiceDate(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded focus:ring-2 focus:ring-[#f47920] focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Serviced By</label>
            <input
              type="text"
              value={serviced_by}
              onChange={(e) => setServicedBy(e.target.value)}
              placeholder="e.g. Yourself, Bike Shop Name"
              required
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded placeholder-gray-400 focus:ring-2 focus:ring-[#f47920] focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Service Description</label>
            <input
              type="text"
              value={type_of_service}
              onChange={(e) => setTypeOfService(e.target.value)}
              placeholder="e.g. Full rebuild, air can service..."
              required
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded placeholder-gray-400 focus:ring-2 focus:ring-[#f47920] focus:outline-none"
            />
          </div>

          {/*<div>*/}
          {/*  <label className="block mb-2 text-sm">Notes (optional)</label>*/}
          {/*  <textarea*/}
          {/*    value={notes}*/}
          {/*    onChange={(e) => setNotes(e.target.value)}*/}
          {/*    rows={4}*/}
          {/*    placeholder="Additional info, invoice, part numbers, etc."*/}
          {/*    className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded placeholder-gray-400 focus:ring-2 focus:ring-[#f47920] focus:outline-none"*/}
          {/*  />*/}
          {/*</div>*/}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#f47920] hover:bg-orange-500 text-white font-semibold py-3 rounded transition"
            >
              Add Service Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceRecord;
