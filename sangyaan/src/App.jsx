import { useState, useEffect } from "react";
import { db } from "./db";

function App() {
  const [score, setScore] = useState(0);
  const [quizzes, setQuizzes] = useState([]);

  const saveScore = async () => {
    await db.quizzes.add({ lesson: "Math Basics", score, date: new Date() });
    loadScores();
  };

  const loadScores = async () => {
    const allScores = await db.quizzes.toArray();
    setQuizzes(allScores);
  };

  useEffect(() => {
    loadScores();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">SANGYAAN</h1>
      <p className="mb-2">Your Score: {score}</p>
      <div className="space-x-2 mb-4">
        <button
          onClick={() => setScore(score + 1)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          +1
        </button>
        <button
          onClick={saveScore}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Score
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2">Saved Scores</h2>
      <ul className="bg-white shadow rounded p-3 w-64">
        {quizzes.map((q) => (
          <li key={q.id} className="border-b py-1">
            {q.lesson} → {q.score} points
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
