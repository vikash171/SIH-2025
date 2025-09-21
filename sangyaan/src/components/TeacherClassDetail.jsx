import { useState, useMemo } from 'react';

export default function TeacherClassDetail({ classData, onBack, onNavigate }) {
  const [tab, setTab] = useState('overview');
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const sample = useMemo(() => ({
    overview: {
      announcement: 'Mid-term exams approaching. Please review chapters 5-8.',
      nextClass: classData?.nextClass || 'Tomorrow 10:00 AM',
      totalStudents: classData?.totalStudents || 35,
      activeStudents: Math.floor((classData?.totalStudents || 35) * 0.8),
      avgProgress: 72,
      pendingGrades: 8,
    },
    assignments: [
      { id: 'a1', title: 'Wave Equations Problem Set', dueDate: 'Sep 25, 5 PM', submissions: 28, total: 35, status: 'Active' },
      { id: 'a2', title: 'Lab Report - Pendulum', dueDate: 'Sep 20, 11:59 PM', submissions: 35, total: 35, status: 'Closed' },
      { id: 'a3', title: 'Chapter 7 Quiz', dueDate: 'Oct 2, 3 PM', submissions: 0, total: 35, status: 'Draft' },
    ],
    submissions: [
      { id: 's1', student: 'Arjun Patel', assignment: 'Wave Equations', submitted: 'Sep 23, 2:30 PM', score: null, status: 'Pending' },
      { id: 's2', student: 'Priya Singh', assignment: 'Wave Equations', submitted: 'Sep 22, 10:15 AM', score: 18, status: 'Graded' },
      { id: 's3', student: 'Ravi Kumar', assignment: 'Lab Report', submitted: 'Sep 19, 11:45 PM', score: 22, status: 'Graded' },
      { id: 's4', student: 'Meera Joshi', assignment: 'Wave Equations', submitted: 'Sep 24, 8:20 AM', score: null, status: 'Pending' },
    ],
    analytics: {
      attendanceRate: 92,
      avgScore: 78,
      submissionRate: 85,
      engagementTrend: '+5%',
      strugglingStudents: ['Kiran Sharma', 'Rohit Das'],
      topPerformers: ['Priya Singh', 'Arjun Patel', 'Neha Gupta'],
    },
    settings: {
      className: classData?.className || 'Physics - Grade 10',
      schedule: classData?.schedule || 'Mon, Wed, Fri 10:00 AM',
      room: classData?.room || 'Room 305',
      gradeWeights: { assignments: 40, quizzes: 30, labs: 20, participation: 10 },
    }
  }), [classData]);

  const SubjectBadge = ({ subject }) => {
    const map = {
      mathematics: { icon: '🧮', color: 'orange' },
      physics: { icon: '⚛️', color: 'blue' },
      chemistry: { icon: '🧪', color: 'green' },
      biology: { icon: '🧬', color: 'purple' },
    };
    const m = map[subject] || { icon: '📚', color: 'gray' };
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-${m.color}-100 text-${m.color}-700 text-xs font-medium`}>
        <span>{m.icon}</span>
        <span>{subject ? subject[0].toUpperCase()+subject.slice(1) : 'General'}</span>
      </span>
    );
  };

  const createAssignment = () => {
    if (!newAssignmentTitle.trim()) return;
    alert(`Assignment "${newAssignmentTitle}" created!`);
    setNewAssignmentTitle('');
  };

  const gradeSubmission = (submissionId, score) => {
    alert(`Graded submission ${submissionId} with score: ${score}/25`);
    setSelectedSubmission(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-gray-600 hover:opacity-70">← Back to Dashboard</button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{sample.settings.className}</h1>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <SubjectBadge subject={classData?.subject} />
                <span>• {sample.settings.schedule} • {sample.settings.room}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setTab('assignments')} className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">+ Assignment</button>
            <button onClick={() => setTab('analytics')} className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700">Analytics</button>
            <button onClick={() => onNavigate?.('events')} className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">Schedule</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="mb-4 flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'assignments', label: 'Assignments' },
            { id: 'grading', label: 'Grading' },
            { id: 'analytics', label: 'Analytics' },
            { id: 'settings', label: 'Settings' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-2 rounded-lg text-sm border ${tab === t.id ? 'bg-indigo-600 text-white border-transparent' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Panels */}
        {tab === 'overview' && (
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Students</h3>
              <div className="text-2xl font-bold text-indigo-600">{sample.overview.activeStudents}/{sample.overview.totalStudents}</div>
              <div className="text-sm text-gray-500">Active today</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Avg Progress</h3>
              <div className="text-2xl font-bold text-green-600">{sample.overview.avgProgress}%</div>
              <div className="text-sm text-gray-500">Class average</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Pending Grades</h3>
              <div className="text-2xl font-bold text-orange-600">{sample.overview.pendingGrades}</div>
              <div className="text-sm text-gray-500">Need review</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Next Class</h3>
              <div className="text-sm font-medium text-gray-900">{sample.overview.nextClass}</div>
              <div className="text-sm text-gray-500">Scheduled</div>
            </div>
            
            <div className="md:col-span-4 bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Announcement</h3>
              <p className="text-gray-700">{sample.overview.announcement}</p>
              <button className="mt-2 text-indigo-600 text-sm hover:underline">Edit announcement</button>
            </div>
          </div>
        )}

        {tab === 'assignments' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Create New Assignment</h3>
              <div className="flex gap-3">
                <input
                  value={newAssignmentTitle}
                  onChange={(e) => setNewAssignmentTitle(e.target.value)}
                  placeholder="Assignment title (e.g., Chapter 5 Quiz)"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <button onClick={createAssignment} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">Create</button>
              </div>
            </div>
            
            <div className="space-y-3">
              {sample.assignments.map((a) => (
                <div key={a.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{a.title}</div>
                      <div className="text-sm text-gray-500">Due: {a.dueDate}</div>
                      <div className="text-sm text-gray-600 mt-1">Submissions: {a.submissions}/{a.total} students</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${a.status === 'Active' ? 'bg-green-100 text-green-700' : a.status === 'Closed' ? 'bg-gray-100 text-gray-700' : 'bg-yellow-100 text-yellow-700'}`}>{a.status}</span>
                      <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700">Edit</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'grading' && (
          <div className="space-y-4">
            {sample.submissions.filter(s => s.status === 'Pending').length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">⏳ Pending Reviews ({sample.submissions.filter(s => s.status === 'Pending').length})</h3>
                <div className="space-y-2">
                  {sample.submissions.filter(s => s.status === 'Pending').map(s => (
                    <div key={s.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{s.student}</div>
                        <div className="text-sm text-gray-600">{s.assignment} • Submitted {s.submitted}</div>
                      </div>
                      <button onClick={() => setSelectedSubmission(s)} className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">Grade</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Recent Submissions</h3>
              <div className="space-y-2">
                {sample.submissions.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{s.student}</div>
                      <div className="text-sm text-gray-600">{s.assignment} • {s.submitted}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {s.score ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded">{s.score}/25</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">Pending</span>
                      )}
                      <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'analytics' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Class Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Attendance Rate</span>
                  <span className="font-semibold text-gray-900">{sample.analytics.attendanceRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Score</span>
                  <span className="font-semibold text-gray-900">{sample.analytics.avgScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Submission Rate</span>
                  <span className="font-semibold text-gray-900">{sample.analytics.submissionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Engagement Trend</span>
                  <span className="font-semibold text-green-600">{sample.analytics.engagementTrend}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">⚠️ Students Needing Attention</h3>
              <div className="space-y-2">
                {sample.analytics.strugglingStudents.map(student => (
                  <div key={student} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                    <span className="text-gray-900">{student}</span>
                    <button className="text-red-600 text-sm hover:underline">Contact</button>
                  </div>
                ))}
              </div>
              
              <h4 className="font-semibold text-gray-900 mt-4 mb-2">🌟 Top Performers</h4>
              <div className="space-y-1">
                {sample.analytics.topPerformers.map(student => (
                  <div key={student} className="text-green-700 text-sm">{student}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Class Settings</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                <input defaultValue={sample.settings.className} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                <input defaultValue={sample.settings.schedule} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                <input defaultValue={sample.settings.room} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade Weights</label>
                <div className="text-sm text-gray-600">
                  Assignments: {sample.settings.gradeWeights.assignments}% • 
                  Quizzes: {sample.settings.gradeWeights.quizzes}% • 
                  Labs: {sample.settings.gradeWeights.labs}% • 
                  Participation: {sample.settings.gradeWeights.participation}%
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">Save Changes</button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700">Cancel</button>
            </div>
          </div>
        )}
      </main>

      {/* Grading Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="font-semibold text-gray-900 mb-3">Grade Submission</h3>
            <div className="mb-4">
              <div className="text-sm text-gray-600">Student: {selectedSubmission.student}</div>
              <div className="text-sm text-gray-600">Assignment: {selectedSubmission.assignment}</div>
              <div className="text-sm text-gray-600">Submitted: {selectedSubmission.submitted}</div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Score (out of 25)</label>
              <input type="number" max="25" min="0" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
              <textarea rows="3" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Optional feedback for student..."></textarea>
            </div>
            <div className="flex gap-2">
              <button onClick={() => gradeSubmission(selectedSubmission.id, 22)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">Submit Grade</button>
              <button onClick={() => setSelectedSubmission(null)} className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}