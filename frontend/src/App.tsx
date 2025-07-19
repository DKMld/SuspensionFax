import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar.tsx";
import HomePage from "./components/common/homePage.tsx";
import AuthPage from "./components/auth/authPage.tsx";
import UserProfile from './components/profile/UserProfile.tsx';
import RegisterSuspension from './components/suspension/RegisterSuspensionPage.tsx';
import SuspensionPage from "./components/suspension/SuspensionPage.tsx";
import AddServiceRecord from "./components/suspension/addSuspensionServiceRecordPage.tsx";


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<UserProfile />} />

                <Route path="/suspension/register" element={<RegisterSuspension />} />
                <Route path="/suspension/:id" element={<SuspensionPage />} />
                <Route path="/suspension/:id/add-service" element={<AddServiceRecord />} />

            </Routes>
    </Router>
  );
};

export default App;
