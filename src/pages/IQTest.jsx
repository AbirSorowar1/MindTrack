import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { ref, set } from "firebase/database";

const questions = [
    { q: "2, 4, 8, 16, ?", options: ["18", "24", "32", "20"], answer: "32" },
    { q: "If CAT = 24, DOG = 26, then BAT = ?", options: ["21", "23", "24", "26"], answer: "23" },
    { q: "Find the odd one out", options: ["Apple", "Banana", "Carrot", "Mango"], answer: "Carrot" },
    { q: "5 + 3 × 2 = ?", options: ["16", "11", "10", "13"], answer: "11" },
    { q: "Which number completes the pattern? 3, 9, 27, ?", options: ["54", "81", "72", "90"], answer: "81" },
    { q: "Which shape has 6 sides?", options: ["Pentagon", "Hexagon", "Octagon", "Triangle"], answer: "Hexagon" },
    { q: "If ALL roses are flowers, which is true?", options: ["Some flowers are roses", "All flowers are roses", "No flowers are roses", "None"], answer: "Some flowers are roses" },
    { q: "Which number is smallest?", options: ["0.5", "0.05", "0.005", "0.0005"], answer: "0.0005" },
    { q: "Mirror of LEFT becomes?", options: ["TFEL", "LEFT", "TFLE", "ELFT"], answer: "TFEL" },
    { q: "If 1 = 5, 2 = 25, 3 = 125, then 4 = ?", options: ["625", "256", "525", "725"], answer: "625" }
];

const IQTest = () => {
    const { user } = useAuth();
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const selectOption = (qIndex, option) => {
        setAnswers({ ...answers, [qIndex]: option });
    };

    const calculateIQ = async () => {
        let score = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.answer) score++;
        });

        const iqScore = 70 + score * 5;

        let level = "";
        if (iqScore < 90) level = "Below Average";
        else if (iqScore < 110) level = "Average";
        else if (iqScore < 130) level = "Above Average";
        else level = "Genius Range";

        const resultData = {
            score: iqScore,
            correct: score,
            level,
            date: new Date().toISOString()
        };

        setResult(resultData);

        await set(ref(db, "users/" + user.uid + "/iqtest"), resultData);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">IQ Test</h2>

            {questions.map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow mb-4">
                    <p className="font-semibold mb-3">{i + 1}. {item.q}</p>

                    <div className="grid grid-cols-2 gap-4">
                        {item.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => selectOption(i, opt)}
                                className={`p-3 rounded-xl text-white font-medium shadow-lg transform transition-all duration-200
                  ${answers[i] === opt
                                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 scale-105 shadow-xl"
                                        : "bg-gradient-to-r from-indigo-400 to-purple-400 hover:scale-105 hover:shadow-lg"
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            <button
                onClick={calculateIQ}
                className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition"
            >
                Submit IQ Test
            </button>

            {result && (
                <div className="mt-6 bg-blue-100 p-6 rounded-xl">
                    <h3 className="text-xl font-bold">IQ Score: {result.score}</h3>
                    <p>Correct Answers: {result.correct}/10</p>
                    <p className="font-semibold">Level: {result.level}</p>
                </div>
            )}
        </div>
    );
};

export default IQTest;
