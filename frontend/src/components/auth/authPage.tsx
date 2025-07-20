import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';

const AuthPage: React.FC = () => {
      const [isLogin, setIsLogin] = useState(true);
      const [username, setUsername] = useState('')
      const [password, setPassword] = useState('')

      const navigate = useNavigate()

      const API_URL = 'http://127.0.0.1:8000/api'


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/login`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:
                JSON.stringify({username, password}),
        })

        const data = await response.json()

        if (response.ok){
            toast.success(`Logged In Successfully as ${username}!`)

            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);

            navigate('/')

        }else {
            toast.error('Login failed, please try again!')
        }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${API_URL}/api/register`;

    console.log("Final API URL:", url); // Log the final URL to debug
    const response = await fetch(`${API_URL}/register`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({username, password})
        })

        if (response.ok){
            toast.success('Registered in Successfully!')
            setIsLogin(true)
        }else {
            toast.error('Failed to create and account!')
        }
  };

  // TODO Add Website logo above auth form ! White -> Orange colour theme

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
      <div className="relative w-full max-w-xl bg-[#141414] text-white rounded-xl overflow-hidden shadow-xl">

        {/* Header Toggle */}
        <div className="flex justify-between text-center">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-4 transition font-bold ${
              isLogin ? "bg-[#1a1a1a] text-[#f47920]" : "bg-[#2a2a2a]"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-4 transition font-bold ${
              !isLogin ? "bg-[#1a1a1a] text-[#f47920]" : "bg-[#2a2a2a]"
            }`}
          >
            Register
          </button>
        </div>

        {/* Sliding Panel Container */}
        <div className="relative w-[200%] flex transition-transform duration-500" style={{ transform: isLogin ? "translateX(0%)" : "translateX(-50%)" }}>
          {/* Login Panel */}
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6">Log In</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email *"
                onChange={(event) => setUsername(event.target.value)}
                required
                className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f47920]"
              />
              <input
                type="password"
                placeholder="Password *"
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f47920]"
              />
              <button
                type="submit"
                className="w-full bg-[#f47920] hover:bg-orange-500 text-white py-2 rounded font-semibold"
              >
                Log In
              </button>
            </form>
          </div>

          {/* Register Panel */}
          <div className="w-1/2 p-8">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Create an<span className="m-[0.5rem] text-[#f47920]">Account</span></h2>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f47920]"
              />
              <input
                type="email"
                placeholder="Email *"
                onChange={(event) => setUsername(event.target.value)}
                required
                className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f47920]"
              />
              <input
                type="password"
                placeholder="Password *"
                required
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f47920]"
              />
              <button
                type="submit"
                className="w-full bg-[#f47920] hover:bg-orange-500 text-white py-2 rounded font-semibold"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
