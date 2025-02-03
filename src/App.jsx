import React from "react";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Admin from "./pages/Admin";
import { AuthProvider } from "./contexts/AuthContext";
import { StageProvider } from "./contexts/StageContext";
import Candidate from "./pages/Candidate";
import Stage from './pages/Stage'
import Status from './pages/Status'

const App = () => {
  const location = useLocation();

  // Define routes where Header and Footer should not be displayed
  const noHeaderRoutes = ["/signup", "/login"];

  const shouldShowHeader= !noHeaderRoutes.includes(location.pathname);

  return (
    <>
    <AuthProvider>
      <StageProvider>
    {shouldShowHeader && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<Admin />} />
        <Route path="/status" element={<Status/>} />
        <Route path="/candidate-dashboard" element={<Candidate />} />
        <Route path='/stage' element={<Stage/>}/>
      </Routes>
      </StageProvider>
      </AuthProvider>
    </>
  );
};

export default App;
