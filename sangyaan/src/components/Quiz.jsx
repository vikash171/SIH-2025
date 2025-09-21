/**
 * Quiz Component - Gamified Learning Interface (left-half of design)
 * - Tailwind-only styling (no external CSS)
 * - Uses dummy data for now; topicId maps to a sample set
 * - After finishing, shows a Reward view (power-ups, achievements, leaderboard)
 */

import { useEffect, useMemo, useState } from 'react';

const SAMPLE_SETS = {
    math_algebra_01: [
        {
            question: 'What is the value of x in the equation: 2x + 5 = 15?',
            answers: ['x = 5', 'x = 10', 'x = 7.5', 'x = 20'],
            correct: 0,
            hint: 'Move 5 to the right side and divide by 2.'
        },
        {
            question: 'Solve for y: 3y - 7 = 14',
            answers: ['y = 7', 'y = 21', 'y = 3', 'y = 14/3'],
            correct: 0,
            hint: 'Add 7 to both sides, then divide by 3.'
        },
        {
            question: 'Simplify: (x + 3) + (x - 5)',
            answers: ['2x - 2', '2x + 8', 'x - 2', 'x + 8'],
            correct: 0,
            hint: 'Combine like terms: x + x and 3 - 5.'
        },
        {
            question: 'What is the solution of 5x = 25?',
            answers: ['x = 10', 'x = 5', 'x = 1', 'x = 0'],
            correct: 1,
            hint: 'Divide both sides by 5.'
        },
        {
            question: 'If x = 3, evaluate 2x^2 - x',
            answers: ['15', '18', '3', '12'],
            correct: 0,
            hint: '2*(9) - 3 = 18 - 3.'
        }
    ],
    phy_8_gravity_01: [
        {
            question: 'What is the SI unit of force?',
            answers: ['Joule', 'Newton', 'Watt', 'Pascal'],
            correct: 1,
            hint: 'Named after the scientist who formulated the laws of motion.'
        },
        {
            question: 'Which of these is a vector quantity?',
            answers: ['Speed', 'Distance', 'Velocity', 'Time'],
            correct: 2,
            hint: 'Has magnitude and direction.'
        },
        {
            question: 'Acceleration due to gravity on Earth (approx.)?',
            answers: ['9.8 m/s²', '10 m/s²', '8.9 m/s²', '9.8 m/s'],
            correct: 0,
            hint: 'A constant near the surface of the Earth.'
        },
        {
            question: 'For every action, there is an equal and opposite reaction.',
            answers: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", 'Conservation of Energy'],
            correct: 2,
            hint: 'Explains recoil and push-back effects.'
        },
        {
            question: 'Formula for kinetic energy?',
            answers: ['mgh', '1/2 mv²', 'mv', 'mgh/t'],
            correct: 1,
            hint: 'Depends on mass and square of velocity.'
        }
    ]
};

const mapTopicToSample = (topicId) => {
    // Fallback to algebra set if unknown
    if (SAMPLE_SETS[topicId]) return topicId;
    return 'math_algebra_01';
};

const Quiz = ({ topicId = 'math_algebra_01', onQuizComplete, onBack }) => {
    const setKey = useMemo(() => mapTopicToSample(topicId), [topicId]);
    const questions = useMemo(() => SAMPLE_SETS[setKey], [setKey]);

    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [elapsed, setElapsed] = useState(0); // seconds for current question
    const [timerActive, setTimerActive] = useState(true);

    useEffect(() => {
        if (!timerActive) return;
        const id = setInterval(() => setElapsed((e) => e + 1), 1000);
        return () => clearInterval(id);
    }, [timerActive]);

    const total = questions.length;
    const progressPct = Math.round(((index + 1) / total) * 100);

    const current = questions[index];

    const submit = () => {
        if (submitted || selected == null) return;
        const isCorrect = selected === current.correct;
        setSubmitted(true);
        setAttempts((a) => a + 1);
        setTimerActive(false);
        if (isCorrect) {
            setScore((s) => s + 1);
            setStreak((s) => s + 1);
        } else {
            setStreak(0);
        }
        setShowStats(true);
    };

    const next = () => {
        if (!submitted) return;
        if (index + 1 < total) {
            setIndex((i) => i + 1);
            setSelected(null);
            setSubmitted(false);
            setAttempts(0);
            setElapsed(0);
            setTimerActive(true);
            setShowHint(false);
        } else {
            setCompleted(true);
            if (onQuizComplete) {
                onQuizComplete({ topicId: setKey, score, total, percentage: (score / total) * 100 });
            }
        }
    };

    const previous = () => {
        if (index === 0) return;
        setIndex((i) => i - 1);
        setSelected(null);
        setSubmitted(false);
        setAttempts(0);
        setElapsed(0);
        setTimerActive(true);
        setShowHint(false);
    };

    if (completed) {
        // Reward view (right-half widgets as a summary screen)
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-700 to-yellow-600 p-4 md:p-8">
                <div className="max-w-5xl mx-auto text-white">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 md:p-8 mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold flex items-center">
                                    <span className="mr-3">🏁</span>
                                    Quest Complete
                                </h1>
                                <p className="opacity-80 mt-1">Nice work! Here are your rewards and highlights.</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{score}</div>
                                    <div className="text-xs opacity-80">SCORE</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{Math.round((score / total) * 100)}%</div>
                                    <div className="text-xs opacity-80">ACCURACY</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{streak}</div>
                                    <div className="text-xs opacity-80">BEST STREAK</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 lg:col-span-1">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <span className="mr-2">⚡</span> Power-ups
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <span>🕒</span>
                                        <span>Time Freeze</span>
                                    </div>
                                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">+1</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <span>👁️</span>
                                        <span>Reveal Answer</span>
                                    </div>
                                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">+1</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <span>🛡️</span>
                                        <span>Shield</span>
                                    </div>
                                    <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">+1</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 lg:col-span-1">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <span className="mr-2">🏆</span> Achievements
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="text-center">
                                    <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-1">⭐</div>
                                    <span className="text-xs">First Win</span>
                                </div>
                                <div className="text-center">
                                    <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-1">🔥</div>
                                    <span className="text-xs">On Fire</span>
                                </div>
                                <div className="text-center opacity-50">
                                    <div className="bg-gray-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-1">🔒</div>
                                    <span className="text-xs">Locked</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 lg:col-span-1">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <span className="mr-2">👑</span> Top Players
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center mr-3 text-black font-bold">1</div>
                                    <div className="flex-1">
                                        <div className="font-medium">Alex Johnson</div>
                                        <div className="text-xs opacity-70">2,450 pts</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center mr-3 text-black font-bold">2</div>
                                    <div className="flex-1">
                                        <div className="font-medium">Sam Wilson</div>
                                        <div className="text-xs opacity-70">2,100 pts</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center mr-3 text-white font-bold">3</div>
                                    <div className="flex-1">
                                        <div className="font-medium">Taylor Reed</div>
                                        <div className="text-xs opacity-70">1,980 pts</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                        <button onClick={onBack} className="px-6 py-3 rounded-full bg-white/10 border border-white/30 hover:bg-white/20 transition">
                            ← Back to Levels
                        </button>
                        <button onClick={onBack} className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition">
                            Continue Journey →
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-700 to-yellow-600 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 text-white mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
                                <span className="mr-3">🧠</span>
                                Quiz
                            </h1>
                            <p className="text-sm md:text-base mt-1 opacity-80">Master concepts through gamified learning</p>
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{score}</div>
                                <div className="text-xs opacity-80">SCORE</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">{streak}</div>
                                <div className="text-xs opacity-80">STREAK</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">{index + 1}</div>
                                <div className="text-xs opacity-80">Q INDEX</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content - Left Half of original design */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 md:p-8 text-white">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between text-sm mb-2">
                            <span>
                                Question <span>{index + 1}</span> of <span>{total}</span>
                            </span>
                            <span>{progressPct}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3">
                            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 h-3 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                        </div>
                    </div>

                    {/* Question Area */}
                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            <div className="bg-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">💡</div>
                            <h2 className="text-xl md:text-2xl font-semibold">Challenge</h2>
                        </div>

                        <div className="bg-white/10 rounded-xl p-6 mb-6">
                            <p className="text-lg md:text-xl">{current.question}</p>
                        </div>

                                    {/* Answer Options */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
                                        {current.answers.map((ans, i) => {
                                            const isSelected = selected === i;
                                            const isCorrect = submitted && i === current.correct;
                                            const isWrong = submitted && isSelected && i !== current.correct;
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => !submitted && setSelected(i)}
                                                    className={`group rounded-2xl p-5 text-left transition-all border ${
                                                        isCorrect
                                                            ? 'bg-green-500/90 border-green-400 text-white shadow-lg shadow-green-900/30'
                                                            : isWrong
                                                            ? 'bg-red-500/90 border-red-400 text-white shadow-lg shadow-red-900/30'
                                                            : isSelected
                                                            ? 'bg-green-700/30 border-green-300 text-white shadow-md'
                                                            : 'bg-white/10 hover:bg-white/15 border-white/20 hover:border-white/40 hover:shadow-md'
                                                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className={`rounded-full w-9 h-9 flex items-center justify-center font-bold shrink-0 ${
                                                            isCorrect || isWrong ? 'bg-white/20' : 'bg-white/20 group-hover:bg-white/25'
                                                        }`}>
                                                            {String.fromCharCode(65 + i)}
                                                        </div>
                                                        <span className="leading-relaxed text-base md:text-lg">
                                                            {ans}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                        {/* Hint Button */}
                        <div className="mt-6 flex justify-center">
                            <button
                                className="bg-amber-700 hover:bg-amber-800 text-white py-2 px-6 rounded-full flex items-center transition-all"
                                onClick={() => setShowHint(true)}
                                disabled={showHint}
                            >
                                <span className="mr-2">❔</span>
                                Need a Hint? (-10 points)
                            </button>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-0 sm:justify-between">
                                    <button className="bg-gray-700/90 hover:bg-gray-800 text-white py-4 px-8 text-base md:text-lg rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed" onClick={previous} disabled={index === 0}>
                            ← Previous
                        </button>
                        {!submitted ? (
                            <button
                                            className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-8 text-base md:text-lg rounded-full transition-all ${
                                    selected == null ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                onClick={submit}
                                disabled={selected == null}
                            >
                                Submit
                            </button>
                        ) : (
                            <button
                                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-8 text-base md:text-lg rounded-full transition-all"
                                onClick={next}
                            >
                                {index + 1 < total ? 'Next' : 'Finish'} →
                            </button>
                        )}
                    </div>
                </div>

                {/* Hint Modal */}
                {showHint && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md w-full mx-4 text-white">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Hint</h3>
                                <button onClick={() => setShowHint(false)} className="hover:text-gray-200">✖</button>
                            </div>
                            <p className="mb-4">{current.hint}</p>
                            <button onClick={() => setShowHint(false)} className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-full w-full">Got it!</button>
                        </div>
                    </div>
                )}

                {/* Back to Levels */}
                <div className="mt-6 flex justify-start">
                    <button onClick={onBack} className="text-white/90 hover:text-white underline">← Back to Levels</button>
                </div>
            </div>
            {/* Per-submit Stats Popup */}
            {showStats && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden">
                        <div className="px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Your Stats</h3>
                            <button onClick={() => setShowStats(false)} className="hover:opacity-90">✖</button>
                        </div>
                        <div className="p-6 grid grid-cols-2 gap-4">
                            <div className="bg-amber-50 rounded-lg p-4">
                                <div className="text-xs text-amber-700 mb-1">Time Taken</div>
                                <div className="text-2xl font-bold text-amber-800">{elapsed}s</div>
                            </div>
                            <div className="bg-emerald-50 rounded-lg p-4">
                                <div className="text-xs text-emerald-700 mb-1">Attempts</div>
                                <div className="text-2xl font-bold text-emerald-800">{attempts}</div>
                            </div>
                            <div className="col-span-2 bg-indigo-50 rounded-lg p-4">
                                <div className="text-xs text-indigo-700 mb-1">Leaderboard Snapshot</div>
                                <div className="text-sm text-indigo-900">You’re currently ranked top 25% for this question.</div>
                            </div>
                            <div className="col-span-2 bg-yellow-50 rounded-lg p-4">
                                <div className="text-xs text-yellow-700 mb-1">Achievements & Rewards</div>
                                <div className="text-sm text-yellow-900">⭐ +10 Star points {submitted && selected === current.correct ? '(Correct!)' : '(Try again next!)'}</div>
                            </div>
                        </div>
                        <div className="px-6 py-4 flex justify-end gap-2 border-t">
                            <button onClick={() => setShowStats(false)} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Close</button>
                            {submitted && (
                                <button onClick={() => { setShowStats(false); next(); }} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white">Continue</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;