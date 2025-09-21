import React, { useState, useEffect } from 'react';

const ParentsDashboard = () => {
    const [childData, setChildData] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);

    // Load child data (this would normally come from the student_data.json)
    useEffect(() => {
        // Simulating data load
        setTimeout(() => {
            setChildData({
                name: "Emma Johnson",
                grade: "Grade 11",
                avatar: "👩‍🎓",
                overallProgress: 85,
                currentLevel: 12,
                weeklyStudyTime: "4h 25m",
                lastActive: "Today at 10:30 AM",
                recentScores: [92, 87, 89, 84, 91],
                subjects: [
                    { name: "Mathematics", progress: 87, grade: "A", teacher: "Dr. Smith" },
                    { name: "Physics", progress: 76, grade: "B+", teacher: "Dr. Johnson" },
                    { name: "Chemistry", progress: 68, grade: "B", teacher: "Ms. Davis" },
                    { name: "Biology", progress: 62, grade: "B-", teacher: "Mr. Wilson" }
                ],
                achievements: [
                    { name: "Math Wizard", icon: "🧙‍♀️", date: "Sept 10" },
                    { name: "Streak Master", icon: "🔥", date: "Sept 15" },
                    { name: "Quick Learner", icon: "⚡", date: "Sept 8" }
                ],
                weeklyActivity: [
                    { day: "Mon", minutes: 45 },
                    { day: "Tue", minutes: 60 },
                    { day: "Wed", minutes: 35 },
                    { day: "Thu", minutes: 70 },
                    { day: "Fri", minutes: 40 },
                    { day: "Sat", minutes: 25 },
                    { day: "Sun", minutes: 30 }
                ]
            });
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4">📚</div>
                    <div className="text-xl text-gray-600">Loading your child's progress...</div>
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
                                <p className="text-lg text-gray-600">{childData.grade} • Level {childData.currentLevel}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-500">Last Active</div>
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
                            { id: 'overview', name: 'Overview', icon: '📊' },
                            { id: 'subjects', name: 'Subjects', icon: '📚' },
                            { id: 'achievements', name: 'Achievements', icon: '🏆' },
                            { id: 'activity', name: 'Study Time', icon: '⏰' }
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 Overall Progress</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                                        <div className="text-3xl font-bold text-green-600">{childData.overallProgress}%</div>
                                    </div>
                                    <div className="text-lg font-semibold text-gray-900">Overall Progress</div>
                                    <div className="text-gray-600">Excellent work!</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                                        <div className="text-2xl font-bold text-blue-600">Level {childData.currentLevel}</div>
                                    </div>
                                    <div className="text-lg font-semibold text-gray-900">Current Level</div>
                                    <div className="text-gray-600">Keep it up!</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                                        <div className="text-lg font-bold text-purple-600">{childData.weeklyStudyTime}</div>
                                    </div>
                                    <div className="text-lg font-semibold text-gray-900">This Week</div>
                                    <div className="text-gray-600">Study time</div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Performance */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Recent Test Scores</h2>
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Subject Performance</h2>
                        <div className="space-y-4">
                            {childData.subjects.map((subject, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">{subject.name}</h3>
                                            <p className="text-gray-600">Teacher: {subject.teacher}</p>
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
                                        {subject.progress}% Complete
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Achievements Tab */}
                {activeTab === 'achievements' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 Recent Achievements</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {childData.achievements.map((achievement, index) => (
                                <div key={index} className="text-center border border-gray-200 rounded-lg p-6">
                                    <div className="text-5xl mb-3">{achievement.icon}</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{achievement.name}</h3>
                                    <p className="text-gray-600">Earned on {achievement.date}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <div className="inline-block bg-blue-100 rounded-lg p-4">
                                <div className="text-lg font-semibold text-blue-900">
                                    🎉 Your child has earned {childData.achievements.length} achievements this month!
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">⏰ Weekly Study Time</h2>
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
                                    ✅ Total this week: {childData.weeklyActivity.reduce((sum, day) => sum + day.minutes, 0)} minutes
                                </div>
                                <div className="text-green-600 mt-1">Great consistency in studying!</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="fixed bottom-6 right-6">
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">Need Help?</div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                            📞 Contact Teacher
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentsDashboard;