import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import "./VideoLayout.css";

const VideoLayout = () => {
  const { course } = useParams();
  const [currentVideo, setCurrentVideo] = useState("dQw4w9WgXcQ");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userProgress, setUserProgress] = useState({});
  const [completedVideos, setCompletedVideos] = useState([]);
  const messagesEndRef = useRef(null);

  // Course-specific video playlists
  const coursePlaylists = {
    "1": [
      { id: "dQw4w9WgXcQ", title: "Introduction to Mental Health", duration: "15:30" },
      { id: "3JZ_D3ELwOQ", title: "Understanding Depression", duration: "22:45" },
      { id: "V-_O7nl0Ii0", title: "Anxiety Disorders Explained", duration: "18:20" },
      { id: "kJQP7kiw5Fk", title: "Breaking Mental Health Stigma", duration: "20:15" }
    ],
    "2": [
      { id: "tgbNymZ7vqY", title: "Building Self-Awareness", duration: "19:45" },
      { id: "dQw4w9WgXcQ", title: "Emotional Intelligence", duration: "25:30" },
      { id: "3JZ_D3ELwOQ", title: "Stress Management Techniques", duration: "21:15" },
      { id: "V-_O7nl0Ii0", title: "Building Resilience", duration: "23:40" }
    ],
    "3": [
      { id: "kJQP7kiw5Fk", title: "Introduction to CBT", duration: "24:20" },
      { id: "tgbNymZ7vqY", title: "Identifying Negative Thought Patterns", duration: "18:55" },
      { id: "dQw4w9WgXcQ", title: "Behavioral Activation Techniques", duration: "22:10" },
      { id: "3JZ_D3ELwOQ", title: "Mindfulness in Therapy", duration: "20:35" }
    ],
    "4": [
      { id: "V-_O7nl0Ii0", title: "Nutrition and Mental Health", duration: "17:25" },
      { id: "kJQP7kiw5Fk", title: "Exercise for Mental Wellness", duration: "19:40" },
      { id: "tgbNymZ7vqY", title: "Sleep Hygiene", duration: "16:30" },
      { id: "dQw4w9WgXcQ", title: "Creating Healthy Routines", duration: "21:15" }
    ]
  };

  const videoList = coursePlaylists[course] || coursePlaylists["1"];
  
  const sampleComments = [
    { id: 1, author: "MindBalance_Pro", text: "This video really helped me understand the concepts better!", timestamp: "2 hours ago" },
    { id: 2, author: "WellnessSeeker", text: "Thank you for sharing this valuable information.", timestamp: "5 hours ago" },
    { id: 3, author: "HealthyMind_23", text: "I've been struggling with this topic, and this explanation made it so clear.", timestamp: "1 day ago" },
    { id: 4, author: "TherapyHelper", text: "Great practical examples! Will definitely try these techniques.", timestamp: "2 days ago" }
  ];

  useEffect(() => {
    setComments(sampleComments);
    // Load user progress
    const savedProgress = localStorage.getItem('courseProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUserProgress(progress);
      if (progress[course]) {
        setCompletedVideos(progress[course].completedVideos || []);
      }
    }
  }, [course, sampleComments]);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleVideoEnd = () => {
    const currentIndex = videoList.findIndex(video => video.id === currentVideo);
    
    // Mark current video as completed
    if (!completedVideos.includes(currentVideo)) {
      const newCompleted = [...completedVideos, currentVideo];
      setCompletedVideos(newCompleted);
      
      // Update progress in localStorage
      const savedProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
      if (!savedProgress[course]) {
        savedProgress[course] = { completedVideos: [], currentVideo: 0, totalProgress: 0 };
      }
      savedProgress[course].completedVideos = newCompleted;
      savedProgress[course].totalProgress = Math.round((newCompleted.length / videoList.length) * 100);
      localStorage.setItem('courseProgress', JSON.stringify(savedProgress));
      setUserProgress(savedProgress);
    }

    // Auto-play next video
    const nextIndex = (currentIndex + 1) % videoList.length;
    setCurrentVideo(videoList[nextIndex].id);
  };

  const handleVideoClick = (videoId) => {
    setCurrentVideo(videoId);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "You",
        text: newComment,
        timestamp: "Just now"
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const getCurrentVideoTitle = () => {
    const video = videoList.find(v => v.id === currentVideo);
    return video ? video.title : "Video";
  };

  const isVideoCompleted = (videoId) => {
    return completedVideos.includes(videoId);
  };

  return (
    <div className="layout-container">
      <div className="left-section">
        {/* Main Video Section */}
        <div className="main-video-section">
          <div className="video-header">
            <h2>{getCurrentVideoTitle()}</h2>
            <div className="video-progress">
              Progress: {userProgress[course]?.totalProgress || 0}% Complete
            </div>
          </div>
          <div className="video-container">
            <YouTube
              videoId={currentVideo}
              opts={{
                playerVars: {
                  autoplay: 1,
                },
              }}
              onEnd={handleVideoEnd}
              className="youtube-player"
            />
          </div>
        </div>

        {/* Review Section */}
        <div className="review-section">
          <h2 className="section-title">Course Reviews</h2>
          <div className="review-stats">
            <div className="rating-overview">
              <span className="rating-number">4.8</span>
              <div className="stars">★★★★★</div>
              <span className="review-count">(1,247 reviews)</span>
            </div>
          </div>
          <div className="review-item">
            <div className="reviewer-info">
              <strong>Sarah M.</strong> - Completed Course
            </div>
            <p className="review-text">"This course has been life-changing. The practical techniques and supportive community made all the difference in my mental health journey."</p>
          </div>
          <div className="review-item">
            <div className="reviewer-info">
              <strong>Alex K.</strong> - In Progress
            </div>
            <p className="review-text">"Excellent content and presentation. The videos are well-structured and easy to follow. Highly recommend!"</p>
          </div>
        </div>

        {/* Comment Section */}
        <div className="comment-section">
          <h2 className="section-title">Discussion ({comments.length})</h2>
          <form onSubmit={handleAddComment} className="comment-form">
            <textarea 
              className="comment-input" 
              placeholder="Share your thoughts about this video..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="3"
            />
            <button type="submit" className="comment-button">Add Comment</button>
          </form>

          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-timestamp">{comment.timestamp}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Right Section - Video Playlist */}
      <div className="right-section">
        <h2 className="section-title">Course Videos</h2>
        <div className="playlist-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(completedVideos.length / videoList.length) * 100}%` }}
            />
          </div>
          <span className="progress-text">
            {completedVideos.length} of {videoList.length} completed
          </span>
        </div>
        
        <div className="video-playlist">
          {videoList.map((video, index) => (
            <div
              key={video.id}
              className={`video-item ${currentVideo === video.id ? 'active' : ''} ${isVideoCompleted(video.id) ? 'completed' : ''}`}
              onClick={() => handleVideoClick(video.id)}
            >
              <div className="video-thumbnail-container">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  className="video-thumbnail"
                />
                <div className="video-overlay">
                  {isVideoCompleted(video.id) && <span className="completion-check">✓</span>}
                  <span className="video-duration">{video.duration}</span>
                </div>
              </div>
              <div className="video-info">
                <h3 className="video-title">
                  {index + 1}. {video.title}
                </h3>
                <p className="video-meta">Duration: {video.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoLayout;