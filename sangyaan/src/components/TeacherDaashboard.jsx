import React, { useState, useEffect } from 'react';
import { studentDb } from '../db.js';
import TeacherSidebar from './sidebar.jsx';

const TeacherDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [studentsData, setStudentsData] = useState([]);
    const [statsData, setStatsData] = useState({
        totalStudents: 0,
        activeStudents: 0,
        averageProgress: 0,
        averageStudyTime: '0.0',
        needAttention: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    // Initialize data from IndexedDB
    useEffect(() => {
        const initializeData = async () => {
            try {
                // Load students data
                const students = await studentDb.getStudents();
                setStudentsData(students);

                // Calculate stats
                const stats = await studentDb.calculateStats();
                setStatsData(stats);
                
                setIsLoading(false);
            } catch (error) {
                console.error('Error initializing dashboard data:', error);
                setIsLoading(false);
            }
        };

        initializeData();
    }, []);

    // Filter students based on search
    const filteredStudents = studentsData.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-600">Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <TeacherSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                isCollapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
                            <p className="text-gray-600 mt-1">Welcome back, Dr. Smith</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-700">John Smith</span>
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                    👨‍🏫
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                                            👥
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-2xl font-bold text-gray-900">{statsData.totalStudents}</h3>
                                            <p className="text-gray-600 text-sm">Total Students</p>
                                            <p className="text-green-600 text-xs mt-1">+2 this week</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl">
                                            📈
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-2xl font-bold text-gray-900">{statsData.averageProgress}%</h3>
                                            <p className="text-gray-600 text-sm">Average Progress</p>
                                            <p className="text-green-600 text-xs mt-1">+5% from last week</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xl">
                                            ⏱️
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-2xl font-bold text-gray-900">{statsData.averageStudyTime}h</h3>
                                            <p className="text-gray-600 text-sm">Avg. Weekly Study</p>
                                            <p className="text-green-600 text-xs mt-1">+0.5h from last week</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl">
                                            ⚠️
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-2xl font-bold text-gray-900">{statsData.needAttention}</h3>
                                            <p className="text-gray-600 text-sm">Need Attention</p>
                                            <p className="text-green-600 text-xs mt-1">-2 from last week</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chart Section */}
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Student Progress Overview</h2>
                                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                                        <option>Last 7 days</option>
                                        <option>Last 30 days</option>
                                        <option>Last 90 days</option>
                                    </select>
                                </div>
                                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <p className="text-gray-500">📊 Chart Coming Soon</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Students Tab */}
                    {activeTab === 'students' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-gray-900">Student Management</h2>
                                        <div className="flex space-x-3">
                                            <input
                                                type="text"
                                                placeholder="Search students..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gems</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredStudents.map((student) => (
                                                <tr key={student.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                                                                {student.avatar}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div 
                                                                className="bg-blue-600 h-2 rounded-full" 
                                                                style={{ width: `${student.progress}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm text-gray-500">{student.progress}%</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        Level {student.level}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        💎 {student.gems}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {student.lastActive}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            student.status === 'Active' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {student.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                                                        <button className="text-gray-600 hover:text-gray-900">Message</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Classes Tab */}
                    {activeTab === 'classes' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Class Management</h2>
                                
                                {/* Add New Class Button */}
                                <div className="mb-6">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                                        <span>➕</span>
                                        <span>Create New Class</span>
                                    </button>
                                </div>

                                {/* Class List */}
                                <div className="space-y-4">
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">Mathematics - Grade 10</h3>
                                                <p className="text-gray-600 text-sm mt-1">35 students • Room 201 • Mon, Wed, Fri 9:00 AM</p>
                                                <div className="flex space-x-4 mt-2">
                                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                                                    <span className="text-gray-500 text-xs">Next: Today 9:00 AM</span>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="text-blue-500 hover:text-blue-700 px-3 py-1 text-sm">
                                                    📝 Edit
                                                </button>
                                                <button className="text-gray-500 hover:text-gray-700 px-3 py-1 text-sm">
                                                    👁️ View
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">Physics - Grade 11</h3>
                                                <p className="text-gray-600 text-sm mt-1">28 students • Room 305 • Tue, Thu 11:00 AM</p>
                                                <div className="flex space-x-4 mt-2">
                                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                                                    <span className="text-gray-500 text-xs">Next: Tomorrow 11:00 AM</span>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="text-blue-500 hover:text-blue-700 px-3 py-1 text-sm">
                                                    📝 Edit
                                                </button>
                                                <button className="text-gray-500 hover:text-gray-700 px-3 py-1 text-sm">
                                                    👁️ View
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">Chemistry - Grade 12</h3>
                                                <p className="text-gray-600 text-sm mt-1">22 students • Room 401 • Mon, Wed, Fri 2:00 PM</p>
                                                <div className="flex space-x-4 mt-2">
                                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Upcoming</span>
                                                    <span className="text-gray-500 text-xs">Next: Monday 2:00 PM</span>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="text-blue-500 hover:text-blue-700 px-3 py-1 text-sm">
                                                    📝 Edit
                                                </button>
                                                <button className="text-gray-500 hover:text-gray-700 px-3 py-1 text-sm">
                                                    👁️ View
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;