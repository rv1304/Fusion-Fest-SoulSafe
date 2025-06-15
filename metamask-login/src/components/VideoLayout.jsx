import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to capture the course parameter
import YouTube from "react-youtube";
import "./VideoLayout.css"; // Import the CSS file

const VideoLayout = () => {
  const { course } = useParams(); // Get the course name or ID from the URL
  const [currentVideo, setCurrentVideo] = useState("dQw4w9WgXcQ"); // Default video ID
  const videoList = [
    "dQw4w9WgXcQ", // Example video IDs
    "3JZ_D3ELwOQ",
    "V-_O7nl0Ii0",
    "kJQP7kiw5Fk",
    "tgbNymZ7vqY",
  ];

  // Update current video based on the course
  useEffect(() => {
    if (course === "React for Beginners") {
      setCurrentVideo("dQw4w9WgXcQ"); // Set React-related video as default
    } else if (course === "Mastering Node.js") {
      setCurrentVideo("3JZ_D3ELwOQ"); // Set Node.js-related video as default
    } else if (course === "Understanding TypeScript") {
      setCurrentVideo("V-_O7nl0Ii0"); // Set TypeScript-related video as default
    }
    // Add more course-specific video logic here
  }, [course]);

  const handleVideoEnd = () => {
    const currentIndex = videoList.indexOf(currentVideo);
    const nextIndex = (currentIndex + 1) % videoList.length;
    setCurrentVideo(videoList[nextIndex]);
  };

  const handleVideoClick = (videoId) => {
    setCurrentVideo(videoId);
  };

  return (
    <div className="layout-container">
      {/* Main Video Section */}
      <div className="main-video-section">
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

        {/* Review Section */}
        <div className="review-section">
          <h2 className="section-title">Reviews</h2>
          <p className="review-text">"This video was very informative and well presented. I learned a lot!"</p>
          <p className="review-text">"Amazing content! Keep up the good work."</p>
        </div>

        {/* Comment Section */}
        <div className="comment-section">
          <h2 className="section-title">Comments</h2>
          <textarea className="comment-input" placeholder="Add a comment..."></textarea>
          <button className="comment-button">Add Comment</button>

          <div className="comments-list">
            <div className="comment-item">
              <p className="comment-author">John Doe</p>
              <p className="comment-text">Great video! Very helpful.</p>
            </div>
            <div className="comment-item">
              <p className="comment-author">Jane Smith</p>
              <p className="comment-text">I love the examples you used!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Videos */}
      <div className="suggested-videos">
        <h2 className="section-title">Suggested Videos</h2>
        {videoList.map((videoId, index) => (
          <div
            key={index}
            className="video-item"
            onClick={() => handleVideoClick(videoId)}
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
              alt={`Video ${index + 1} Thumbnail`}
              className="video-thumbnail"
            />
            <div className="video-info">
              <h3 className="video-title">Video Title {index + 1}</h3>
              <p className="video-channel">Channel Name</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoLayout;
