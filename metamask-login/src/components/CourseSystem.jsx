import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseSystem.css';

const CourseSystem = () => {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userProgress, setUserProgress] = useState({});

  const courses = [
    {
      id: 1,
      title: "Mental Health Awareness and Education",
      instructor: "Dr. Sarah Wilson",
      duration: "3 Months",
      modules: 32,
      description: "Basics of mental health, common disorders, and breaking stigmas.",
      image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg",
      videos: [
        { id: 1, title: "Introduction to Mental Health", videoId: "dQw4w9WgXcQ", duration: "15:30" },
        { id: 2, title: "Understanding Depression", videoId: "3JZ_D3ELwOQ", duration: "22:45" },
        { id: 3, title: "Anxiety Disorders Explained", videoId: "V-_O7nl0Ii0", duration: "18:20" },
        { id: 4, title: "Breaking Mental Health Stigma", videoId: "kJQP7kiw5Fk", duration: "20:15" }
      ],
      price: "0.5 ETH",
      rating: 4.8,
      students: 1250
    },
    {
      id: 2,
      title: "Personal Growth and Emotional Well-being",
      instructor: "Dr. Michael Chen",
      duration: "3 Months",
      modules: 28,
      description: "Stress Management Techniques: Practical strategies to cope with daily stressors.",
      image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
      videos: [
        { id: 1, title: "Building Self-Awareness", videoId: "tgbNymZ7vqY", duration: "19:45" },
        { id: 2, title: "Emotional Intelligence", videoId: "dQw4w9WgXcQ", duration: "25:30" },
        { id: 3, title: "Stress Management Techniques", videoId: "3JZ_D3ELwOQ", duration: "21:15" },
        { id: 4, title: "Building Resilience", videoId: "V-_O7nl0Ii0", duration: "23:40" }
      ],
      price: "0.4 ETH",
      rating: 4.7,
      students: 980
    },
    {
      id: 3,
      title: "Therapy and Coping Strategies",
      instructor: "Dr. Emily Rodriguez",
      duration: "3 Months",
      modules: 35,
      description: "Cognitive Behavioral Therapy (CBT): Introduction to CBT and applying its principles in daily life.",
      image: "https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg",
      videos: [
        { id: 1, title: "Introduction to CBT", videoId: "kJQP7kiw5Fk", duration: "24:20" },
        { id: 2, title: "Identifying Negative Thought Patterns", videoId: "tgbNymZ7vqY", duration: "18:55" },
        { id: 3, title: "Behavioral Activation Techniques", videoId: "dQw4w9WgXcQ", duration: "22:10" },
        { id: 4, title: "Mindfulness in Therapy", videoId: "3JZ_D3ELwOQ", duration: "20:35" }
      ],
      price: "0.6 ETH",
      rating: 4.9,
      students: 1450
    },
    {
      id: 4,
      title: "Self-Care and Lifestyle",
      instructor: "Dr. Amanda Foster",
      duration: "3 Months",
      modules: 25,
      description: "The Role of Nutrition in Mental Health: How diet impacts mood and energy levels.",
      image: "https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg",
      videos: [
        { id: 1, title: "Nutrition and Mental Health", videoId: "V-_O7nl0Ii0", duration: "17:25" },
        { id: 2, title: "Exercise for Mental Wellness", videoId: "kJQP7kiw5Fk", duration: "19:40" },
        { id: 3, title: "Sleep Hygiene", videoId: "tgbNymZ7vqY", duration: "16:30" },
        { id: 4, title: "Creating Healthy Routines", videoId: "dQw4w9WgXcQ", duration: "21:15" }
      ],
      price: "0.3 ETH",
      rating: 4.6,
      students: 850
    }
  ];

  useEffect(() => {
    // Load user progress from localStorage
    const savedProgress = localStorage.getItem('courseProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }

    const savedEnrolled = localStorage.getItem('enrolledCourses');
    if (savedEnrolled) {
      setEnrolledCourses(JSON.parse(savedEnrolled));
    }
  }, []);

  const enrollInCourse = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      const newEnrolled = [...enrolledCourses, courseId];
      setEnrolledCourses(newEnrolled);
      localStorage.setItem('enrolledCourses', JSON.stringify(newEnrolled));
      
      // Initialize progress for this course
      const newProgress = { ...userProgress };
      newProgress[courseId] = { completedVideos: [], currentVideo: 0, totalProgress: 0 };
      setUserProgress(newProgress);
      localStorage.setItem('courseProgress', JSON.stringify(newProgress));
    }
  };

  const startCourse = (courseId) => {
    navigate(`/video-layout/${courseId}`);
  };

  const calculateProgress = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    const progress = userProgress[courseId];
    if (!course || !progress) return 0;
    return Math.round((progress.completedVideos.length / course.videos.length) * 100);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={i} className="star empty">☆</span>);
    }
    return stars;
  };

  return (
    <div className="course-system">
      <div className="course-header">
        <h1>Mental Health Courses</h1>
        <p>Transform your understanding and build resilience through expert-led courses</p>
      </div>

      <div className="course-stats">
        <div className="stat-item">
          <h3>37k+</h3>
          <p>Students Enrolled</p>
        </div>
        <div className="stat-item">
          <h3>20k+</h3>
          <p>Courses Completed</p>
        </div>
        <div className="stat-item">
          <h3>99k+</h3>
          <p>Lives Transformed</p>
        </div>
      </div>

      {enrolledCourses.length > 0 && (
        <div className="enrolled-section">
          <h2>Your Enrolled Courses</h2>
          <div className="enrolled-courses">
            {enrolledCourses.map(courseId => {
              const course = courses.find(c => c.id === courseId);
              const progress = calculateProgress(courseId);
              return (
                <div key={courseId} className="enrolled-course-card">
                  <img src={course.image} alt={course.title} />
                  <div className="enrolled-course-info">
                    <h3>{course.title}</h3>
                    <p>Progress: {progress}%</p>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <button onClick={() => startCourse(courseId)} className="continue-btn">
                      Continue Learning
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="courses-section">
        <h2>Available Courses</h2>
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                <div className="course-overlay">
                  <span className="course-duration">{course.duration}</span>
                </div>
              </div>
              
              <div className="course-content">
                <div className="course-meta">
                  <span className="course-category">Mental Health</span>
                  <div className="course-rating">
                    {renderStars(course.rating)}
                    <span className="rating-number">({course.rating})</span>
                  </div>
                </div>
                
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                
                <div className="course-details">
                  <div className="detail-item">
                    <span className="detail-label">Instructor:</span>
                    <span className="detail-value">{course.instructor}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Modules:</span>
                    <span className="detail-value">{course.modules}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Students:</span>
                    <span className="detail-value">{course.students.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="course-features">
                  <div className="feature">✓ Money Back Guarantee</div>
                  <div className="feature">✓ Access on all devices</div>
                  <div className="feature">✓ Certification of completion</div>
                </div>
                
                <div className="course-footer">
                  <div className="course-price">{course.price}</div>
                  {enrolledCourses.includes(course.id) ? (
                    <button onClick={() => startCourse(course.id)} className="enrolled-btn">
                      Continue Course
                    </button>
                  ) : (
                    <button onClick={() => enrollInCourse(course.id)} className="enroll-btn">
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSystem;