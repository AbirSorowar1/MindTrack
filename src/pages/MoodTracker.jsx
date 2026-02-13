import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { ref, set, get } from "firebase/database";

const moods = [
    { emoji: "😄", label: "Happy", color: "bg-yellow-400" },
    { emoji: "😐", label: "Neutral", color: "bg-gray-400" },
    { emoji: "😔", label: "Sad", color: "bg-blue-400" },
    { emoji: "😡", label: "Angry", color: "bg-red-500" },
    { emoji: "😱", label: "Stressed", color: "bg-purple-500" },
    { emoji: "😴", label: "Tired", color: "bg-indigo-400" }
];

const MoodTracker = () => {
    const { user } = useAuth();
    const [selectedMood, setSelectedMood] = useState(null);
    const [todayMood, setTodayMood] = useState(null);

    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    useEffect(() => {
        // Load today's mood
        get(ref(db, `users/${user.uid}/mood/${today}`)).then(snapshot => {
            if (snapshot.exists()) setTodayMood(snapshot.val());
        });
    }, [user, today]);

    const saveMood = async (mood) => {
        setSelectedMood(mood);
        await set(ref(db, `users/${user.uid}/mood/${today}`), mood);
        setTodayMood(mood);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Mood Tracker</h2>

            <p className="mb-4">Select your mood for today:</p>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {moods.map((m, idx) => (
                    <button
                        key={idx}
                        onClick={() => saveMood(m)}
                        className={`p-4 rounded-xl flex flex-col items-center justify-center font-bold text-white text-xl transform transition-all duration-200 shadow-lg
              ${m.color} ${todayMood?.emoji === m.emoji ? "scale-110 shadow-2xl border-4 border-white" : "hover:scale-105 hover:shadow-xl"
                            }`}
                    >
                        <span className="text-3xl">{m.emoji}</span>
                        <span className="mt-2 text-sm">{m.label}</span>
                    </button>
                ))}
            </div>

            {todayMood && (
                <div className="mt-6 bg-green-100 p-4 rounded-xl">
                    <h3 className="font-bold text-lg">Today's Mood:</h3>
                    <p className="text-2xl">{todayMood.emoji} {todayMood.label}</p>
                </div>
            )}
        </div>
    );
};

export default MoodTracker;
