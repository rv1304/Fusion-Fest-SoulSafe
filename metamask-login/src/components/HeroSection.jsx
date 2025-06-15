"use client";

import { useEffect } from "react";
import m from "../assets/meditation.gif";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import './HeroSection.css'; // Import your CSS file

export default function HeroSection() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const goToLogin = () => {
    navigate("/login"); // Navigate to LoginPage
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with options
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        {/* Navbar */}
        <nav className="navbar">
          <h1>SoulSafe 🫀</h1>
          <ul>
            <li>About Us</li>
            <li>Features</li>
            <li>Wellness Challenges</li>
            <li>Testimonials</li>
            <li>Contact Us</li>
          </ul>
          <button onClick={goToLogin}>Login</button>
        </nav>

        {/* Hero Content */}
        <div className="hero-content">
          <h1>Unlock Your Journey to Mental Wellness</h1>
          <p>
            Discover personalized therapy,
            <br /> mindfulness challenges, and support
            <br />
            groups—all in one platform. Start your transformation today.
          </p>
          <button onClick={goToLogin}>Get Started Now</button>
        </div>

        {/* Floating Boxes */}
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={index}
            className="floating-box"
            style={{
              width: `${4 + index * 2}rem`,
              height: `${4 + index * 2}rem`,
              backgroundColor: index % 2 === 0 ? "black" : "white",
              top: `${10 + index * 16}%`,
              left: index % 2 === 0 ? "20%" : "75%",
            }}
            animate={{ y: [0, -50, 50] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          />
        ))}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div style={{ textAlign: "center" }}>
          <h3>Features</h3>
          <h2>Empower Your Mental Health Journey</h2>
          <p>
            Secure, Anonymous and Personalized <br /> Features to Support Your Growth
          </p>
        </div>
        <section style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {/* Feature 1 */}
          <div className="feature-card" data-aos="fade-up" style={{ textAlign: "center" }}>
            <div>📩</div>
            <h3>Decentralized Data Storage</h3>
            <p>
              Ensures secure and private storage of user information, leveraging blockchain technology for ultimate data control.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card" data-aos="fade-up" style={{ textAlign: "center" }}>
            <div>⚡</div>
            <h3>Tokenized Rewards System</h3>
            <p>
              Encourages positive behavioral changes by rewarding users with tokens and milestone-based NFTs for their progress.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card" data-aos="fade-up" style={{ textAlign: "center" }}>
            <div>📈</div>
            <h3>Personalized Wellness Plans</h3>
            <p>
              Offers tailored mental health resources and suggestions based on user preferences, progress, and goals.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card" data-aos="fade-up" style={{ textAlign: "center" }}>
            <div>💬</div>
            <h3>Access to Virtual Therapy</h3>
            <p>
              Provides easy access to licensed therapists for private, secure, and affordable online consultations.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="feature-card" data-aos="fade-up" style={{ textAlign: "center" }}>
            <div>🌍</div>
            <h3>Inclusive and Safe Space</h3>
            <p>
              Promotes a judgment-free, inclusive community for individuals from diverse backgrounds to connect and share experiences.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="feature-card" data-aos="fade-up" style={{ textAlign: "center" }}>
            <div>🔒</div>
            <h3>Anonymity-Driven Interaction</h3>
            <p>
              Offers anonymous user profiles, enabling individuals to seek mental health support without revealing their identity.
            </p>
          </div>
        </section>
        <hr className="border-gray-300" />

        {/* Wellness Challenge Section */}
        <section className="wellness-challenge-section">
          <h3>Wellness Challenges</h3>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
            {/* Text Content */}
            <div className="ll">
              <div className="md:w-1/2 text-center md:text-left" data-aos="fade-right">
                <p>
                  Join our unique 7-day Wellness Challenge designed to help you embrace better mental health practices.
                  Each day, discover simple, achievable tasks that empower your mind and soul. From mindfulness exercises
                  to journaling prompts, we've got your journey to wellness covered. And the best part? <br /> Stay anonymous,
                  stay safe and focus on you.
                </p>
              </div>
              {/* Image */}
              <div className="md:w-3/4 flex justify-center" data-aos="fade-left">
                <img
                  src={m} // Replace this with the correct image path
                  alt="Wellness Challenge Illustration"
                  className="w-full max-w-lg rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-300" />

        {/* Contact Us Section */}
        <section className="contact-section">
          <div className="container">
            <h2>Contact Us</h2>
            <p>We'd love to hear from you! Get in touch with us for any queries or feedback.</p>

            <div className="contact-wrapper">
              {/* Get in Touch Section */}
              <div className="contact-info">
                <h3>Get in Touch</h3>
                <p>If you have any questions, feel free to reach out to us:</p>
                <div className="contact-item">
                  <span className="icon">📍</span>
                  <p>123 Main Street, Cityville, Country</p>
                </div>
                <div className="contact-item">
                  <span className="icon">📧</span>
                  <p>support@example.com</p>
                </div>
                <div className="contact-item">
                  <span className="icon">📞</span>
                  <p>+1 (234) 567-890</p>
                </div>

                {/* Social Media Buttons */}
                <div className="social-buttons">
                  <button title="Facebook">F</button>
                  <button title="Twitter">T</button>
                  <button title="Instagram">I</button>
                </div>
              </div>

              {/* Contact Form Section */}
              <div className="contact-form">
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Your Message" rows="5" required></textarea>
                  </div>
                  <button type="submit">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
