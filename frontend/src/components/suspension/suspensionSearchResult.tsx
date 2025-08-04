import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';

const API_URL = 'http://127.0.0.1:8000/api'

const SuspensionSearchResults: React.FC = () => {
  const {brand, serial} = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [productHistory, setProductHistory] = useState(null)

  useEffect(() => {
    if (brand && serial) {
        const getSuspensionHistory = async () => {
          const response = await fetch(`${API_URL}/search/${brand}/${serial}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (response.ok) {
              const data = await response.json()
              if (data.suspension_info.length === 0){
                toast.error(`No records found for product with serial number : ${serial}`)
              }

              setProductInfo(data.suspension_info[0])
              setProductHistory(data.suspension_history)
          }
          else {}
    }
    getSuspensionHistory().then(r => {});
    }
  }, [brand, serial]);

console.log(productInfo)

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-orange-400">Suspension Lookup Result</h1>

      <div className="border border-gray-700 rounded-xl p-6 bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-orange-300 mb-4">Suspension Info</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
        {productInfo ? (
          <>
          <p><span className="font-semibold text-white">Brand:</span> {productInfo.brand}</p>
          <p><span className="font-semibold text-white">Model:</span> {productInfo.model}</p>
          <p><span className="font-semibold text-white">Serial Number:</span> {productInfo.serial_number}</p>
          <p><span className="font-semibold text-white">Type:</span> {productInfo.type}</p>
          {productInfo.additional_description ? (
            <p className="sm:col-span-2"><span className="font-semibold text-white">Description:</span> {productInfo.additional_description}</p>
            ):(
            <p className="sm:col-span-2"><span className="font-semibold text-white">Description:</span> None</p>
            )}
            </>
            ):(
            <p>Loading or not found...</p>
            )}
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-orange-400">Service History</h2>
      <ul className="space-y-4">
      {productHistory && productHistory.length > 0 ? (
        productHistory.map((record, idx) => (
          <li
            key={idx}
            className="border border-gray-700 rounded-lg p-5 bg-[#2a2a2a] hover:shadow-md transition-shadow duration-200"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
              <p><span className="font-semibold text-white">Serial:</span> {record.suspension_serial}</p>
              <p><span className="font-semibold text-white">Service:</span> {record.type_of_service}</p>
              <p><span className="font-semibold text-white">Date:</span> {new Date(record.service_date).toLocaleDateString()}</p>
              <p><span className="font-semibold text-white">Serviced By:</span> {record.serviced_by}</p>
            </div>
          </li>
        ))
      ) : (
        <li className="border border-gray-700 rounded-lg p-5 bg-[#2a2a2a] text-gray-400">
          No service history found.
        </li>
      )}
    </ul>
    </div>
  );
};

export default SuspensionSearchResults;