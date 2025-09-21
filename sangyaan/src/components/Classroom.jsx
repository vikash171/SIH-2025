/**
 * Classroom Page Component
 * 
 * Purpose: Main classroom page that displays user's classes
 * Parent Component: App.jsx
 * 
 * Features:
 * - Shows single class using Class component
 * - Clean, focused design
 * - Handles class interactions
 * - Gamified stats display
 */

import { useMemo, useState } from 'react';
import Class from './Class';
import Profile from './Profile';
import ClassDiscussion from './ClassDiscussion';
import ClassDetail from './ClassDetail';

const Classroom = ({ onNavigate }) => {
    const [view, setView] = useState('main'); // main | detail | discussion
    const [selectedClass, setSelectedClass] = useState(null);
    const [studentRooms, setStudentRooms] = useState([
        { id: 'sr1', name: 'Waves Speedrun', owner: 'Priya', members: 8, subject: 'physics', activity: 'Active • 3 online' },
        { id: 'sr2', name: 'Organic Basics', owner: 'Arjun', members: 12, subject: 'chemistry', activity: 'New notes posted' },
        { id: 'sr3', name: 'Algebra Doubts', owner: 'Meera', members: 15, subject: 'math', activity: 'Practice set shared' },
    ]);
    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomSubject, setNewRoomSubject] = useState('physics');

    // Sample classes from teachers
    const teacherClasses = useMemo(() => ([
        {
            className: 'Physics - Grade 10',
            teacher: 'Mrs. Johnson',
            studentCount: 28,
            progress: 75,
            nextAssignment: 'Wave Lab',
            nextDate: 'Tomorrow 10:00 AM',
            subject: 'physics',
        },
        {
            className: 'Chemistry - Lab Skills',
            teacher: 'Dr. Patel',
            studentCount: 24,
            progress: 40,
            nextAssignment: 'Acids & Bases Quiz',
            nextDate: 'Mon 9:00 AM',
            subject: 'chemistry',
        },
        {
            className: 'Biology - Cell Division',
            teacher: 'Mr. Singh',
            studentCount: 30,
            progress: 60,
            nextAssignment: 'Mitosis Diagram',
            nextDate: 'Wed 11:30 AM',
            subject: 'biology',
        },
    ]), []);

    const handleClassClick = (classData) => {
        const meta = {
            name: classData.className,
            subject: classData.subject,
            from: 'teacher',
            teacher: classData.teacher,
            studentCount: classData.studentCount || 0,
        };
        setSelectedClass(meta);
        setView('detail');
    };

    const handleRoomClick = (room) => {
        const meta = {
            name: room.name,
            subject: room.subject,
            from: 'student',
            owner: room.owner,
            studentCount: room.members,
        };
        setSelectedClass(meta);
        setView('detail');
    };

    const handleBackClick = () => {
        if (view === 'discussion') {
            setView('main');
        } else {
            onNavigate('homepage');
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
                            <h1 className="text-2xl font-bold theme-text">My Classroom</h1>
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
                {view === 'main' && (
                    <>
                        {/* Stats Cards */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="theme-card rounded-xl p-6 shadow-sm text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <span className="text-blue-500 text-2xl">📚</span>
                                </div>
                                <div className="text-2xl font-bold theme-text">{teacherClasses.length}</div>
                                <div className="text-sm text-gray-600">Teacher Classes</div>
                            </div>

                            <div className="theme-card rounded-xl p-6 shadow-sm text-center">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <span className="text-green-500 text-2xl">�</span>
                                </div>
                                <div className="text-2xl font-bold theme-text">{studentRooms.length}</div>
                                <div className="text-sm text-gray-600">Student Rooms</div>
                            </div>

                            <div className="theme-card rounded-xl p-6 shadow-sm text-center">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <span className="text-orange-500 text-2xl">🏆</span>
                                </div>
                                <div className="text-2xl font-bold theme-text">#3</div>
                                <div className="text-sm text-gray-600">Class Rank</div>
                            </div>
                        </div>

                        {/* From your teachers */}
                        <div className="mb-10">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold theme-text">From your teachers</h2>
                                <button className="text-sm text-indigo-600 hover:underline">View all</button>
                            </div>
                            <div className="space-y-4">
                                {teacherClasses.map((c) => (
                                    <Class
                                        key={`${c.className}-${c.teacher}`}
                                        className={c.className}
                                        teacher={c.teacher}
                                        studentCount={c.studentCount}
                                        progress={c.progress}
                                        nextAssignment={c.nextAssignment}
                                        nextDate={c.nextDate}
                                        subject={c.subject}
                                        onClassClick={handleClassClick}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Student classrooms */}
                        <div className="mb-10">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold theme-text">Student classrooms</h2>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {studentRooms.map((r) => (
                                    <div key={r.id} className="theme-card rounded-xl p-4 shadow-sm hover:shadow-md transition">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-2xl">{r.subject === 'physics' ? '⚛️' : r.subject === 'chemistry' ? '🧪' : r.subject === 'biology' ? '🧬' : '🧮'}</span>
                                                    <h3 className="font-semibold theme-text">{r.name}</h3>
                                                </div>
                                                <div className="text-xs text-gray-500">By {r.owner} • {r.members} members</div>
                                                <div className="text-xs mt-1 text-indigo-600">{r.activity}</div>
                                            </div>
                                            <button onClick={() => handleRoomClick(r)} className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">Join</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Create a room */}
                        <div className="theme-card rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold theme-text mb-3">Create a student room</h3>
                            <div className="grid sm:grid-cols-3 gap-3">
                                <input
                                    value={newRoomName}
                                    onChange={(e) => setNewRoomName(e.target.value)}
                                    placeholder="Room name (e.g., Exam Prep)"
                                    className="sm:col-span-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                />
                                <select
                                    value={newRoomSubject}
                                    onChange={(e) => setNewRoomSubject(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="physics">Physics</option>
                                    <option value="chemistry">Chemistry</option>
                                    <option value="biology">Biology</option>
                                    <option value="math">Math</option>
                                </select>
                            </div>
                            <div className="mt-3 flex justify-end">
                                <button
                                    onClick={() => {
                                        const name = newRoomName.trim();
                                        if (!name) return;
                                        const room = {
                                            id: `sr${Date.now()}`,
                                            name,
                                            owner: 'You',
                                            members: 1,
                                            subject: newRoomSubject,
                                            activity: 'Just created',
                                        };
                                        setStudentRooms([room, ...studentRooms]);
                                        setNewRoomName('');
                                    }}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                                >
                                    Create Room
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {view === 'detail' && (
                    <ClassDetail
                        classMeta={selectedClass}
                        onBack={() => setView('main')}
                        onOpenDiscussion={() => setView('discussion')}
                        onNavigate={onNavigate}
                    />
                )}
                {view === 'discussion' && (
                    <ClassDiscussion onBack={() => setView('detail')} classMeta={selectedClass} />
                )}
            </div>
        </div>
    );
};

export default Classroom;