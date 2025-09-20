/**
 * Leaderboard Page Component
 * 
 * Purpose: Simple leaderboard with vertical rankings in separate tabs
 * Parent Component: App.jsx
 * 
 * Features:
 * - Personal, School, and Global leaderboard tabs
 * - Uses modular Rank component for each entry
 * - Clean vertical layout
 * - Tab-based navigation between different leaderboards
 */

import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Profile from './Profile';
import Rank from './Rank';

const Leaderboard = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('personal');
    const { t } = useLanguage();

    const handleBackClick = () => {
        onNavigate('homepage');
    };

    // Mock data for different leaderboards
    const personalRankings = [
        { rank: 1, name: "Alex Johnson", avatar: "AJ", xp: 2450, badge: "👑", isCurrentUser: true }
    ];

    const schoolRankings = [
        { rank: 1, name: "Sarah Miller", avatar: "SM", xp: 2890, badge: "👑" },
        { rank: 2, name: "Mike Johnson", avatar: "MJ", xp: 2650, badge: "🥈" },
        { rank: 3, name: "Alex Johnson", avatar: "AJ", xp: 2450, badge: "🥉", isCurrentUser: true },
        { rank: 4, name: "Emma Davis", avatar: "ED", xp: 2380, badge: "⭐" },
        { rank: 5, name: "James Wilson", avatar: "JW", xp: 2290, badge: "⭐" },
        { rank: 6, name: "Lisa Chen", avatar: "LC", xp: 2150, badge: "⭐" },
        { rank: 7, name: "David Brown", avatar: "DB", xp: 2080, badge: "⭐" },
        { rank: 8, name: "Anna Garcia", avatar: "AG", xp: 1950, badge: "⭐" }
    ];

    const globalRankings = [
        { rank: 1, name: "Chen Wei", avatar: "CW", xp: 4850, school: "Beijing Tech", country: "🇨🇳", badge: "👑" },
        { rank: 2, name: "Raj Patel", avatar: "RP", xp: 4720, school: "Mumbai Science", country: "🇮🇳", badge: "🥈" },
        { rank: 3, name: "Maria Garcia", avatar: "MG", xp: 4650, school: "Madrid STEM", country: "🇪🇸", badge: "🥉" },
        { rank: 4, name: "John Smith", avatar: "JS", xp: 4580, school: "London Academy", country: "🇬🇧", badge: "⭐" },
        { rank: 5, name: "Yuki Tanaka", avatar: "YT", xp: 4520, school: "Tokyo Institute", country: "🇯🇵", badge: "⭐" },
        { rank: 6, name: "Sophie Laurent", avatar: "SL", xp: 4450, school: "Paris Sciences", country: "🇫🇷", badge: "⭐" },
        { rank: 7, name: "Marco Rossi", avatar: "MR", xp: 4380, school: "Rome Tech", country: "🇮🇹", badge: "⭐" },
        { rank: 8, name: "Anna Kowalski", avatar: "AK", xp: 4320, school: "Warsaw Academy", country: "🇵🇱", badge: "⭐" },
        { rank: 9, name: "Lars Andersen", avatar: "LA", xp: 4250, school: "Copenhagen STEM", country: "🇩🇰", badge: "⭐" },
        { rank: 10, name: "Elena Popov", avatar: "EP", xp: 4180, school: "Moscow Institute", country: "🇷🇺", badge: "⭐" },
        { rank: 15, name: "Alex Johnson", avatar: "AJ", xp: 2450, school: "Einstein High", country: "🇺🇸", badge: "⭐", isCurrentUser: true }
    ];

    const handleRankClick = (rankData) => {
        console.log('Clicked on rank:', rankData);
        // Handle rank click if needed
    };

    const renderPersonalTab = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 theme-accent animate-pulse-slow">
                    <span className="text-white font-bold text-2xl">A</span>
                </div>
                <h2 className="text-2xl font-bold theme-text mb-2">Alex Johnson</h2>
                <p className="text-gray-600">Level 12 Explorer</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="theme-card rounded-xl p-6 shadow-sm text-center">
                    <div className="text-3xl font-bold theme-text mb-2">#3</div>
                    <div className="text-sm text-gray-600">{t('schoolRank')}</div>
                </div>

                <div className="theme-card rounded-xl p-6 shadow-sm text-center">
                    <div className="text-3xl font-bold theme-text mb-2">2,450</div>
                    <div className="text-sm text-gray-600">{t('totalXP')}</div>
                </div>

                <div className="theme-card rounded-xl p-6 shadow-sm text-center">
                    <div className="text-3xl font-bold theme-text mb-2">15</div>
                    <div className="text-sm text-gray-600">{t('achievements')}</div>
                </div>
            </div>

            <div className="theme-card rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold theme-text mb-4">Your Position</h3>
                <div className="space-y-3">
                    {personalRankings.map((rank) => (
                        <Rank
                            key={rank.rank}
                            rank={rank.rank}
                            name={rank.name}
                            avatar={rank.avatar}
                            xp={rank.xp}
                            badge={rank.badge}
                            isCurrentUser={rank.isCurrentUser}
                            onClick={() => handleRankClick(rank)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    const renderSchoolTab = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold theme-text mb-2">Einstein High School</h2>
                <p className="text-gray-600">Class Rankings</p>
            </div>

            <div className="theme-card rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold theme-text mb-4">{t('schoolRank')}</h3>
                <div className="space-y-3">
                    {schoolRankings.map((rank) => (
                        <Rank
                            key={rank.rank}
                            rank={rank.rank}
                            name={rank.name}
                            avatar={rank.avatar}
                            xp={rank.xp}
                            badge={rank.badge}
                            isCurrentUser={rank.isCurrentUser}
                            onClick={() => handleRankClick(rank)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    const renderGlobalTab = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold theme-text mb-2">{t('globalRank')}</h2>
                <p className="text-gray-600">Top performers worldwide</p>
            </div>

            <div className="theme-card rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold theme-text mb-4">Global Rankings</h3>
                <div className="space-y-3">
                    {globalRankings.map((rank) => (
                        <Rank
                            key={rank.rank}
                            rank={rank.rank}
                            name={rank.name}
                            avatar={rank.avatar}
                            xp={rank.xp}
                            school={rank.school}
                            country={rank.country}
                            badge={rank.badge}
                            isCurrentUser={rank.isCurrentUser}
                            onClick={() => handleRankClick(rank)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

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
                                ← {t('backToDashboard')}
                            </button>
                            <h1 className="text-2xl font-bold theme-text">{t('leaderboard')}</h1>
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
                {/* Tab Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="theme-card rounded-2xl p-2 shadow-sm">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setActiveTab('personal')}
                                className={`px-6 py-3 rounded-xl font-semibold transition ${activeTab === 'personal'
                                        ? 'theme-primary text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                👤 {t('personalRank')}
                            </button>
                            <button
                                onClick={() => setActiveTab('school')}
                                className={`px-6 py-3 rounded-xl font-semibold transition ${activeTab === 'school'
                                        ? 'theme-primary text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                🏫 {t('schoolRank')}
                            </button>
                            <button
                                onClick={() => setActiveTab('global')}
                                className={`px-6 py-3 rounded-xl font-semibold transition ${activeTab === 'global'
                                        ? 'theme-primary text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                🌍 {t('globalRank')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="animate-fade-in">
                    {activeTab === 'personal' && renderPersonalTab()}
                    {activeTab === 'school' && renderSchoolTab()}
                    {activeTab === 'global' && renderGlobalTab()}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;