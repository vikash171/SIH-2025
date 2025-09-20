/**
 * Virtual Lab Page Component
 * 
 * Purpose: Main virtual lab page that displays available labs
 * Parent Component: App.jsx
 * 
 * Features:
 * - Shows multiple labs including Circuit Lab
 * - Clean, focused design
 * - Handles lab interactions
 * - Gamified stats display
 */

import { useState } from 'react';
import Lab from './Lab';
import Profile from './Profile';
import ChemistryLab from './ChemistryLab';
import CircuitLab from './CircuitLab';

const VirtualLab = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('dashboard');

    // Mock data for labs
    const mockLabs = {
        physics: {
            title: "Wave Interference Lab",
            subject: "physics",
            duration: "45 min",
            difficulty: "intermediate",
            description: "Study wave patterns and interference phenomena using interactive simulations",
            isCompleted: false,
            rating: 3
        },
        chemistry: {
            title: "Chemical Reactions Lab",
            subject: "chemistry",
            duration: "30 min",
            difficulty: "beginner",
            description: "Explore chemical reactions and predict products safely",
            isCompleted: false,
            rating: 0
        },
        electronics: {
            title: "Circuit Building Lab",
            subject: "electronics",
            duration: "60 min",
            difficulty: "intermediate",
            description: "Build and test electronic circuits with virtual components",
            isCompleted: false,
            rating: 0
        }
    };

    const handleLabClick = (labData) => {
        console.log('Starting lab:', labData);
        setActiveTab(labData.subject);
    };

    const handleBackClick = () => {
        if (activeTab === 'dashboard') {
            onNavigate('homepage');
        } else {
            setActiveTab('dashboard');
        }
    };

    return (
        <div className="min-h-screen transition-all duration-300" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
            {/* Header */}
            <header className="theme-card shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleBackClick}
                                className="text-gray-600 hover:opacity-70 transition"
                            >
                                ← Back to Dashboard
                            </button>
                            <h1 className="text-2xl font-bold theme-text">Virtual Labs</h1>
                        </div>
                        <Profile
                            userName="Alex Johnson"
                            userLevel="Level 12 Explorer"
                            userXP={2450}
                            userStreak={7}
                            showNotification={false}
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="theme-card rounded-xl p-6 shadow-sm text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <span className="text-purple-500 text-2xl">🧪</span>
                        </div>
                        <div className="text-2xl font-bold theme-text">3</div>
                        <div className="text-sm text-gray-600">Available Labs</div>
                    </div>

                    <div className="theme-card rounded-xl p-6 shadow-sm text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <span className="text-green-500 text-2xl">✅</span>
                        </div>
                        <div className="text-2xl font-bold theme-text">0</div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>

                    <div className="theme-card rounded-xl p-6 shadow-sm text-center">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <span className="text-yellow-500 text-2xl">⭐</span>
                        </div>
                        <div className="text-2xl font-bold theme-text">0</div>
                        <div className="text-sm text-gray-600">Total Stars</div>
                    </div>
                </div>

                {activeTab === 'dashboard' && (
                    <>
                        {/* Featured Labs */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold theme-text mb-4">Available Labs</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <Lab
                                    {...mockLabs.physics}
                                    onLabClick={handleLabClick}
                                />
                                <Lab
                                    {...mockLabs.chemistry}
                                    onLabClick={handleLabClick}
                                />
                                <Lab
                                    {...mockLabs.electronics}
                                    onLabClick={handleLabClick}
                                />
                            </div>
                        </div>

                        {/* Lab Categories */}
                        <div className="theme-card rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold theme-text mb-4">Lab Categories</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div
                                    className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition"
                                    onClick={() => handleLabClick(mockLabs.physics)}
                                >
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-500 text-xl">⚛️</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold theme-text">Physics Labs</h4>
                                        <p className="text-sm text-gray-600">Wave experiments</p>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl cursor-pointer hover:bg-green-100 transition"
                                    onClick={() => handleLabClick(mockLabs.chemistry)}
                                >
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-green-500 text-xl">🧪</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold theme-text">Chemistry Labs</h4>
                                        <p className="text-sm text-gray-600">Chemical reactions</p>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl cursor-pointer hover:bg-orange-100 transition"
                                    onClick={() => handleLabClick(mockLabs.electronics)}
                                >
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <span className="text-orange-500 text-xl">⚡</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold theme-text">Electronics Labs</h4>
                                        <p className="text-sm text-gray-600">Circuit building</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Lab Components */}
                {activeTab === 'chemistry' && <ChemistryLab />}
                {activeTab === 'electronics' && <CircuitLab />}
                {activeTab === 'physics' && (
                    <div className="max-w-md mx-auto">
                        <Lab
                            {...mockLabs.physics}
                            onLabClick={handleLabClick}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default VirtualLab;