import { useMemo, useState } from 'react';

const sampleThreads = [
  {
    id: 't1',
    title: 'Doubt in Newton’s Third Law',
    author: 'Alex Johnson',
    time: '2h ago',
    tags: ['Physics', 'Forces'],
    replies: [
      { id: 'r1', author: 'Sarah Miller', time: '1h ago', text: 'Action and reaction forces act on different bodies.' },
      { id: 'r2', author: 'Mike Kim', time: '35m ago', text: 'Also remember they are equal in magnitude.' }
    ]
  },
  {
    id: 't2',
    title: 'Share lab readings for Waves experiment',
    author: 'Emma Davis',
    time: '5h ago',
    tags: ['Lab', 'Waves'],
    replies: []
  }
];

export default function ClassDiscussion({ onBack, classMeta }) {
  const [threads, setThreads] = useState(sampleThreads);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const stats = useMemo(() => ({
    students: 35, // could be dynamic from class context later
    discussions: threads.length,
  }), [threads.length]);

  const postThread = () => {
    const title = newTitle.trim();
    const body = newBody.trim();
    if (!title || !body) return;
    const t = {
      id: `t${Date.now()}`,
      title,
      author: 'You',
      time: 'just now',
      tags: ['General'],
      replies: []
    };
    setThreads([t, ...threads]);
    setNewTitle('');
    setNewBody('');
  };

  const title = classMeta?.name || 'Class Discussion';
  const subtitle = classMeta?.subject ? `${classMeta.subject[0].toUpperCase()}${classMeta.subject.slice(1)}` : 'General';
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-gray-600 hover:text-indigo-600">← Back</button>
            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          </div>
          <div className="hidden md:block text-sm text-gray-500">
            {classMeta?.from === 'teacher' && classMeta?.teacher ? (
              <span>{subtitle} • {classMeta.teacher} • {classMeta.studentCount || 0} students</span>
            ) : classMeta?.from === 'student' ? (
              <span>{subtitle} • by {classMeta?.owner || 'Student'} • {classMeta?.studentCount || 1} members</span>
            ) : (
              <span>Discussion space</span>
            )}
          </div>
        </div>
      </header>

      {/* Stats bar */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-700">{stats.students}</div>
            <div className="text-sm font-medium text-blue-700/90">Students Enrolled</div>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-indigo-700">{stats.discussions}</div>
            <div className="text-sm font-medium text-indigo-700/90">Discussions</div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">
        {/* New Post */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Start a new thread</h2>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title (e.g., Help with Waves)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-sm"
            />
            <textarea
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Describe your question or share resources..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
            <div className="mt-3 flex justify-end">
              <button onClick={postThread} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Post</button>
            </div>
          </div>

          {/* Threads */}
          <div className="space-y-4">
            {threads.map((t) => (
              <div key={t.id} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{t.title}</h3>
                    <div className="text-xs text-gray-500">By {t.author} • {t.time}</div>
                  </div>
                  <div className="flex gap-1">
                    {t.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
                {t.replies.length > 0 && (
                  <div className="mt-3 border-t border-gray-100 pt-3 space-y-2">
                    {t.replies.map(r => (
                      <div key={r.id} className="text-sm">
                        <span className="font-medium text-gray-800">{r.author}</span>
                        <span className="text-gray-500"> • {r.time}</span>
                        <div className="text-gray-700">{r.text}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Pinned</h4>
            <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
              <li>Lab safety rules for the semester</li>
              <li>Waves experiment rubric (PDF)</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Upcoming</h4>
            <div className="text-sm text-gray-700">
              Wave Lab submission • Fri 5 PM
            </div>
          </div>
          {/* Quick panels like design */}
          <div className="grid gap-3">
            <a className="block rounded-lg p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition" href="#discussion-history">
              <h3 className="font-semibold text-blue-700 mb-1">🗂 Discussion History</h3>
              <p className="text-sm text-gray-600">View past questions and replies</p>
            </a>
            <a className="block rounded-lg p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition" href="#teacher-panel">
              <h3 className="font-semibold text-blue-700 mb-1">👩‍🏫 Teacher Panel</h3>
              <p className="text-sm text-gray-600">Manage students and content</p>
            </a>
            <a className="block rounded-lg p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition" href="#student-panel">
              <h3 className="font-semibold text-blue-700 mb-1">👨‍🎓 Student Panel</h3>
              <p className="text-sm text-gray-600">Track progress and participate</p>
            </a>
          </div>
        </aside>
      </main>
    </div>
  );
}
