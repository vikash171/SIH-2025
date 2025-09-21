import { useMemo, useState } from 'react';

const baseData = [
    { rank: 1, name: 'Alex Johnson', school: 'Einstein High', xp: 3450, games: 25, streak: 12, badge: '👑', avatar: 'AJ', subject: 'overall', scope: 'global' },
    { rank: 2, name: 'Sarah Miller', school: 'Newton Academy', xp: 2890, games: 22, streak: 8, badge: '🥈', avatar: 'SM', subject: 'overall', scope: 'global' },
    { rank: 3, name: 'Mike Kim', school: 'Tesla Institute', xp: 2650, games: 20, streak: 6, badge: '🥉', avatar: 'MK', subject: 'overall', scope: 'global' },
    { rank: 4, name: 'Emma Davis', school: 'Darwin School', xp: 2450, games: 18, streak: 7, badge: '⭐', avatar: 'ED', subject: 'overall', scope: 'school' },
    { rank: 5, name: 'James Wilson', school: 'Curie College', xp: 2380, games: 19, streak: 5, badge: '⭐', avatar: 'JW', subject: 'overall', scope: 'local' },
    { rank: 6, name: 'Lisa Chen', school: 'Einstein High', xp: 2290, games: 17, streak: 9, badge: '⭐', avatar: 'LC', subject: 'physics', scope: 'class' },
    { rank: 7, name: 'David Brown', school: 'Newton Academy', xp: 2150, games: 16, streak: 4, badge: '⭐', avatar: 'DB', subject: 'math', scope: 'subject' },
    { rank: 8, name: 'Anna Garcia', school: 'Tesla Institute', xp: 2080, games: 15, streak: 3, badge: '⭐', avatar: 'AG', subject: 'chemistry', scope: 'subject' },
    { rank: 9, name: 'Tom Anderson', school: 'Darwin School', xp: 1950, games: 14, streak: 6, badge: '⭐', avatar: 'TA', subject: 'biology', scope: 'subject' },
    { rank: 10, name: 'Sophie Lee', school: 'Curie College', xp: 1890, games: 13, streak: 2, badge: '⭐', avatar: 'SL', subject: 'overall', scope: 'school' }
];

const podiumFrom = (rows) => rows.slice(0, 3);

const Leaderboard = ({ onNavigate }) => {
    const [scope, setScope] = useState('class'); // class | subject | local | school | global
    const [period, setPeriod] = useState('all'); // all | weekly | monthly
    const [subject, setSubject] = useState('overall'); // overall | math | physics | chemistry | biology

    const goBack = () => onNavigate('homepage');

    // For demo, filter by scope and subject; period is a no-op placeholder
    const scopedRows = useMemo(() => {
        let rows = baseData.filter(r => (scope === 'global' ? true : r.scope === scope));
        if (subject !== 'overall') rows = rows.filter(r => r.subject === subject);
        // Sort by xp desc and re-rank
        rows = [...rows].sort((a, b) => b.xp - a.xp).map((r, i) => ({ ...r, rank: i + 1 }));
        return rows;
    }, [scope, subject]);

    const podium = podiumFrom(scopedRows);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button onClick={goBack} className="text-gray-600 hover:text-indigo-500">← Back to Dashboard</button>
                            <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                                <option value="all">All Time</option>
                                <option value="weekly">This Week</option>
                                <option value="monthly">This Month</option>
                            </select>
                            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                                <option value="overall">Overall</option>
                                <option value="math">Mathematics</option>
                                <option value="physics">Physics</option>
                                <option value="chemistry">Chemistry</option>
                                <option value="biology">Biology</option>
                            </select>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Scope Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-2xl p-2 shadow-sm">
                        <div className="flex flex-wrap gap-2">
                            {[
                                { key: 'class', label: 'Class' },
                                { key: 'subject', label: 'Subject' },
                                { key: 'local', label: 'Local' },
                                { key: 'school', label: 'School' },
                                { key: 'global', label: 'Global' }
                            ].map(t => (
                                <button
                                    key={t.key}
                                    onClick={() => setScope(t.key)}
                                    className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition ${scope === t.key ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top 3 Podium */}
                <div className="mb-12">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Top Performers</h2>
                    <div className="flex justify-center items-end gap-8">
                        {/* 2nd */}
                        <div className="text-center">
                            <div className="w-24 h-32 bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-lg flex items-end justify-center pb-4 mb-4">
                                <span className="text-white font-bold text-2xl">2</span>
                            </div>
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">{podium[1]?.avatar ?? '—'}</span>
                            </div>
                            <h3 className="font-semibold text-gray-800">{podium[1]?.name ?? '—'}</h3>
                            <p className="text-sm text-gray-600">{podium[1]?.xp?.toLocaleString() ?? '—'} XP</p>
                            <div className="flex justify-center mt-2"><span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">🥈 Silver</span></div>
                        </div>

                        {/* 1st */}
                        <div className="text-center">
                            <div className="w-24 h-40 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-lg flex items-end justify-center pb-4 mb-4">
                                <span className="text-white font-bold text-3xl">1</span>
                            </div>
                            <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">{podium[0]?.avatar ?? '—'}</span>
                            </div>
                            <h3 className="font-semibold text-gray-800">{podium[0]?.name ?? '—'}</h3>
                            <p className="text-sm text-gray-600">{podium[0]?.xp?.toLocaleString() ?? '—'} XP</p>
                            <div className="flex justify-center mt-2"><span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs">👑 Champion</span></div>
                        </div>

                        {/* 3rd */}
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-t from-orange-400 to-orange-500 rounded-t-lg flex items-end justify-center pb-4 mb-4">
                                <span className="text-white font-bold text-xl">3</span>
                            </div>
                            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-teal-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">{podium[2]?.avatar ?? '—'}</span>
                            </div>
                            <h3 className="font-semibold text-gray-800">{podium[2]?.name ?? '—'}</h3>
                            <p className="text-sm text-gray-600">{podium[2]?.xp?.toLocaleString() ?? '—'} XP</p>
                            <div className="flex justify-center mt-2"><span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs">🥉 Bronze</span></div>
                        </div>
                    </div>
                </div>

                {/* Full Leaderboard */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Full Rankings</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">XP Points</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Games Completed</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Streak</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badge</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {scopedRows.map((s) => (
                                    <tr key={`${s.name}-${s.rank}`} className={s.rank <= 3 ? 'bg-yellow-50' : 'hover:bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap"><span className="text-lg font-bold text-gray-900">#{s.rank}</span></td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full flex items-center justify-center mr-3">
                                                    <span className="text-white font-semibold text-sm">{s.avatar}</span>
                                                </div>
                                                <div><div className="text-sm font-medium text-gray-900">{s.name}</div></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.school}</td>
                                        <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-semibold text-indigo-600">{s.xp.toLocaleString()}</span></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.games}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">🔥 {s.streak} days</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-lg">{s.badge}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Team Leaderboard */}
                <div className="mt-12 bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Team Rankings</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between mb-4"><h4 className="text-lg font-semibold">Team Alpha</h4><span className="bg-white/20 px-2 py-1 rounded text-sm">#1</span></div>
                            <p className="text-sm opacity-90 mb-2">Einstein High School</p>
                            <p className="text-2xl font-bold">15,420 XP</p>
                            <p className="text-sm opacity-90">5 members</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between mb-4"><h4 className="text-lg font-semibold">Team Beta</h4><span className="bg-white/20 px-2 py-1 rounded text-sm">#2</span></div>
                            <p className="text-sm opacity-90 mb-2">Newton Academy</p>
                            <p className="text-2xl font-bold">14,890 XP</p>
                            <p className="text-sm opacity-90">6 members</p>
                        </div>
                        <div className="bg-gradient-to-r from-green-400 to-teal-500 rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between mb-4"><h4 className="text-lg font-semibold">Team Gamma</h4><span className="bg-white/20 px-2 py-1 rounded text-sm">#3</span></div>
                            <p className="text-sm opacity-90 mb-2">Tesla Institute</p>
                            <p className="text-2xl font-bold">13,650 XP</p>
                            <p className="text-sm opacity-90">4 members</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;