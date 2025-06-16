import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import LoginPage from "./LoginPage";
import Dashboard from "./dashboard";
import MerchCards from "./marketplace";
import Task from "./TaskRewards";
import CourseDetailsFull from "./components/CourseDetails";
import VideoLayout from "./components/VideoLayout";
import ChatSystem from "./components/ChatSystem";
import CourseSystem from "./components/CourseSystem";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route renders HeroSection */}
        <Route path="/" element={<HeroSection />} />

        {/* Login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Marketplace route */}
        <Route path="/marketplace" element={<MerchCards />} />

        {/* Task Rewards route */}
        <Route path="/TaskRewards" element={<Task />} />

        {/* Course Details route */}
        <Route path="/CourseDetails" element={<CourseDetailsFull />} />
        
        {/* Video Layout route */}
        <Route path="/video-layout/:course" element={<VideoLayout />} />

        {/* Chat System route */}
        <Route path="/chat" element={<ChatSystem />} />

        {/* Course System route */}
        <Route path="/courses" element={<CourseSystem />} />
      </Routes>
    </Router>
  );
}

export default App;