import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection"; // Import HeroSection
import LoginPage from "./LoginPage";
import Dashboard from "./dashboard";
import MerchCards from "./marketplace";
import Task from "./TaskRewards"; // Import the TaskRewards component
import CourseDetailsFull from "./components/CourseDetails"; // Import CourseDetailsFull
import VideoLayout from "./components/VideoLayout"; // Import VideoLayout component

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route now renders HeroSection */}
        <Route path="/" element={<HeroSection />} />

        {/* Login route */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<MerchCards />} />
        <Route path="/TaskRewards" element={<Task />} /> {/* Add a route for TaskRewards */}
        <Route path="/CourseDetails" element={<CourseDetailsFull />} /> {/* Add route for CourseDetailsFull */}
        
        {/* Add route for VideoLayout */}
        <Route path="/video-layout/:course" element={<VideoLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
