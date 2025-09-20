import React, { useState } from 'react';
import './TopicSelection.css';

const TopicSelection = ({ subject, onTopicSelect, onBack }) => {
    const [selectedTopic, setSelectedTopic] = useState(null);

    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
    };

    const handleStartTopic = () => {
        if (selectedTopic) {
            onTopicSelect(subject, selectedTopic);
        }
    };

    return (
        <div className="topic-selection-container">
            <div className="topic-header">
                <button className="back-btn" onClick={onBack}>
                    ← Back to Subjects
                </button>
                <div className="subject-info">
                    <div className="subject-icon-large">
                        <span>{subject.icon}</span>
                    </div>
                    <h1 style={{ color: subject.color }}>{subject.name}</h1>
                    <p>{subject.description}</p>
                </div>
            </div>

            <div className="topic-content">
                <h2>Choose Your Learning Path</h2>
                <p className="selection-hint">
                    Select a topic to begin your journey. You can switch between topics anytime!
                </p>

                <div className="topics-grid">
                    {subject.topics.map((topic) => (
                        <div
                            key={topic.id}
                            className={`topic-card ${selectedTopic?.id === topic.id ? 'selected' : ''}`}
                            onClick={() => handleTopicClick(topic)}
                        >
                            <div className="topic-card-header">
                                <div className="topic-icon-container">
                                    <span className="topic-icon">{topic.icon}</span>
                                </div>
                                <div className={`difficulty-badge ${topic.difficulty.toLowerCase()}`}>
                                    {topic.difficulty}
                                </div>
                            </div>

                            <div className="topic-card-body">
                                <h3 className="topic-name">{topic.name}</h3>
                                <p className="topic-description">{topic.description}</p>

                                <div className="topic-stats">
                                    <div className="stat-item">
                                        <span className="stat-icon">📚</span>
                                        <span className="stat-text">{topic.totalLevels} Levels</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-icon">⏱️</span>
                                        <span className="stat-text">~{Math.ceil(topic.totalLevels * 1.5)}h</span>
                                    </div>
                                </div>
                            </div>

                            <div className="topic-card-footer">
                                <div className="level-preview">
                                    <span className="preview-text">Level progression:</span>
                                    <div className="level-dots">
                                        {[...Array(Math.min(topic.totalLevels, 10))].map((_, index) => (
                                            <div key={index} className="level-dot"></div>
                                        ))}
                                        {topic.totalLevels > 10 && <span className="more-levels">+{topic.totalLevels - 10}</span>}
                                    </div>
                                </div>
                            </div>

                            {selectedTopic?.id === topic.id && (
                                <div className="selection-indicator">
                                    <span>✓</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {selectedTopic && (
                    <div className="start-section">
                        <div className="selected-topic-info">
                            <h3>Ready to start with {selectedTopic.name}?</h3>
                            <p>
                                You'll begin with Level 1 and progress through {selectedTopic.totalLevels} challenging levels.
                                Each level builds on the previous one, so take your time and master each concept!
                            </p>

                            <div className="learning-path-preview">
                                <h4>What you'll learn:</h4>
                                <div className="learning-points">
                                    <div className="learning-point">
                                        <span className="point-icon">🎯</span>
                                        <span>Core concepts and fundamentals</span>
                                    </div>
                                    <div className="learning-point">
                                        <span className="point-icon">🧠</span>
                                        <span>Problem-solving techniques</span>
                                    </div>
                                    <div className="learning-point">
                                        <span className="point-icon">🏆</span>
                                        <span>Practical applications and examples</span>
                                    </div>
                                    <div className="learning-point">
                                        <span className="point-icon">⚡</span>
                                        <span>Advanced concepts and mastery</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            className="start-journey-btn"
                            style={{ backgroundColor: subject.color }}
                            onClick={handleStartTopic}
                        >
                            Start Learning Journey
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopicSelection;