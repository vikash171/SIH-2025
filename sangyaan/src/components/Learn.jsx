/**
 * Learn Page Component
 * 
 * Purpose: Main learning page with zigzag level progression
 * Parent Component: App.jsx
 * 
 * Features:
 * - Zigzag learning path layout
 * - Level progression tracking
 * - Interactive level nodes
 * - Progress indicators
 */

import { useState, useEffect } from 'react';
import Quiz from './Quiz';


const Learn = ({ onNavigate }) => {
    const [gems, setGems] = useState(510);
    const [hearts, setHearts] = useState(5);
    const [currentTime, setCurrentTime] = useState('');
    const [levels, setLevels] = useState([
        { id: 1, type: 'active', icon: 'fas fa-font', tooltip: 'Basic Vocabulary', stars: 0 },
        { id: 2, type: 'completed', icon: 'fas fa-star', tooltip: 'Completed Lesson', stars: 3 },
        { id: 3, type: 'completed', icon: 'fas fa-book', tooltip: 'Reading Practice', stars: 2 },
        { id: 4, type: 'challenge', icon: 'fas fa-skull', tooltip: 'Challenge Level', stars: 3, special: 'skull-node' },
        { id: 5, type: 'available', icon: 'fas fa-headphones', tooltip: 'Listening Practice', stars: 0 },
        { id: 6, type: 'locked', icon: 'fas fa-lock', tooltip: 'Locked', stars: 0 },
        { id: 7, type: 'treasure', icon: 'fas fa-treasure-chest', tooltip: 'Treasure Reward', stars: 0, special: 'treasure-node' },
        { id: 8, type: 'locked', icon: 'fas fa-lock', tooltip: 'Locked', stars: 0 },
        { id: 9, type: 'trophy', icon: 'fas fa-trophy', tooltip: 'Achievement Reward', stars: 0, special: 'trophy-node' }
    ]);

    // Update time
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };
        
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleStartClick = () => {
        if (hearts > 0) {
            setHearts(hearts - 1);
            
            // Simulate learning process
            setTimeout(() => {
                // Complete current level and activate next
                setLevels(prevLevels => {
                    const newLevels = [...prevLevels];
                    
                    // Find active level and complete it
                    const activeIndex = newLevels.findIndex(level => level.type === 'active');
                    if (activeIndex !== -1) {
                        newLevels[activeIndex] = {
                            ...newLevels[activeIndex],
                            type: 'completed',
                            stars: Math.floor(Math.random() * 3) + 1
                        };
                        
                        // Activate next available level
                        const nextIndex = activeIndex + 1;
                        if (nextIndex < newLevels.length && newLevels[nextIndex].type === 'locked') {
                            newLevels[nextIndex] = {
                                ...newLevels[nextIndex],
                                type: 'active',
                                icon: 'fas fa-star'
                            };
                        }
                    }
                    
                    return newLevels;
                });
                
                // Add gems
                setGems(gems + 10);
            }, 2000);
        }
    };

    const handleLevelClick = (level) => {
        if (level.type === 'locked') {
            // Shake animation handled by CSS
            return;
        }
        
        if (level.special === 'skull-node') {
            alert('Challenge Level: This is a difficult test. Are you ready?');
        } else if (level.special === 'treasure-node') {
            const bonus = Math.floor(Math.random() * 50) + 20;
            setGems(gems + bonus);
            alert(`+${bonus} gems!`);
        } else if (level.special === 'trophy-node') {
            alert('Congratulations on your achievement!');
        } else if (level.type === 'active') {
            handleStartClick();
        }
    };

    const getLevelClassName = (level) => {
        let className = 'level-node';
        
        if (level.special) {
            className += ` special-node ${level.special}`;
        } else {
            className += ` ${level.type}`;
        }
        
        return className;
    };

    return (
        <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: 'white', minHeight: '100vh', padding: '20px' }}>
                
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px 20px',
                    backgroundColor: '#58cc02',
                    color: 'white',
                    borderRadius: '10px',
                    marginBottom: '20px'
                }}>
                    <button 
                        onClick={() => onNavigate('homepage')}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        ← {currentTime}
                    </button>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            padding: '5px 10px',
                            borderRadius: '20px'
                        }}>
                            <i className="fas fa-gem"></i>
                            <span>{gems}</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            padding: '5px 10px',
                            borderRadius: '20px'
                        }}>
                            <i className="fas fa-heart"></i>
                            <span>{hearts}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ padding: '20px' }}>
                    <h2 style={{
                        color: '#58cc02',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '30px',
                        textAlign: 'center'
                    }}>
                        SECTION 1, UNIT 1 - STEM Learning Path
                    </h2>
                    
                    {/* Start Button */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: '40px 0'
                    }}>
                        <button
                            onClick={handleStartClick}
                            disabled={hearts === 0}
                            style={{
                                backgroundColor: hearts > 0 ? '#58cc02' : '#ccc',
                                color: 'white',
                                border: 'none',
                                borderRadius: '30px',
                                padding: '15px 40px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                cursor: hearts > 0 ? 'pointer' : 'not-allowed',
                                boxShadow: hearts > 0 ? '0 4px 0 #4aa300' : '0 4px 0 #999',
                                transition: 'all 0.2s'
                            }}
                        >
                            {hearts > 0 ? 'START' : 'Not enough hearts!'}
                        </button>
                    </div>

                    {/* Vertical Learning Path */}
                    <div style={{
                        position: 'relative',
                        padding: '20px 0',
                        maxHeight: '60vh',
                        overflowY: 'auto',
                        overflowX: 'hidden'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                            padding: '20px'
                        }}>
                            {/* Vertical Path Line */}
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                bottom: '0',
                                left: '50%',
                                width: '4px',
                                backgroundColor: '#e0e0e0',
                                zIndex: 1,
                                transform: 'translateX(-50%)'
                            }}></div>
                            
                            {levels.map((level, index) => (
                                <div key={level.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    marginBottom: '40px',
                                    position: 'relative',
                                    zIndex: 2
                                }}>
                                    {/* Left side content for odd indices */}
                                    {index % 2 === 1 && (
                                        <div style={{
                                            flex: 1,
                                            textAlign: 'right',
                                            paddingRight: '30px'
                                        }}>
                                            <div style={{
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                color: '#333',
                                                marginBottom: '5px'
                                            }}>
                                                {level.tooltip}
                                            </div>
                                            {level.stars > 0 && (
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '3px' }}>
                                                    {[...Array(3)].map((_, starIndex) => (
                                                        <i 
                                                            key={starIndex}
                                                            className={starIndex < level.stars ? 'fas fa-star' : 'far fa-star'}
                                                            style={{
                                                                color: '#ffc107',
                                                                fontSize: '16px'
                                                            }}
                                                        ></i>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Level Node */}
                                    <div
                                        className={getLevelClassName(level)}
                                        onClick={() => handleLevelClick(level)}
                                        style={{
                                            width: level.special ? '80px' : '70px',
                                            height: level.special ? '80px' : '70px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative',
                                            zIndex: 3,
                                            cursor: level.type === 'locked' ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.3s',
                                            fontSize: level.special ? '30px' : '24px',
                                            color: 'white',
                                            flexShrink: 0,
                                            backgroundColor: 
                                                level.type === 'completed' ? '#1cb0f6' :
                                                level.type === 'active' ? '#58cc02' :
                                                level.special === 'skull-node' ? '#e74c3c' :
                                                level.special === 'treasure-node' ? '#f39c12' :
                                                level.special === 'trophy-node' ? '#9b59b6' :
                                                level.type === 'locked' ? '#ccc' : '#58cc02',
                                            boxShadow: level.type === 'active' ? '0 0 15px rgba(88, 204, 2, 0.5)' : 
                                                      level.special ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (level.type !== 'locked') {
                                                e.target.style.transform = 'scale(1.1)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.transform = 'scale(1)';
                                        }}
                                    >
                                        <i className={level.icon}></i>
                                    </div>

                                    {/* Right side content for even indices */}
                                    {index % 2 === 0 && (
                                        <div style={{
                                            flex: 1,
                                            textAlign: 'left',
                                            paddingLeft: '30px'
                                        }}>
                                            <div style={{
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                color: '#333',
                                                marginBottom: '5px'
                                            }}>
                                                {level.tooltip}
                                            </div>
                                            {level.stars > 0 && (
                                                <div style={{ display: 'flex', gap: '3px' }}>
                                                    {[...Array(3)].map((_, starIndex) => (
                                                        <i 
                                                            key={starIndex}
                                                            className={starIndex < level.stars ? 'fas fa-star' : 'far fa-star'}
                                                            style={{
                                                                color: '#ffc107',
                                                                fontSize: '16px'
                                                            }}
                                                        ></i>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .level-node.locked:active {
                    animation: shake 0.5s;
                }
                
                /* Custom scrollbar for the path container */
                div::-webkit-scrollbar {
                    width: 8px;
                }
                
                div::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }
                
                div::-webkit-scrollbar-thumb {
                    background: #58cc02;
                    border-radius: 4px;
                }
                
                div::-webkit-scrollbar-thumb:hover {
                    background: #4aa300;
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                
                @keyframes bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }
                
                /* Smooth scrolling */
                * {
                    scroll-behavior: smooth;
                }
                
                @media (max-width: 768px) {
                    .level-node {
                        width: 60px !important;
                        height: 60px !important;
                        font-size: 20px !important;
                    }
                    
                    .special-node {
                        width: 70px !important;
                        height: 70px !important;
                        font-size: 25px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Learn;