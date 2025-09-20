/**
 * Quiz Component
 * 
 * Purpose: Interactive quiz interface for learning levels
 * Features:
 * - MCQ and numerical questions
 * - Progress tracking
 * - Level unlocking based on performance
 * - Uses que.json data structure
 */

import { useState, useEffect } from 'react';

const Quiz = ({ topicId, onQuizComplete, onBack }) => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [numericalAnswer, setNumericalAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [score, setScore] = useState(0);
    const [timeStarted, setTimeStarted] = useState(null);

    // Sample quiz data based on que.json structure
    const sampleQuizData = {
        "phy_8_gravity_01": {
            "topic_id": "phy_8_gravity_01",
            "topic_name": "Gravity and Forces",
            "questions": [
                {
                    "qid": "phy_8_gravity_01_q1",
                    "type": "mcq",
                    "ques": "What happens to gravitational force if the mass of one object doubles?",
                    "mcq": [
                        "Force doubles",
                        "Force halves",
                        "Force remains same",
                        "Force becomes zero"
                    ],
                    "answer": { "mcq": 0 },
                    "difficulty": "easy",
                    "special": false,
                    "prev_node": "theory",
                    "next_node": "phy_8_gravity_01_q2",
                    "status": "unattempted"
                },
                {
                    "qid": "phy_8_gravity_01_q2",
                    "type": "numerical",
                    "ques": "Calculate the gravitational force between two objects of mass 2kg and 3kg separated by 1m distance. (G = 6.67 × 10⁻¹¹ N⋅m²/kg²)",
                    "answer": { "value": "4.0e-11" },
                    "difficulty": "medium",
                    "special": false,
                    "prev_node": "phy_8_gravity_01_q1",
                    "next_node": "boss_q1",
                    "status": "unattempted"
                },
                {
                    "qid": "boss_q1",
                    "type": "mcq",
                    "ques": "Which factor affects gravitational force the most when doubled?",
                    "mcq": [
                        "Distance (force becomes 1/4)",
                        "Mass (force doubles)",
                        "Shape of objects",
                        "Temperature"
                    ],
                    "answer": { "mcq": 0 },
                    "difficulty": "boss",
                    "special": true,
                    "prev_node": "phy_8_gravity_01_q2",
                    "next_node": null,
                    "status": "unattempted"
                }
            ]
        },
        "math_algebra_01": {
            "topic_id": "math_algebra_01",
            "topic_name": "Basic Algebra",
            "questions": [
                {
                    "qid": "math_algebra_01_q1",
                    "type": "mcq",
                    "ques": "What is the value of x in the equation: 2x + 5 = 15?",
                    "mcq": ["x = 5", "x = 10", "x = 7.5", "x = 20"],
                    "answer": { "mcq": 0 },
                    "difficulty": "easy",
                    "special": false,
                    "prev_node": "theory",
                    "next_node": "math_algebra_01_q2",
                    "status": "unattempted"
                },
                {
                    "qid": "math_algebra_01_q2",
                    "type": "numerical",
                    "ques": "Solve for y: 3y - 7 = 14",
                    "answer": { "value": "7" },
                    "difficulty": "medium",
                    "special": false,
                    "prev_node": "math_algebra_01_q1",
                    "next_node": null,
                    "status": "unattempted"
                }
            ]
        }
    };

    useEffect(() => {
        loadQuizData();
    }, [topicId]);

    const loadQuizData = () => {
        // In a real app, this would fetch from an API or file
        const data = sampleQuizData[topicId];
        if (data) {
            setQuizData(data);
            setCurrentQuestion(data.questions[0]);
            setProgress({ current: 1, total: data.questions.length });
            setTimeStarted(Date.now());
        }
    };

    const handleMCQAnswer = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNumericalAnswer = (value) => {
        setNumericalAnswer(value);
    };

    const submitAnswer = () => {
        if (!currentQuestion) return;

        let correct = false;

        if (currentQuestion.type === 'mcq') {
            correct = selectedAnswer === currentQuestion.answer.mcq;
        } else if (currentQuestion.type === 'numerical') {
            const userAnswer = parseFloat(numericalAnswer);
            const correctAnswer = parseFloat(currentQuestion.answer.value);
            // Allow for small floating point differences
            correct = Math.abs(userAnswer - correctAnswer) < 0.01 ||
                numericalAnswer.toLowerCase() === currentQuestion.answer.value.toLowerCase();
        }

        setIsCorrect(correct);
        setShowResult(true);

        if (correct) {
            setScore(prev => prev + 1);
        }

        // Update question status
        currentQuestion.status = correct ? 'correct' : 'incorrect';
        currentQuestion.stats = {
            time_taken: Date.now() - timeStarted,
            attempts: (currentQuestion.stats?.attempts || 0) + 1
        };
    };

    const nextQuestion = () => {
        if (!currentQuestion || !quizData) return;

        const currentIndex = quizData.questions.findIndex(q => q.qid === currentQuestion.qid);
        const nextIndex = currentIndex + 1;

        if (nextIndex < quizData.questions.length) {
            // Move to next question
            setCurrentQuestion(quizData.questions[nextIndex]);
            setProgress({ current: nextIndex + 1, total: quizData.questions.length });
            setSelectedAnswer('');
            setNumericalAnswer('');
            setShowResult(false);
            setTimeStarted(Date.now());
        } else {
            // Quiz completed
            completeQuiz();
        }
    };

    const completeQuiz = () => {
        const finalScore = score;
        const totalQuestions = quizData.questions.length;
        const percentage = (finalScore / totalQuestions) * 100;

        // Determine if level should be unlocked (70% or higher)
        const levelUnlocked = percentage >= 70;

        onQuizComplete({
            topicId,
            score: finalScore,
            total: totalQuestions,
            percentage,
            levelUnlocked,
            questions: quizData.questions
        });
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'text-green-600 bg-green-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'boss': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getDifficultyIcon = (difficulty) => {
        switch (difficulty) {
            case 'easy': return '🟢';
            case 'medium': return '🟡';
            case 'boss': return '🔴';
            default: return '⚪';
        }
    };

    if (!quizData || !currentQuestion) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📚</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Loading Quiz...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={onBack}
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition"
                        >
                            <span>←</span>
                            <span>Back to Levels</span>
                        </button>

                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-600">
                                Question {progress.current} of {progress.total}
                            </div>
                            <div className="text-sm font-semibold text-blue-600">
                                Score: {score}/{progress.total}
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(progress.current / progress.total) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                    <div className="mb-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="text-2xl">{getDifficultyIcon(currentQuestion.difficulty)}</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(currentQuestion.difficulty)}`}>
                                {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                                {currentQuestion.special && ' Boss'}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            {currentQuestion.ques}
                        </h2>
                    </div>

                    {/* Answer Options */}
                    {currentQuestion.type === 'mcq' && (
                        <div className="space-y-3 mb-8">
                            {currentQuestion.mcq.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleMCQAnswer(index)}
                                    disabled={showResult}
                                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${selectedAnswer === index
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswer === index ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                                            }`}>
                                            {selectedAnswer === index && <span className="text-white text-sm">✓</span>}
                                        </div>
                                        <span className="font-medium">{option}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {currentQuestion.type === 'numerical' && (
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter your numerical answer:
                            </label>
                            <input
                                type="text"
                                value={numericalAnswer}
                                onChange={(e) => handleNumericalAnswer(e.target.value)}
                                disabled={showResult}
                                placeholder="Enter your answer (e.g., 4.0e-11 or 7)"
                                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                    )}

                    {/* Result Display */}
                    {showResult && (
                        <div className={`p-6 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                            }`}>
                            <div className="flex items-center space-x-3 mb-3">
                                <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
                                <span className={`font-bold text-lg ${isCorrect ? 'text-green-800' : 'text-red-800'
                                    }`}>
                                    {isCorrect ? 'Correct!' : 'Incorrect'}
                                </span>
                            </div>

                            {!isCorrect && (
                                <div className="text-gray-700">
                                    <strong>Correct answer:</strong> {' '}
                                    {currentQuestion.type === 'mcq'
                                        ? currentQuestion.mcq[currentQuestion.answer.mcq]
                                        : currentQuestion.answer.value
                                    }
                                </div>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        {!showResult ? (
                            <button
                                onClick={submitAnswer}
                                disabled={
                                    (currentQuestion.type === 'mcq' && selectedAnswer === '') ||
                                    (currentQuestion.type === 'numerical' && numericalAnswer === '')
                                }
                                className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Submit Answer
                            </button>
                        ) : (
                            <button
                                onClick={nextQuestion}
                                className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
                            >
                                {progress.current < progress.total ? 'Next Question' : 'Complete Quiz'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;