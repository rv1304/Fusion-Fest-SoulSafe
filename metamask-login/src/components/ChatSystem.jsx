import React, { useState, useEffect, useRef } from 'react';
import './ChatSystem.css';

const ChatSystem = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeUsers, setActiveUsers] = useState([
    { id: 1, name: 'Medix_Alpha', status: 'online', lastActive: '2 hrs' },
    { id: 2, name: 'KindHeart', status: 'online', lastActive: 'now' },
    { id: 3, name: 'Buddy_Alpha', status: 'away', lastActive: '5 min' },
    { id: 4, name: 'HealthGuard_209', status: 'online', lastActive: '1 hr' },
    { id: 5, name: 'WellnessSphere', status: 'offline', lastActive: '3 hrs' },
    { id: 6, name: 'thinkGOOD_543', status: 'online', lastActive: 'now' },
    { id: 7, name: 'BalanceMaker_242', status: 'online', lastActive: '30 min' }
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  // Sample messages for demonstration
  const sampleMessages = [
    { id: 1, sender: 'Medix_Alpha', text: 'Hey! How are you feeling today?', timestamp: new Date(Date.now() - 300000), isOwn: false },
    { id: 2, sender: 'You', text: 'Hi! I\'m doing better, thanks for asking. The meditation session really helped.', timestamp: new Date(Date.now() - 240000), isOwn: true },
    { id: 3, sender: 'Medix_Alpha', text: 'That\'s wonderful to hear! Consistency is key with mindfulness practices.', timestamp: new Date(Date.now() - 180000), isOwn: false },
    { id: 4, sender: 'You', text: 'Absolutely! I\'ve been doing the 10-minute morning routine you suggested.', timestamp: new Date(Date.now() - 120000), isOwn: true },
    { id: 5, sender: 'Medix_Alpha', text: 'Perfect! Remember, small steps lead to big changes. Keep it up! 💪', timestamp: new Date(Date.now() - 60000), isOwn: false }
  ];

  useEffect(() => {
    if (selectedUser) {
      setMessages(sampleMessages);
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      const message = {
        id: messages.length + 1,
        sender: 'You',
        text: newMessage,
        timestamp: new Date(),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate response after 2 seconds
      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          sender: selectedUser.name,
          text: getRandomResponse(),
          timestamp: new Date(),
          isOwn: false
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const getRandomResponse = () => {
    const responses = [
      "That's really insightful! Thanks for sharing.",
      "I understand how you feel. You're not alone in this.",
      "Have you tried the breathing exercise from yesterday's session?",
      "That sounds like great progress! Keep going!",
      "Remember to be kind to yourself. Healing takes time.",
      "Would you like to try a quick mindfulness exercise together?",
      "Your journey is unique and valid. Trust the process."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const filteredUsers = activeUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-system">
      <div className="chat-container">
        {/* Sidebar with users */}
        <div className="chat-sidebar">
          <div className="sidebar-header">
            <h2>Peer Support Network</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search friends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          
          <div className="users-list">
            {filteredUsers.map(user => (
              <div
                key={user.id}
                className={`user-item ${selectedUser?.id === user.id ? 'active' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="user-avatar">
                  <div className={`status-indicator ${user.status}`}></div>
                  {user.name.charAt(0)}
                </div>
                <div className="user-info">
                  <div className="user-name">{user.name}</div>
                  <div className="user-status">
                    {user.status === 'online' ? 'Online' : `Last active ${user.lastActive} ago`}
                  </div>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="chat-main">
          {selectedUser ? (
            <>
              <div className="chat-header">
                <div className="chat-user-info">
                  <div className="chat-avatar">
                    <div className={`status-indicator ${selectedUser.status}`}></div>
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <h3>{selectedUser.name}</h3>
                    <span className="status-text">
                      {selectedUser.status === 'online' ? 'Online now' : `Last seen ${selectedUser.lastActive} ago`}
                    </span>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="action-btn">📞</button>
                  <button className="action-btn">📹</button>
                  <button className="action-btn">ℹ️</button>
                </div>
              </div>

              <div className="messages-container">
                {messages.map(message => (
                  <div key={message.id} className={`message ${message.isOwn ? 'own' : 'other'}`}>
                    <div className="message-content">
                      <div className="message-text">{message.text}</div>
                      <div className="message-time">{formatTime(message.timestamp)}</div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="message-input-container">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="message-input"
                />
                <button type="submit" className="send-button">
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="welcome-message">
                <h3>Welcome to Peer Support Network</h3>
                <p>Select a friend from the sidebar to start a conversation.</p>
                <p>Remember: This is a safe, anonymous space for mental health support.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;