import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { ref, set } from "firebase/database";

const questions = [
    "Last 7 din e apni chinta e ghum haraiyen?",
    "Apni ki prai tension feel koren?",
    "Mon kharap thakar jonne kono kaj korte iccha kore na?",
    "Apni ki beshi overthinking koren?",
    "Apnar mood ki taratari change hoy?",
    "Apni ki nijeke worthless mone koren?",
    "Apni ki social interaction avoid koren?",
    "Apnar energy level ki kom mone hoy?",
    "Apni ki beshi irritate hoye jan?",
    "Apni ki easily hopeless feel koren?",
    "Apni ki nijer upor confidence haracchen?",
    "Apni ki future niye beshi chinta koren?",
    "Apni ki frequently anxious feel koren?",
    "Apnar ki kono kichu te interest komche?",
    "Apni ki beshi mental pressure feel koren?"
];

const options = [
    { text: "Never", score: 0 },
    { text: "Rarely", score: 1 },
    { text: "Sometimes", score: 2 },
    { text: "Often", score: 3 },
    { text: "Always", score: 4 }
];

const Assessment = () => {
    const { user } = useAuth();
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const handleSelect = (qIndex, score) => {
        setAnswers({ ...answers, [qIndex]: score });
    };

    const calculateScore = async () => {
        const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

        let status = "";
        let advice = "";

        if (totalScore <= 15) {
            status = "Healthy 😊";
            advice = "You are doing well. Maintain a balanced lifestyle.";
        } else if (totalScore <= 30) {
            status = "Mild Stress 😐";
            advice = "Try relaxation, proper sleep, and physical activity.";
        } else if (totalScore <= 45) {
            status = "Moderate Stress ⚠️";
            advice = "Consider stress management techniques and talking to someone.";
        } else {
            status = "High Risk 🚨";
            advice = "Please consider consulting a mental health professional.";
        }

        const resultData = {
            score: totalScore,
            status,
            advice,
            date: new Date().toISOString()
        };

        setResult(resultData);

        await set(ref(db, "users/" + user.uid + "/assessment"), resultData);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Mental Health Assessment</h2>

            {questions.map((q, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow mb-4">
                    <p className="font-semibold mb-3">{i + 1}. {q}</p>

                    <div className="grid grid-cols-2 gap-2">
                        {options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSelect(i, opt.score)}
                                className={`border p-2 rounded-lg hover:bg-indigo-100 ${answers[i] === opt.score ? "bg-indigo-200" : ""
                                    }`}
                            >
                                {opt.text}
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            <button
                onClick={calculateScore}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
            >
                Submit Assessment
            </button>

            {result && (
                <div className="mt-6 bg-green-100 p-6 rounded-xl">
                    <h3 className="text-xl font-bold">Your Score: {result.score}</h3>
                    <p className="font-semibold">Status: {result.status}</p>
                    <p className="mt-2">Advice: {result.advice}</p>
                </div>
            )}
        </div>
    );
};

export default Assessment;
