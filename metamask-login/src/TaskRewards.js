import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./TaskRewards.css";

const Task = () => {
  const [points, setPoints] = useState(0);
  const [walletAddress, setWalletAddress] = useState("Not connected");
  const [isTransactionInProgress, setIsTransactionInProgress] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);

  const tasks = [
    {
      id: 1,
      title: "Complete Daily Meditation",
      description: "Spend 10 minutes in mindful meditation",
      points: 2,
      category: "Mindfulness",
      icon: "🧘‍♀️"
    },
    {
      id: 2,
      title: "Watch Mental Health Video",
      description: "Complete a course video and leave a comment",
      points: 3,
      category: "Learning",
      icon: "📚"
    },
    {
      id: 3,
      title: "Connect with Community",
      description: "Send a supportive message to a peer",
      points: 2,
      category: "Social",
      icon: "💬"
    },
    {
      id: 4,
      title: "Practice Gratitude",
      description: "Write down 3 things you're grateful for",
      points: 1,
      category: "Reflection",
      icon: "🙏"
    },
    {
      id: 5,
      title: "Complete Wellness Challenge",
      description: "Finish today's wellness challenge activity",
      points: 4,
      category: "Challenge",
      icon: "🏆"
    },
    {
      id: 6,
      title: "Share Your Progress",
      description: "Post about your mental health journey",
      points: 3,
      category: "Sharing",
      icon: "📝"
    }
  ];

  // Connect to MetaMask on page load
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const initWeb3 = new Web3(window.ethereum);

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async () => {
          const userAccount = (await initWeb3.eth.getAccounts())[0];
          setWalletAddress(userAccount);
        })
        .catch((error) => {
          console.error("Error accessing account:", error);
          alert("Error connecting to MetaMask");
        });
    } else {
      alert("MetaMask not found. Please install MetaMask.");
    }

    // Load saved data
    const savedPoints = localStorage.getItem('userPoints');
    const savedCompleted = localStorage.getItem('completedTasks');
    const savedStreak = localStorage.getItem('dailyStreak');
    const savedEarned = localStorage.getItem('totalEarned');

    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedCompleted) setCompletedTasks(JSON.parse(savedCompleted));
    if (savedStreak) setDailyStreak(parseInt(savedStreak));
    if (savedEarned) setTotalEarned(parseFloat(savedEarned));
  }, []);

  const completeTask = async (taskId) => {
    if (isTransactionInProgress || completedTasks.includes(taskId)) return;

    const task = tasks.find(t => t.id === taskId);
    const newPoints = points + task.points;
    const newCompleted = [...completedTasks, taskId];

    setPoints(newPoints);
    setCompletedTasks(newCompleted);
    
    // Save to localStorage
    localStorage.setItem('userPoints', newPoints.toString());
    localStorage.setItem('completedTasks', JSON.stringify(newCompleted));

    // Check if user reached milestone for reward
    if (newPoints >= 10 && !isTransactionInProgress) {
      setIsTransactionInProgress(true);
      
      try {
        // Simulate blockchain reward (in real implementation, this would interact with smart contract)
        const rewardAmount = 0.001; // ETH
        const newTotal = totalEarned + rewardAmount;
        
        setTotalEarned(newTotal);
        setDailyStreak(dailyStreak + 1);
        localStorage.setItem('totalEarned', newTotal.toString());
        localStorage.setItem('dailyStreak', (dailyStreak + 1).toString());

        alert(
          `🎉 Congratulations! You've reached 10 points!\n` +
          `Reward: ${rewardAmount} ETH has been credited to your account.\n` +
          `Keep up the great work on your mental health journey!`
        );
        
        // Reset points after reward
        setPoints(0);
        setCompletedTasks([]);
        localStorage.setItem('userPoints', '0');
        localStorage.setItem('completedTasks', JSON.stringify([]));
        
      } catch (error) {
        console.error("Error processing reward:", error);
        alert("Reward processing failed. Please try again.");
      } finally {
        setIsTransactionInProgress(false);
      }
    } else {
      alert(`✅ Task completed! +${task.points} points\nTotal points: ${newPoints}`);
    }
  };

  const getProgressPercentage = () => {
    return Math.min((points / 10) * 100, 100);
  };

  const isTaskCompleted = (taskId) => {
    return completedTasks.includes(taskId);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Mindfulness': '#8b5cf6',
      'Learning': '#3b82f6',
      'Social': '#10b981',
      'Reflection': '#f59e0b',
      'Challenge': '#ef4444',
      'Sharing': '#ec4899'
    };
    return colors[category] || '#6b7280';
  };

  return (
    <div className="task-rewards-container">
      <div className="task-header">
        <h1>Daily Wellness Tasks</h1>
        <p>Complete tasks to earn points and unlock rewards for your mental health journey</p>
      </div>

      {/* Stats Dashboard */}
      <div className="stats-dashboard">
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>{points}</h3>
            <p>Current Points</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-info">
            <h3>{dailyStreak}</h3>
            <p>Day Streak</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>{totalEarned.toFixed(4)} ETH</h3>
            <p>Total Earned</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{completedTasks.length}</h3>
            <p>Tasks Completed</p>
          </div>
        </div>
      </div>

      {/* Progress to Next Reward */}
      <div className="progress-section">
        <h2>Progress to Next Reward</h2>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <div className="progress-text">
            {points}/10 points ({10 - points} points to next reward)
          </div>
        </div>
        <div className="reward-info">
          <span className="reward-amount">🎁 Next Reward: 0.001 ETH</span>
        </div>
      </div>

      {/* Wallet Info */}
      <div className="wallet-info">
        <h2>Wallet Information</h2>
        <div className="wallet-details">
          <div className="wallet-item">
            <span className="wallet-label">Address:</span>
            <span className="wallet-value">{walletAddress}</span>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="tasks-section">
        <h2>Available Tasks</h2>
        <div className="tasks-grid">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className={`task-card ${isTaskCompleted(task.id) ? 'completed' : ''}`}
            >
              <div className="task-header-card">
                <div className="task-icon">{task.icon}</div>
                <div 
                  className="task-category"
                  style={{ backgroundColor: getCategoryColor(task.category) }}
                >
                  {task.category}
                </div>
              </div>
              
              <div className="task-content">
                <h3 className="task-title">{task.title}</h3>
                <p className="task-description">{task.description}</p>
                
                <div className="task-footer">
                  <div className="task-points">
                    <span className="points-value">+{task.points}</span>
                    <span className="points-label">points</span>
                  </div>
                  
                  <button
                    onClick={() => completeTask(task.id)}
                    disabled={isTaskCompleted(task.id) || isTransactionInProgress}
                    className={`task-button ${isTaskCompleted(task.id) ? 'completed' : ''}`}
                  >
                    {isTaskCompleted(task.id) ? '✅ Completed' : 'Complete Task'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Section */}
      <div className="achievements-section">
        <h2>Recent Achievements</h2>
        <div className="achievements-grid">
          <div className="achievement-card">
            <div className="achievement-icon">🏅</div>
            <div className="achievement-info">
              <h4>First Steps</h4>
              <p>Completed your first task</p>
            </div>
          </div>
          <div className="achievement-card">
            <div className="achievement-icon">🌟</div>
            <div className="achievement-info">
              <h4>Consistent Learner</h4>
              <p>Watched 5 course videos</p>
            </div>
          </div>
          <div className="achievement-card">
            <div className="achievement-icon">🤝</div>
            <div className="achievement-info">
              <h4>Community Helper</h4>
              <p>Helped 3 community members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;