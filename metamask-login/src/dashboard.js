import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./dashboard.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import MerchCards from "./marketplace";
import Task from './TaskRewards';  // Import TaskRewards component
import CourseDetailsFull from './components/CourseDetails';  // Import the CourseDetailsFull component

const Sidebar = ({ onMarketPlaceClick }) => {
  const navigate = useNavigate();  // Initialize navigate function

  const handleCommunityClick = () => {
    window.open('https://chat-application-r33z.onrender.com/', '_blank');  // Open in a new tab
  };

  const handleFindAFriendClick = () => {
    window.open('https://chat-application-r33z.onrender.com/', '_blank');  // Open in a new tab
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
        <Link to="/CourseDetails"> {/* Link to CourseDetailsFull page */}
          <button className="nav-button">
            <i className="fas fa-book"></i> Courses
          </button>
        </Link><br />
        <button className="nav-button" onClick={onMarketPlaceClick}>
          <i className="fas fa-store"></i> NFT Marketplace
        </button><br />
        <button className="nav-button">
          <i className="fas fa-tasks"></i> <Link to="/TaskRewards">Task Rewards</Link>  {/* Add link to Task Rewards */}
        </button><br />
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

const StatCards = () => (
  <div className="stat-cards">
    {Array.from({ length: 4 }).map((_, idx) => (
      <div className="stat-card" key={idx}>
        <p>2/8 Watched</p>
        <span>Product Design</span>
      </div>
    ))}
  </div>
);

const Card = ({ image, title, specialist }) => (
  <div className="card">
    <img src={image} alt={title} />
    <div className="card-content">
      <h3>{title}</h3>
      <p>{specialist}</p>
    </div>
  </div>
);

const TherapySessions = () => (
  <div className="therapy-sessions">
    <h2>Previous Therapy Session</h2>
    <div className="session-details">
      <div className="session">
        <p>Therapist_Sigma</p>
        <p>29/9/2023</p>
        <p>How To Kill Self Doubt</p>
        <button>Show Details</button>
      </div>
      <div className="session">
        <p>HealthMaster_13</p>
        <p>31/12/2024</p>
        <p>Loneliness</p>
        <button>Show Details</button>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [isMarketPlaceVisible, setIsMarketPlaceVisible] = useState(false);
  const location = useLocation();  // Get the current location

  const handleMarketPlaceClick = () => {
    setIsMarketPlaceVisible(!isMarketPlaceVisible);
  };

  return (
    <div className="dashboard">
      {/* Only show Sidebar if the current route is Dashboard */}
      {location.pathname === "/dashboard" && <Sidebar onMarketPlaceClick={handleMarketPlaceClick} />}

      <div className="main-content">
        <Header />
        <HeroSection />
        <StatCards />
        <h2 style={{ textAlign: 'left', marginLeft: '20px' }}>Continue Watching</h2>
        <div className="cards-grid">
          <Card
            image="https://i.pinimg.com/236x/f3/67/fe/f367fece757a2c4b4b4d9a729851490d.jpg"
            title="Building Emotional Resilience"
            specialist="WellnessSphere Specialist"
          />
          <Card
            image="https://i.pinimg.com/236x/cb/ef/2f/cbef2fd74ad6b17879fe183343e08c20.jpg"
            title="Mindfulness And Meditation For Mental Clarity"
            specialist="VitalExpert Specialist"
          />
          <Card
            image="https://i.pinimg.com/236x/60/54/b5/6054b54f91b6f82212416239f076d6b4.jpg"
            title="Positive Thinking And Cognitive Behavioral Therapy"
            specialist="CarePro Specialist"
          />
        </div>
        <TherapySessions />
      </div>

      {/* Conditionally render MerchCards when Marketplace is visible */}
      {isMarketPlaceVisible && <MerchCards />}
    </div>
  );
};

const CourseDetailPage = () => {
  return (
    <div className="course-detail-page">
      <CourseDetailsFull />  {/* Render the CourseDetailsFull component */}
    </div>
  );
};

export default Dashboard;
