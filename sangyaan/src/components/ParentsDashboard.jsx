import React, { useState, useEffect } from 'react';
import studentDataJson from '../data/student_data.json';
import { useLanguage } from '../contexts/LanguageContext';

const ParentsDashboard = () => {
    const [childData, setChildData] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);
    const { t, currentLanguage, changeLanguage } = useLanguage();

    // Load child data from JSON
    useEffect(() => {
        setTimeout(() => {
            // Process the JSON data to match our component structure
            const processedData = {
                name: studentDataJson.personalInfo.fullName,
                grade: `Grade ${studentDataJson.academicInfo.grade}`,
                avatar: studentDataJson.personalInfo.avatar,
                overallProgress: studentDataJson.gameProgress.overallProgress,
                currentLevel: studentDataJson.gameProgress.currentLevel,
                weeklyStudyTime: studentDataJson.gameProgress.totalPlayTime.split(' ')[0] + 'h ' + studentDataJson.gameProgress.averageSessionTime,
                lastActive: "Today at 10:30 AM",
                
                // Calculate recent scores from subject progress
                recentScores: [
                    studentDataJson.subjectProgress.mathematics.averageScore,
                    studentDataJson.subjectProgress.physics.averageScore,
                    studentDataJson.subjectProgress.chemistry.averageScore,
                    studentDataJson.subjectProgress.biology.averageScore,
                    Math.round((studentDataJson.subjectProgress.mathematics.averageScore + studentDataJson.subjectProgress.physics.averageScore) / 2)
                ],
                
                subjects: [
                    { 
                        name: "Mathematics", 
                        progress: studentDataJson.subjectProgress.mathematics.progress, 
                        grade: getLetterGrade(studentDataJson.subjectProgress.mathematics.averageScore), 
                        teacher: "Dr. Smith" 
                    },
                    { 
                        name: "Physics", 
                        progress: studentDataJson.subjectProgress.physics.progress, 
                        grade: getLetterGrade(studentDataJson.subjectProgress.physics.averageScore), 
                        teacher: "Dr. Johnson" 
                    },
                    { 
                        name: "Chemistry", 
                        progress: studentDataJson.subjectProgress.chemistry.progress, 
                        grade: getLetterGrade(studentDataJson.subjectProgress.chemistry.averageScore), 
                        teacher: "Ms. Davis" 
                    },
                    { 
                        name: "Biology", 
                        progress: studentDataJson.subjectProgress.biology.progress, 
                        grade: getLetterGrade(studentDataJson.subjectProgress.biology.averageScore), 
                        teacher: "Mr. Wilson" 
                    }
                ],
                
                achievements: studentDataJson.achievements.badges.slice(0, 3).map(badge => ({
                    name: badge.name,
                    icon: badge.icon,
                    date: new Date(badge.earnedDate).toLocaleDateString(currentLanguage === 'hi' ? 'hi-IN' : 'en-US', { month: 'short', day: 'numeric' })
                })),
                
                weeklyActivity: Object.entries(studentDataJson.activityHistory.weeklyActivity).map(([day, data]) => ({
                    day: day.charAt(0).toUpperCase() + day.slice(1, 3),
                    minutes: data.minutes
                }))
            };
            
            setChildData(processedData);
            setIsLoading(false);
        }, 1000);
    }, [currentLanguage]);

    // Helper function to convert numeric score to letter grade
    const getLetterGrade = (score) => {
        if (score >= 95) return "A+";
        if (score >= 90) return "A";
        if (score >= 87) return "A-";
        if (score >= 83) return "B+";
        if (score >= 80) return "B";
        if (score >= 77) return "B-";
        if (score >= 73) return "C+";
        if (score >= 70) return "C";
        if (score >= 67) return "C-";
        if (score >= 63) return "D+";
        if (score >= 60) return "D";
        return "F";
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-blue-50 flex items-center justify-center">
                    <div className="text-center">
                    <div className="text-4xl mb-4">📚</div>
                    <div className="text-xl text-gray-600">{t('loading') || 'Loading...'}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                                {childData.avatar}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{childData.name}</h1>
                                <p className="text-lg text-gray-600">{childData.grade} • {t('parent.currentLevel')} {childData.currentLevel}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center justify-end space-x-2 mb-2">
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`px-2 py-1 rounded text-xs ${currentLanguage === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                >EN</button>
                                <button
                                    onClick={() => changeLanguage('hi')}
                                    className={`px-2 py-1 rounded text-xs ${currentLanguage === 'hi' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                >हिं</button>
                            </div>
                            <div className="text-sm text-gray-500">{t('parent.headerLastActive')}</div>
                            <div className="text-lg font-semibold text-green-600">{childData.lastActive}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-6xl mx-auto px-4 mt-6">
                <div className="bg-white rounded-lg shadow-sm p-2">
                    <div className="flex space-x-2">
                        {[
                            { id: 'overview', name: t('parent.tabsOverview'), icon: '📊' },
                            { id: 'subjects', name: t('parent.tabsSubjects'), icon: '📚' },
                            { id: 'achievements', name: t('parent.tabsAchievements'), icon: '🏆' },
                            { id: 'activity', name: t('parent.tabsStudyTime'), icon: '⏰' },
                            { id: 'ranking', name: t('parent.tabsClassRank'), icon: '🎯' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                                    activeTab === tab.id
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">{tab.icon}</span>
                                <span className="text-lg">{tab.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 mt-6 pb-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Progress Summary */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 {t('parent.overallProgress')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                                        <div className="text-3xl font-bold text-green-600">{childData.overallProgress}%</div>
                                    </div>
                                    <div className="text-lg font-semibold text-gray-900">{t('parent.overallProgress')}</div>
                                    <div className="text-gray-600">{t('excellentWork') || 'Excellent work!'}</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                                        <div className="text-2xl font-bold text-blue-600">{t('parent.currentLevel')} {childData.currentLevel}</div>
                                    </div>
                                    <div className="text-lg font-semibold text-gray-900">{t('parent.currentLevel')}</div>
                                    <div className="text-gray-600">{t('keepItUp') || 'Keep it up!'}</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                                        <div className="text-lg font-bold text-purple-600">{childData.weeklyStudyTime}</div>
                                    </div>
                                    <div className="text-lg font-semibold text-gray-900">{t('parent.thisWeek')}</div>
                                    <div className="text-gray-600">{t('parent.studyTime')}</div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Performance */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 {t('parent.recentTestScores')}</h2>
                            <div className="flex justify-center">
                                <div className="flex space-x-4">
                                    {childData.recentScores.map((score, index) => (
                                        <div key={index} className="text-center">
                                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                                                score >= 90 ? 'bg-green-500' : score >= 80 ? 'bg-blue-500' : 'bg-yellow-500'
                                            }`}>
                                                {score}
                                            </div>
                                            <div className="text-sm text-gray-600 mt-2">Test {index + 1}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Subjects Tab */}
                {activeTab === 'subjects' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 {t('parent.subjectPerformance')}</h2>
                        <div className="space-y-4">
                            {childData.subjects.map((subject, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">{subject.name}</h3>
                                            <p className="text-gray-600">{t('parent.teacherLabel')}: {subject.teacher}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-2xl font-bold ${
                                                subject.grade.startsWith('A') ? 'text-green-600' : 
                                                subject.grade.startsWith('B') ? 'text-blue-600' : 'text-yellow-600'
                                            }`}>
                                                {subject.grade}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div 
                                            className={`h-4 rounded-full ${
                                                subject.progress >= 80 ? 'bg-green-500' : 
                                                subject.progress >= 60 ? 'bg-blue-500' : 'bg-yellow-500'
                                            }`}
                                            style={{ width: `${subject.progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-right text-lg font-semibold text-gray-700 mt-2">
                                        {subject.progress}% {t('parent.completeWord')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Achievements Tab */}
                {activeTab === 'achievements' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 {t('parent.recentAchievements')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {childData.achievements.map((achievement, index) => (
                                <div key={index} className="text-center border border-gray-200 rounded-lg p-6">
                                    <div className="text-5xl mb-3">{achievement.icon}</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{achievement.name}</h3>
                                    <p className="text-gray-600">{t('parent.earnedOn', { date: achievement.date })}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <div className="inline-block bg-blue-100 rounded-lg p-4">
                                <div className="text-lg font-semibold text-blue-900">
                                    🎉 {t('parent.earnedCount', { count: childData.achievements.length })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">⏰ {t('parent.weeklyStudyTime')}</h2>
                        <div className="space-y-4">
                            {childData.weeklyActivity.map((day, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <div className="w-16 text-lg font-semibold text-gray-700">{day.day}</div>
                                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                        <div 
                                            className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                                            style={{ width: `${Math.min(day.minutes / 90 * 100, 100)}%` }}
                                        >
                                            <span className="text-white text-sm font-semibold">{day.minutes}m</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="text-center">
                                <div className="text-lg font-semibold text-green-800">
                                    ✅ {t('parent.totalThisWeek', { minutes: childData.weeklyActivity.reduce((sum, day) => sum + day.minutes, 0) })}
                                </div>
                                <div className="text-green-600 mt-1">{t('parent.consistencyMsg')}</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Class Ranking Tab */}
                {activeTab === 'ranking' && (
                    <div className="space-y-6">
                        {/* Overall Class Position */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 {t('parent.classPositionTitle')}</h2>
                            <div className="text-center">
                                <div className="inline-block bg-blue-100 rounded-full p-8 mb-4">
                                    <div className="text-4xl font-bold text-blue-600">3rd</div>
                                </div>
                                <div className="text-xl font-semibold text-gray-900 mb-2">
                                    {t('parent.rankOutOf', { rank: 3, total: 35 })}
                                </div>
                                <div className="text-gray-600">{t('parent.topPercent', { percent: 9 })} 🌟</div>
                            </div>
                        </div>

                        {/* Subject Rankings */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 {t('parent.subjectWiseRankings')}</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">🥇</div>
                                        <div>
                                            <div className="font-bold text-gray-900">Mathematics</div>
                                            <div className="text-sm text-gray-600">{t('parent.doingExcellent')}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-yellow-600">1st</div>
                                        <div className="text-sm text-gray-600">{t('parent.outOfTotal', { total: 35 })}</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">🥈</div>
                                        <div>
                                            <div className="font-bold text-gray-900">Physics</div>
                                            <div className="text-sm text-gray-600">{t('parent.veryGoodPerformance')}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-gray-600">5th</div>
                                        <div className="text-sm text-gray-600">{t('parent.outOfTotal', { total: 28 })}</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">🥉</div>
                                        <div>
                                            <div className="font-bold text-gray-900">Chemistry</div>
                                            <div className="text-sm text-gray-600">{t('parent.goodProgress')}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-orange-600">8th</div>
                                        <div className="text-sm text-gray-600">{t('parent.outOfTotal', { total: 22 })}</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">📈</div>
                                        <div>
                                            <div className="font-bold text-gray-900">Biology</div>
                                            <div className="text-sm text-gray-600">{t('parent.roomForImprovement')}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-blue-600">12th</div>
                                        <div className="text-sm text-gray-600">{t('parent.outOfTotal', { total: 30 })}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Trends */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 {t('parent.progressTrends')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <div className="text-3xl mb-2">⬆️</div>
                                    <div className="text-xl font-bold text-green-600">{t('parent.plusPositions', { count: 2 })}</div>
                                    <div className="text-gray-600">{t('parent.thisMonth')}</div>
                                </div>
                                <div className="text-center p-4 bg-purple-50 rounded-lg">
                                    <div className="text-3xl mb-2">🎯</div>
                                    <div className="text-xl font-bold text-purple-600">{t('parent.consistent')}</div>
                                    <div className="text-gray-600">{t('parent.studyPattern')}</div>
                                </div>
                            </div>
                        </div>

                        {/* Encouragement Message */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🌟</div>
                                <div className="text-xl font-bold text-gray-900 mb-2">
                                    {t('parent.encouragementTitle')}
                                </div>
                                <div className="text-gray-600">
                                    {t('parent.encouragementBody', { name: childData.name.split(' ')[0] })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="fixed bottom-6 right-6">
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">{t('parent.needHelp')}</div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                            📞 {t('parent.contactTeacher')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentsDashboard;