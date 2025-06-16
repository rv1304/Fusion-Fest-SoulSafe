import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./dashboard.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import MerchCards from "./marketplace";
import Task from './TaskRewards';
import CourseDetailsFull from './components/CourseDetails';

const Sidebar = ({ onMarketPlaceClick }) => {
  const navigate = useNavigate();

  const handleCommunityClick = () => {
    navigate('/chat');
  };

  const handleFindAFriendClick = () => {
    navigate('/chat');
  };

  const handleCoursesClick = () => {
    navigate('/courses');
  };

  return (
    <div className="sidebar">
      <div className="logo">SOULSAFE</div>
      <nav>
        <button className="nav-button">
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </button><br />
        <button className="nav-button" onClick={handleFindAFriendClick}>
          <i className="fas fa-inbox"></i> Find a Friend
        </button><br />
        <button className="nav-button" onClick={handleCoursesClick}>
          <i className="fas fa-book"></i> Courses
        </button><br />
        <button className="nav-button" onClick={onMarketPlaceClick}>
          <i className="fas fa-store"></i> NFT Marketplace
        </button><br />
        <Link to="/TaskRewards">
          <button className="nav-button">
            <i className="fas fa-tasks"></i> Task Rewards
          </button>
        </Link><br />
        <button className="nav-button" onClick={handleCommunityClick}>
          <i className="fas fa-users"></i> Community
        </button>
      </nav>
    </div>
  );
};

const Header = () => (
  <div className="header">
    <input type="text" placeholder="Search your course..." />
    <button className="filter-button">Filter</button>
  </div>
);

const HeroSection = () => (
  <div className="hero-section1">
    <h2 style={{ textAlign: 'left', margin: '0', padding: '0', marginBottom: '8px' }}>"Ensure Your Peace of Mind with <br /> SoulSafe – Your Digital Companion."</h2>
    <button className="join-now" style={{ alignSelf: 'flex-start' }}>Join Now</button>
  </div>
);

const StatCards = () => {
  const stats = [
    { watched: "2/8", subject: "Mental Health Basics" },
    { watched: "5/12", subject: "Mindfulness Training" },
    { watched: "3/6", subject: "Stress Management" },
    { watched: "1/4", subject: "Sleep Hygiene" }
  ];

  return (
    <div className="stat-cards">
      {stats.map((stat, idx) => (
        <div className="stat-card" key={idx}>
          <p>{stat.watched} Watched</p>
          <span>{stat.subject}</span>
        </div>
      ))}
    </div>
  );
};

const Card = ({ image, title, specialist }) => (
  <div className="card">
    <img src={image} alt={title} />
    <div className="card-content">
      <h3>{title}</h3>
      <p>{specialist}</p>
    </div>
  </div>
);

const TherapySessions = () => {
  const sessions = [
    {
      therapist: "Therapist_Sigma",
      date: "1/01/2025",
      topic: "How To Kill Self Doubt",
      status: "completed"
    },
    {
      therapist: "HealthMaster_13",
      date: "31/12/2024",
      topic: "Loneliness",
      status: "completed"
    },
    {
      therapist: "MindBalance_Pro",
      date: "28/12/2024",
      topic: "Anxiety Management",
      status: "scheduled"
    }
  ];

  return (
    <div className="therapy-sessions">
      <h2>Previous Therapy Sessions</h2>
      <div className="session-details">
        {sessions.map((session, index) => (
          <div key={index} className="session">
            <div className="session-info">
              <p><strong>{session.therapist}</strong></p>
              <p>{session.date}</p>
              <p>{session.topic}</p>
            </div>
            <button className={`session-btn ${session.status}`}>
              {session.status === 'completed' ? 'Show Details' : 'Join Session'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isMarketPlaceVisible, setIsMarketPlaceVisible] = useState(false);
  const location = useLocation();

  const handleMarketPlaceClick = () => {
    setIsMarketPlaceVisible(!isMarketPlaceVisible);
  };

  return (
    <div className="dashboard">
      {location.pathname === "/dashboard" && <Sidebar onMarketPlaceClick={handleMarketPlaceClick} />}

      <div className="main-content">
        <Header />
        <HeroSection />
        <StatCards />
        <h2 style={{ textAlign: 'left', marginLeft: '20px' }}>Continue Watching</h2>
        <div className="cards-grid">
          <Card
            image="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg"
            title="Building Emotional Resilience"
            specialist="WellnessSphere Specialist"
          />
          <Card
            image="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg"
            title="Mindfulness And Meditation For Mental Clarity"
            specialist="VitalExpert Specialist"
          />
          <Card
            image="https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg"
            title="Positive Thinking And Cognitive Behavioral Therapy"
            specialist="CarePro Specialist"
          />
        </div>
        <TherapySessions />
      </div>

      {isMarketPlaceVisible && <MerchCards />}
    </div>
  );
};

export default Dashboard;