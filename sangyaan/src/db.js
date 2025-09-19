import Dexie from "dexie";

export const db = new Dexie("sangyaanDB");

// Define schema
db.version(1).stores({
  quizzes: "++id, lesson, score, date",
  streaks: "id, count"
});
