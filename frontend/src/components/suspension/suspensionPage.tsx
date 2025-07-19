import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";


const SuspensionPage: React.FC = () => {
  const { id } = useParams();
  const API_URL = 'http://127.0.0.1:8000/api'

  const [suspensionServiceInfo, setSuspensionServiceInfo] = useState([])
  const [suspensionInfo, setSuspensionInfo] = useState([])

  useEffect( () => {
    const token = localStorage.getItem('token')
    const getSuspensionHistory = async () => {
      const response = await fetch(`${API_URL}/suspension/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      })

      if (response.ok) {
            const data = await response.json()
            setSuspensionServiceInfo(data.suspension_history)
            setSuspensionInfo(data.suspension_info[0])

      } else {}
    }

    getSuspensionHistory().then(r => {});
  }, [])






  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto bg-[#141414] p-8 rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            {suspensionInfo.brand} {suspensionInfo.model}
          </h1>
          <Link
            to={`/suspension/${id}/add-service`}
            className="text-sm bg-[#f47920] hover:bg-orange-500 px-4 py-2 rounded font-semibold transition"
          >
            + Add Service Record
          </Link>
        </div>

        {/* Suspension Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-gray-400 text-sm mb-1">Serial Number</p>
            <p className="text-lg font-medium">{suspensionInfo.serial_number}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Type</p>
            <p className="text-lg font-medium">{suspensionInfo.type}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Registered On</p>
            <p className="text-lg xfont-medium">{suspensionInfo.register_date?.slice(0, 10)}</p>
          </div>
          {/*<div>*/}
          {/*  <p className="text-gray-400 text-sm mb-1">Notes</p>*/}
          {/*  <p className="text-lg font-medium">{suspensionInfo.notes}</p>*/}
          {/*</div>*/}
        </div>

        {/* Service History */}
        <h2 className="text-xl font-semibold mb-4 text-[#f47920]">
          Service History
        </h2>
        {suspensionServiceInfo.length === 0 ? (
          <p className="text-gray-400">No service records yet.</p>
        ) : (
          <ul className="space-y-4">
            {suspensionServiceInfo.map((record, index) => (
              <li
                key={index}
                className="bg-[#1e1e1e] border border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="text-lg font-medium">{record.service_date}</p>
                  <span className="text-sm text-gray-400">
                    {record.serviced_by}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{record.type_of_service}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SuspensionPage;
