import { useMemo, useState } from 'react';
import Quiz from './Quiz';

const SUBJECTS = [
  { id: 'mathematics', name: 'Mathematics', topics: [
    { id: 'math_algebra_01', name: 'Algebra Basics' },
  ]},
  { id: 'physics', name: 'Physics', topics: [
    { id: 'phy_8_gravity_01', name: 'Forces & Motion' },
  ]}
];

// localStorage helpers for prototype best scores
const bestKey = (mode, topicId) => `arena.best.${mode}.${topicId}`;
const getBest = (mode, topicId) => {
  try { return parseInt(localStorage.getItem(bestKey(mode, topicId)) || '0', 10); } catch {
    // ignore
    return 0;
  }
};
const setBest = (mode, topicId, scorePct) => {
  try {
    const current = getBest(mode, topicId);
    if (scorePct > current) localStorage.setItem(bestKey(mode, topicId), String(scorePct));
  } catch {
    // ignore
  }
};

// Modes: single, random, rapid, multiplayer (stub), team (stub)
export default function Arena() {
  const [mode, setMode] = useState('single');
  const [subject, setSubject] = useState('mathematics');
  const topics = useMemo(() => SUBJECTS.find(s => s.id === subject)?.topics || [], [subject]);
  const [topicId, setTopicId] = useState('math_algebra_01');
  const [start, setStart] = useState(false);
  const [seed, setSeed] = useState(0);

  const onStart = (selectedMode) => {
    if (selectedMode) setMode(selectedMode);
    setSeed(s => s + 1); // force remount
    setStart(true);
  };

  const onQuizComplete = (res) => {
    setStart(false);
    const pct = Math.round(res.percentage);
    setBest(mode, topicId, pct);
    alert(`Score: ${res.score}/${res.total} ( ${pct}% )`);
  };

  const best = getBest(mode, topicId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white p-6 shadow mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">🎮 Arena</h1>
              <p className="opacity-90">Single-player, random, and rapid-fire rounds for quick demos. Multiplayer coming soon.</p>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-90">Best ({mode})</div>
              <div className="text-2xl font-bold">{best}%</div>
            </div>
          </div>
        </div>

        {/* Controls + Samples */}
        {!start && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left: selectors */}
            <div className="bg-white rounded-lg shadow p-4 space-y-4 lg:col-span-1">
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <select value={subject} onChange={e=>{ setSubject(e.target.value); const first=SUBJECTS.find(s=>s.id===e.target.value)?.topics?.[0]?.id; if(first) setTopicId(first); }} className="w-full border rounded px-3 py-2">
                  {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Topic</label>
                <select value={topicId} onChange={e=>setTopicId(e.target.value)} className="w-full border rounded px-3 py-2">
                  {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'single', label: '🎯 Single' },
                    { id: 'random', label: '🔀 Random' },
                    { id: 'rapid', label: '⚡ Rapid' },
                    { id: 'multiplayer', label: '👥 Multi (Soon)' },
                    { id: 'team', label: '🛡️ Team (Soon)' },
                  ].map((m) => (
                    <button key={m.id} onClick={()=>setMode(m.id)} className={`px-3 py-2 rounded border text-left ${mode===m.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 text-gray-800 border-gray-300'}`}>{m.label}</button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={()=>onStart()} className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white">Start</button>
              </div>
            </div>

            {/* Right: sample rounds */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <SampleCard
                title="Quick Quiz"
                subtitle="5 Q • Single Player"
                desc="A straightforward round to warm up."
                actionLabel="Play"
                onClick={()=>onStart('single')}
              />
              <SampleCard
                title="Random Mix"
                subtitle="5 Q • Random Order"
                desc="Shuffled questions for variety."
                actionLabel="Shuffle"
                onClick={()=>onStart('random')}
              />
              <SampleCard
                title="Rapid Fire"
                subtitle="10s/question"
                desc="Beat the clock for every question."
                actionLabel="Go Fast"
                onClick={()=>onStart('rapid')}
              />
              <div className="bg-white rounded-lg shadow p-4 border border-dashed">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">👥 Multiplayer</h3>
                    <p className="text-sm text-gray-600">Create room, share code, and compete. Coming soon.</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">Soon</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button disabled className="px-3 py-2 rounded border bg-gray-50 text-gray-400 cursor-not-allowed">Create Room</button>
                  <button disabled className="px-3 py-2 rounded border bg-gray-50 text-gray-400 cursor-not-allowed">Join with Code</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Area */}
        {start && (
          <div key={seed} className="mt-4">
            <ArenaQuizWrapper mode={mode} topicId={topicId} onComplete={onQuizComplete} onExit={()=>setStart(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

function SampleCard({ title, subtitle, desc, actionLabel, onClick }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="text-xs text-gray-500 mb-1">{subtitle}</div>
      <p className="text-sm text-gray-700">{desc}</p>
      <div className="mt-3 flex justify-end">
        <button onClick={onClick} className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm">{actionLabel}</button>
      </div>
    </div>
  );
}

function ArenaQuizWrapper({ mode, topicId, onComplete, onExit }) {
  // Pass mode to Quiz; Quiz handles random and rapid behavior
  return (
    <Quiz topicId={topicId} onQuizComplete={onComplete} onBack={onExit} mode={mode} />
  );
}
