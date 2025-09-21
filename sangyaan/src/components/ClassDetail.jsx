import { useMemo, useState } from 'react';

export default function ClassDetail({ classMeta, onBack, onOpenDiscussion, onNavigate }) {
  const [tab, setTab] = useState('overview');

  const sample = useMemo(() => ({
    overview: {
      announcement: 'Welcome to the new term! Please review the lab safety rules before Friday.',
      nextClass: 'Mon, 10:00 AM • Lab session',
      progress: 62,
    },
    assignments: [
      { id: 'a1', title: 'Wave Lab Report', due: 'Fri, 5 PM', status: 'Pending', points: 20 },
      { id: 'a2', title: 'Forces Worksheet', due: 'Sep 28', status: 'Submitted', points: 15 },
      { id: 'a3', title: 'Project Proposal', due: 'Oct 5', status: 'Assigned', points: 30 },
    ],
    tests: [
      { id: 't1', title: 'Waves Quiz', duration: '10 min', type: 'MCQ', status: 'Available' },
      { id: 't2', title: 'Forces Checkpoint', duration: '15 min', type: 'MCQ', status: 'Locked' },
    ],
    resources: [
      { id: 'r1', title: 'Lab Safety PDF', type: 'PDF', size: '1.2 MB' },
      { id: 'r2', title: 'Wave Simulation Link', type: 'Link', size: '' },
      { id: 'r3', title: 'Lecture Slides - Forces', type: 'Slides', size: '3.5 MB' },
    ],
    members: {
      teacher: classMeta?.teacher || classMeta?.owner || 'Instructor',
      students:  Array.from({ length: Math.min( (classMeta?.studentCount || 18), 18) }).map((_, i) => ({ id: `s${i}`, name: `Student ${i+1}`})),
    }
  }), [classMeta]);

  const SubjectBadge = ({ subject }) => {
    const map = {
      physics: { icon: '⚛️', color: 'blue' },
      chemistry: { icon: '🧪', color: 'green' },
      biology: { icon: '🧬', color: 'purple' },
      math: { icon: '🧮', color: 'orange' },
    };
    const m = map[subject] || { icon: '📚', color: 'gray' };
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-${m.color}-100 text-${m.color}-700 text-xs font-medium`}>
        <span>{m.icon}</span>
        <span>{subject ? subject[0].toUpperCase()+subject.slice(1) : 'General'}</span>
      </span>
    );
  };

  const ActionBar = () => (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => setTab('assignments')} className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">New Assignment</button>
      <button onClick={() => setTab('tests')} className="px-3 py-2 bg-pink-600 text-white rounded-lg text-sm hover:bg-pink-700">Start Test</button>
      <button onClick={() => onOpenDiscussion?.()} className="px-3 py-2 bg-sky-600 text-white rounded-lg text-sm hover:bg-sky-700">Discussion</button>
      <button onClick={() => setTab('resources')} className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700">Resources</button>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <header className="theme-card shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-gray-600 hover:opacity-70">← Back</button>
            <div>
              <h1 className="text-xl font-bold theme-text">{classMeta?.name || 'Classroom'}</h1>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <SubjectBadge subject={classMeta?.subject} />
                {classMeta?.from === 'teacher' && classMeta?.teacher && (
                  <span>• {classMeta.teacher} • {classMeta.studentCount || 0} students</span>
                )}
                {classMeta?.from === 'student' && classMeta?.owner && (
                  <span>• by {classMeta.owner} • {classMeta.studentCount || 1} members</span>
                )}
              </div>
            </div>
          </div>
          <ActionBar />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="mb-4 flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'assignments', label: 'Assignments' },
            { id: 'tests', label: 'Tests' },
            { id: 'resources', label: 'Resources' },
            { id: 'members', label: 'Members' },
            { id: 'discussion', label: 'Discussion' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => t.id === 'discussion' ? onOpenDiscussion?.() : setTab(t.id)}
              className={`px-3 py-2 rounded-lg text-sm border ${tab === t.id ? 'theme-primary text-white border-transparent' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Panels */}
        {tab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 theme-card rounded-xl p-4">
              <h3 className="font-semibold theme-text mb-2">Announcement</h3>
              <p className="text-sm text-gray-700">{sample.overview.announcement}</p>
              <div className="mt-3 text-sm text-gray-600">Next class: {sample.overview.nextClass}</div>
            </div>
            <div className="theme-card rounded-xl p-4">
              <h3 className="font-semibold theme-text mb-2">Progress</h3>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600" style={{ width: `${sample.overview.progress}%` }}></div>
              </div>
              <div className="text-sm text-gray-600 mt-2">{sample.overview.progress}% complete</div>
            </div>
          </div>
        )}

        {tab === 'assignments' && (
          <div className="space-y-3">
            {sample.assignments.map((a) => (
              <div key={a.id} className="theme-card rounded-xl p-4 flex items-start justify-between">
                <div>
                  <div className="font-semibold theme-text">{a.title}</div>
                  <div className="text-xs text-gray-500">Due {a.due} • {a.points} pts</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${a.status === 'Submitted' ? 'bg-green-100 text-green-700' : a.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{a.status}</span>
                  <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">Open</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tests' && (
          <div className="space-y-3">
            {sample.tests.map((t) => (
              <div key={t.id} className="theme-card rounded-xl p-4 flex items-start justify-between">
                <div>
                  <div className="font-semibold theme-text">{t.title}</div>
                  <div className="text-xs text-gray-500">{t.type} • {t.duration}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${t.status === 'Available' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{t.status}</span>
                  <button
                    onClick={() => onNavigate?.('arena')}
                    disabled={t.status !== 'Available'}
                    className={`px-3 py-1 ${t.status !== 'Available' ? 'bg-gray-300 text-gray-500' : 'bg-pink-600 text-white hover:bg-pink-700'} text-sm rounded-lg`}
                  >Start</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'resources' && (
          <div className="grid md:grid-cols-2 gap-3">
            {sample.resources.map((r) => (
              <a key={r.id} className="theme-card rounded-xl p-4 hover:shadow-md transition cursor-pointer">
                <div className="font-semibold theme-text">{r.title}</div>
                <div className="text-xs text-gray-500">{r.type}{r.size ? ` • ${r.size}` : ''}</div>
              </a>
            ))}
          </div>
        )}

        {tab === 'members' && (
          <div className="grid md:grid-cols-3 gap-3">
            <div className="theme-card rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Teacher</div>
              <div className="font-semibold theme-text">{sample.members.teacher}</div>
            </div>
            <div className="md:col-span-2 theme-card rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-2">Students</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {sample.members.students.map(s => (
                  <div key={s.id} className="px-3 py-2 bg-gray-50 rounded-lg text-sm">{s.name}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
