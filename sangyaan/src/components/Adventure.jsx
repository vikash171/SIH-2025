import React, { useState, useEffect } from 'react';
import learningData from '../data/learningData.json';
import './Adventure.css';

const Adventure = ({ onStartJourney, onResumeJourney }) => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [userProgress, setUserProgress] = useState({});

    useEffect(() => {
        setSubjects(learningData.subjects);
        setUserProgress(learningData.userProgress);
    }, []);

    const handleSubjectClick = (subject) => {
        setSelectedSubject(subject);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedSubject(null);
    };

    const handleStartNewJourney = () => {
        closeModal();
        onStartJourney(selectedSubject);
    };

    const handleResumeJourney = () => {
        closeModal();
        onResumeJourney(selectedSubject);
    };

    const getSubjectProgress = (subjectId) => {
        const progress = userProgress[subjectId];
        if (!progress) return { hasProgress: false, totalLevels: 0, completedLevels: 0 };

        let totalCompleted = 0;
        let totalLevels = 0;

        Object.values(progress).forEach(topicProgress => {
            totalCompleted += topicProgress.completedLevels.length;
            // Add current level if it has progress
            if (topicProgress.currentLevel > 1) {
                totalCompleted += 1;
            }
        });

        // Calculate total levels from subject data
        const subject = subjects.find(s => s.id === subjectId);
        if (subject) {
            totalLevels = subject.topics.reduce((sum, topic) => sum + topic.totalLevels, 0);
        }

        return {
            hasProgress: totalCompleted > 0,
            totalLevels,
            completedLevels: totalCompleted,
            percentage: totalLevels > 0 ? Math.round((totalCompleted / totalLevels) * 100) : 0
        };
    };

    const getMostRecentTopic = (subjectId) => {
        const progress = userProgress[subjectId];
        if (!progress) return null;

        let mostRecent = null;
        let latestDate = null;

        Object.entries(progress).forEach(([topicId, topicProgress]) => {
            if (topicProgress.lastAccessed) {
                const accessDate = new Date(topicProgress.lastAccessed);
                if (!latestDate || accessDate > latestDate) {
                    latestDate = accessDate;
                    mostRecent = topicId;
                }
            }
        });

        return mostRecent;
    };

    return (
        <div className="adventure-container">
            <header className="adventure-header">
                <h1>Adventure Awaits!</h1>
                <p>Choose your subject and start your learning quest.</p>
            </header>

            <main className="adventure-main">
                <div className="subjects-grid">
                    {subjects.map((subject) => {
                        const progress = getSubjectProgress(subject.id);
                        const recentTopic = getMostRecentTopic(subject.id);

                        return (
                            <div
                                key={subject.id}
                                className="subject-card"
                                onClick={() => handleSubjectClick(subject)}
                            >
                                <span className="subject-badge" style={{ backgroundColor: subject.color }}>
                                    {subject.badge}
                                </span>

                                <div className="subject-icon">
                                    <span className="icon-emoji">{subject.icon}</span>
                                </div>

                                <h2 className="subject-title">{subject.name}</h2>
                                <p className="subject-description">{subject.description}</p>

                                {progress.hasProgress && (
                                    <div className="progress-info">
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{
                                                    width: `${progress.percentage}%`,
                                                    backgroundColor: subject.color
                                                }}
                                            ></div>
                                        </div>
                                        <span className="progress-text">
                                            {progress.completedLevels}/{progress.totalLevels} levels completed
                                        </span>
                                    </div>
                                )}

                                <div className="subject-stats">
                                    <span className="stat">
                                        📚 {subject.topics.length} topics
                                    </span>
                                    <span className="stat">
                                        🎯 {subject.topics.reduce((sum, topic) => sum + topic.totalLevels, 0)} levels
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Modal */}
            {showModal && selectedSubject && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>
                            ×
                        </button>

                        <div className="modal-header">
                            <div className="modal-icon">
                                <span>{selectedSubject.icon}</span>
                            </div>
                            <h2 style={{ color: selectedSubject.color }}>
                                {selectedSubject.name} Adventure
                            </h2>
                        </div>

                        <div className="modal-body">
                            <p className="modal-description">
                                Welcome to {selectedSubject.name}! {selectedSubject.description}
                            </p>

                            <div className="topics-preview">
                                <h3>Available Topics:</h3>
                                <div className="topics-list">
                                    {selectedSubject.topics.map((topic) => (
                                        <div key={topic.id} className="topic-item">
                                            <span className="topic-icon">{topic.icon}</span>
                                            <div className="topic-info">
                                                <span className="topic-name">{topic.name}</span>
                                                <span className="topic-levels">{topic.totalLevels} levels</span>
                                            </div>
                                            <span className={`difficulty-badge ${topic.difficulty.toLowerCase()}`}>
                                                {topic.difficulty}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {(() => {
                                const progress = getSubjectProgress(selectedSubject.id);
                                const recentTopic = getMostRecentTopic(selectedSubject.id);

                                return (
                                    <div className="modal-actions">
                                        {progress.hasProgress ? (
                                            <>
                                                <div className="current-progress">
                                                    <h4>Your Progress</h4>
                                                    <div className="progress-summary">
                                                        <div className="progress-bar large">
                                                            <div
                                                                className="progress-fill"
                                                                style={{
                                                                    width: `${progress.percentage}%`,
                                                                    backgroundColor: selectedSubject.color
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <span className="progress-percentage">{progress.percentage}%</span>
                                                    </div>
                                                    <p className="progress-details">
                                                        {progress.completedLevels} of {progress.totalLevels} levels completed
                                                    </p>
                                                </div>

                                                <div className="action-buttons">
                                                    <button
                                                        className="resume-btn"
                                                        style={{ backgroundColor: selectedSubject.color }}
                                                        onClick={handleResumeJourney}
                                                    >
                                                        Resume Journey
                                                    </button>
                                                    <button
                                                        className="start-new-btn"
                                                        onClick={handleStartNewJourney}
                                                    >
                                                        Start New Path
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="action-buttons">
                                                <button
                                                    className="start-btn"
                                                    style={{ backgroundColor: selectedSubject.color }}
                                                    onClick={handleStartNewJourney}
                                                >
                                                    Start Your Quest!
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Adventure;