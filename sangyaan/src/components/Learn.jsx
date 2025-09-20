import React, { useState, useEffect } from 'react';
import Adventure from './Adventure';
import TopicSelection from './TopicSelection';
import Level_view from './Level_view';
import learningData from '../data/learningData.json';
import './Learn.css';

const Learn = () => {
    const [currentView, setCurrentView] = useState('adventure'); // 'adventure', 'topicSelection', 'levelView'
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [userProgress, setUserProgress] = useState({});
    const [currentLevelData, setCurrentLevelData] = useState(null);

    useEffect(() => {
        // Load user progress from localStorage or API
        const savedProgress = localStorage.getItem('userProgress');
        if (savedProgress) {
            setUserProgress(JSON.parse(savedProgress));
        } else {
            setUserProgress(learningData.userProgress);
        }
    }, []);

    // Save progress to localStorage whenever it changes
    useEffect(() => {
        if (Object.keys(userProgress).length > 0) {
            localStorage.setItem('userProgress', JSON.stringify(userProgress));
        }
    }, [userProgress]);

    const handleStartJourney = (subject) => {
        setSelectedSubject(subject);
        setCurrentView('topicSelection');
    };

    const handleResumeJourney = (subject) => {
        setSelectedSubject(subject);

        // Find the most recent topic for this subject
        const subjectProgress = userProgress[subject.id];
        if (subjectProgress) {
            let mostRecentTopic = null;
            let latestDate = null;

            Object.entries(subjectProgress).forEach(([topicId, topicProgress]) => {
                if (topicProgress.lastAccessed) {
                    const accessDate = new Date(topicProgress.lastAccessed);
                    if (!latestDate || accessDate > latestDate) {
                        latestDate = accessDate;
                        mostRecentTopic = topicId;
                    }
                }
            });

            if (mostRecentTopic) {
                const topic = subject.topics.find(t => t.id === mostRecentTopic);
                if (topic) {
                    setSelectedTopic(topic);
                    setCurrentView('levelView');

                    // Set current level data
                    const topicProgress = subjectProgress[mostRecentTopic];
                    setCurrentLevelData({
                        currentLevel: topicProgress.currentLevel,
                        completedLevels: topicProgress.completedLevels,
                        totalLevels: topic.totalLevels
                    });
                }
            }
        }
    };

    const handleTopicSelect = (subject, topic) => {
        setSelectedSubject(subject);
        setSelectedTopic(topic);
        setCurrentView('levelView');

        // Initialize or get existing progress for this topic
        const subjectProgress = userProgress[subject.id] || {};
        const topicProgress = subjectProgress[topic.id] || {
            currentLevel: 1,
            completedLevels: [],
            totalXP: 0,
            lastAccessed: new Date().toISOString().split('T')[0]
        };

        setCurrentLevelData({
            currentLevel: topicProgress.currentLevel,
            completedLevels: topicProgress.completedLevels,
            totalLevels: topic.totalLevels
        });

        // Update user progress
        const newProgress = {
            ...userProgress,
            [subject.id]: {
                ...subjectProgress,
                [topic.id]: {
                    ...topicProgress,
                    lastAccessed: new Date().toISOString().split('T')[0]
                }
            }
        };
        setUserProgress(newProgress);
    };

    const handleBackToSubjects = () => {
        setCurrentView('adventure');
        setSelectedSubject(null);
        setSelectedTopic(null);
        setCurrentLevelData(null);
    };

    const handleBackToTopics = () => {
        setCurrentView('topicSelection');
        setSelectedTopic(null);
        setCurrentLevelData(null);
    };

    const handleLevelClick = (levelNumber) => {
        if (!selectedSubject || !selectedTopic || !currentLevelData) return;

        // Check if level is accessible
        const isAccessible = levelNumber <= currentLevelData.currentLevel;
        if (!isAccessible) return;

        // Here you would typically navigate to the quiz/lesson for this level
        console.log(`Starting level ${levelNumber} for ${selectedTopic.name} in ${selectedSubject.name}`);

        // For demo purposes, let's simulate completing a level
        if (levelNumber === currentLevelData.currentLevel && !currentLevelData.completedLevels.includes(levelNumber)) {
            handleLevelComplete(levelNumber);
        }
    };

    const handleLevelComplete = (levelNumber) => {
        if (!selectedSubject || !selectedTopic) return;

        const subjectProgress = userProgress[selectedSubject.id] || {};
        const topicProgress = subjectProgress[selectedTopic.id] || {
            currentLevel: 1,
            completedLevels: [],
            totalXP: 0,
            lastAccessed: new Date().toISOString().split('T')[0]
        };

        const newCompletedLevels = [...topicProgress.completedLevels];
        if (!newCompletedLevels.includes(levelNumber)) {
            newCompletedLevels.push(levelNumber);
        }

        const newCurrentLevel = Math.min(levelNumber + 1, selectedTopic.totalLevels);
        const xpGained = 100; // XP per level

        const updatedTopicProgress = {
            ...topicProgress,
            currentLevel: newCurrentLevel,
            completedLevels: newCompletedLevels,
            totalXP: topicProgress.totalXP + xpGained,
            lastAccessed: new Date().toISOString().split('T')[0]
        };

        const newProgress = {
            ...userProgress,
            [selectedSubject.id]: {
                ...subjectProgress,
                [selectedTopic.id]: updatedTopicProgress
            }
        };

        setUserProgress(newProgress);
        setCurrentLevelData({
            currentLevel: newCurrentLevel,
            completedLevels: newCompletedLevels,
            totalLevels: selectedTopic.totalLevels
        });
    };

    const generateLevels = (totalLevels) => {
        return Array.from({ length: totalLevels }, (_, index) => index + 1);
    };

    return (
        <div className="learn-container">
            {currentView === 'adventure' && (
                <Adventure
                    onStartJourney={handleStartJourney}
                    onResumeJourney={handleResumeJourney}
                />
            )}

            {currentView === 'topicSelection' && selectedSubject && (
                <TopicSelection
                    subject={selectedSubject}
                    onTopicSelect={handleTopicSelect}
                    onBack={handleBackToSubjects}
                />
            )}

            {currentView === 'levelView' && selectedSubject && selectedTopic && currentLevelData && (
                <div className="level-view-container">
                    <div className="level-header">
                        <button className="back-btn" onClick={handleBackToTopics}>
                            ← Back to Topics
                        </button>
                        <div className="current-path">
                            <div className="path-info">
                                <span className="subject-name" style={{ color: selectedSubject.color }}>
                                    {selectedSubject.name}
                                </span>
                                <span className="path-separator">→</span>
                                <span className="topic-name">{selectedTopic.name}</span>
                            </div>
                            <div className="progress-summary">
                                <span className="progress-text">
                                    Level {currentLevelData.currentLevel} of {currentLevelData.totalLevels}
                                </span>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${(currentLevelData.completedLevels.length / currentLevelData.totalLevels) * 100}%`,
                                            backgroundColor: selectedSubject.color
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="level-content">
                        <div className="topic-info-banner">
                            <div className="topic-icon-large">
                                <span>{selectedTopic.icon}</span>
                            </div>
                            <div className="topic-details">
                                <h2>{selectedTopic.name}</h2>
                                <p>{selectedTopic.description}</p>
                                <div className="topic-stats">
                                    <span className="stat">
                                        ✅ {currentLevelData.completedLevels.length} completed
                                    </span>
                                    <span className="stat">
                                        🎯 {currentLevelData.totalLevels - currentLevelData.completedLevels.length} remaining
                                    </span>
                                    <span className="stat">
                                        🏆 {currentLevelData.completedLevels.length * 100} XP earned
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Level_view
                            levels={generateLevels(currentLevelData.totalLevels)}
                            currentLevel={currentLevelData.currentLevel}
                            onLevelClick={handleLevelClick}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Learn;