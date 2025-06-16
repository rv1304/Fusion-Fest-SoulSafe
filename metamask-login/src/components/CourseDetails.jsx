import React from "react";
import "./CourseDetails.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CourseDetailsFull = () => {
  // Use useNavigate hook to get navigation functionality
  const navigate = useNavigate();

  // Function to handle course button click
  const handleCourseClick = (course) => {
    // Navigate to VideoLayout component with the course name as part of the path
    navigate(`/video-layout/${course}`);
  };

  return (
    <div className="course-details-full">
      {/* Header Section */}
      <header className="course-header">
        <h1 className="course-title">Advanced JavaScript: Mastering Modern Techniques</h1>
        <p className="course-tagline">Take your JavaScript skills to the next level!</p>
      </header>

      {/* Main Video Section */}
      <section className="course-video-section">
        <div className="video-container">
          <iframe
            className="youtube-player"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Course Introduction Video"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Course Overview */}
      <section className="course-overview">
        <h2>Course Overview</h2>
        <ul>
          <li><strong>Duration:</strong> 10 hours</li>
          <li><strong>Difficulty:</strong> Intermediate</li>
          <li><strong>Language:</strong> English</li>
          <li><strong>Certification:</strong> Available</li>
        </ul>
      </section>

      {/* Instructor Details */}
      <section className="instructor-section">
        <h2>About the Instructor</h2>
        <div className="instructor-details">
          <img
            src="https://via.placeholder.com/150"
            alt="Instructor"
            className="instructor-photo"
          />
          <div>
            <h3>John Doe</h3>
            <p>
              John is a software engineer with over 10 years of experience in web development.
              He specializes in JavaScript and has taught over 50,000 students worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="curriculum-section">
        <h2>Course Curriculum</h2>
        <ul>
          <li>Module 1: Introduction to Advanced JavaScript</li>
          <li>Module 2: Closures and Scope</li>
          <li>Module 3: Asynchronous Programming with Promises</li>
          <li>Module 4: Async/Await and Error Handling</li>
          <li>Module 5: Advanced JavaScript Design Patterns</li>
        </ul>
      </section>

      {/* Reviews */}
      <section className="reviews-section">
        <h2>Reviews and Ratings</h2>
        <div className="review">
          <p><strong>Jane Smith:</strong> "This course is fantastic! The explanations are clear, and the examples are practical."</p>
          <span>⭐⭐⭐⭐⭐</span>
        </div>
        <div className="review">
          <p><strong>Tom Brown:</strong> "I learned so much about JavaScript. Highly recommended!"</p>
          <span>⭐⭐⭐⭐</span>
        </div>
      </section>

      {/* Related Courses */}
      <section className="related-courses-section">
        <h2>Related Courses</h2>
        <div className="related-courses">
          <div className="course-card">
            <h3>React for Beginners</h3>
            <p>Start building dynamic web apps with React.js.</p>
            <button onClick={() => handleCourseClick("React for Beginners")}>View Course</button>
          </div>
          <div className="course-card">
            <h3>Mastering Node.js</h3>
            <p>Build scalable backend systems with Node.js.</p>
            <button onClick={() => handleCourseClick("Mastering Node.js")}>View Course</button>
          </div>
          <div className="course-card">
            <h3>Understanding TypeScript</h3>
            <p>Write robust, type-safe JavaScript with TypeScript.</p>
            <button onClick={() => handleCourseClick("Understanding TypeScript")}>View Course</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetailsFull;