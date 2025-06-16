"use client";

import { useEffect } from "react";
import m from "../assets/meditation.gif";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import './HeroSection.css';

export default function HeroSection() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const testimonials = [
    {
      name: "True Buddy",
      role: "Engineer",
      text: "This website has been an incredible support system for me. The resources are easy to understand and genuinely helpful, and the community feels so welcoming and judgment-free. It's comforting to know there's a place where mental health is treated with the care it deserves. Highly recommend it to anyone seeking guidance or just someone to listen."
    },
    {
      name: "KindHeart",
      role: "Housewife",
      text: "The anonymous support feature gave me the courage to seek help when I needed it most. The wellness challenges are practical and achievable, making my mental health journey feel manageable and rewarding."
    },
    {
      name: "NiceHuman",
      role: "Nurse",
      text: "As a healthcare worker, I appreciate the professional approach to mental health resources here. The tokenized rewards system motivates me to maintain consistent self-care practices, and the community support is invaluable."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        {/* Navbar */}
        <nav className="navbar">
          <h1>SoulSafe 🫀</h1>
          <ul>
            <li onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>About Us</li>
            <li onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>Features</li>
            <li onClick={() => document.getElementById('wellness').scrollIntoView({ behavior: 'smooth' })}>Wellness Challenges</li>
            <li onClick={() => document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' })}>Testimonials</li>
            <li onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Contact Us</li>
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
      <section id="features" className="features-section">
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
        <section id="wellness" className="wellness-challenge-section">
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
                  src={m}
                  alt="Wellness Challenge Illustration"
                  className="w-full max-w-lg rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-300" />

        {/* Testimonials Section */}
        <section id="testimonials" className="testimonials-section" style={{ padding: "5rem 2rem", backgroundColor: "#0d1117" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2.5rem", color: "#d53f8c", marginBottom: "1rem" }}>What Our Clients Say About Us</h2>
            <p style={{ color: "#b0b3b8", fontSize: "1.2rem" }}>Real stories from real people who found their path to wellness</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 200}
                style={{
                  backgroundColor: "#1c2430",
                  padding: "2rem",
                  borderRadius: "12px",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => e.target.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <h4 style={{ color: "#ff79c6", fontSize: "1.2rem", marginBottom: "0.5rem" }}>{testimonial.name}</h4>
                  <p style={{ color: "#8b949e", fontSize: "0.9rem" }}>{testimonial.role}</p>
                </div>
                <p style={{ color: "#e6edf3", lineHeight: "1.6", fontSize: "1rem" }}>"{testimonial.text}"</p>
                <div style={{ marginTop: "1rem", color: "#ffd700" }}>
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="contact-section">
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
                  <p>SoulSafe Chandigarh, India</p>
                </div>
                <div className="contact-item">
                  <span className="icon">📧</span>
                  <p>SoulSafe@gmail.com</p>
                </div>
                <div className="contact-item">
                  <span className="icon">📞</span>
                  <p>+91 9988776655</p>
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
                    <input type="email" placeholder="Your Email" required />
                  </div>
                  <div className="form-group">
                    <select style={{ width: "100%", padding: "1rem", marginBottom: "1rem", backgroundColor: "#2e3a4c", color: "#cbd5e0", border: "1px solid transparent", borderRadius: "5px" }}>
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Therapy Services</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Write your message..." rows="5" required></textarea>
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