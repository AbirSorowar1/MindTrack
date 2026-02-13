import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const { user } = useAuth();
    const [data, setData] = useState(null);

    useEffect(() => {
        const userRef = ref(db, "users/" + user.uid);

        onValue(userRef, (snapshot) => {
            setData(snapshot.val());
        });
    }, [user]);

    // Mood Tracker Data
    const moodData = data?.mood ? Object.values(data.mood).map(m => m.label) : [];
    const moodCounts = moodData.reduce((acc, mood) => {
        acc[mood] = (acc[mood] || 0) + 1;
        return acc;
    }, {});
    const moodChartData = {
        labels: Object.keys(moodCounts),
        datasets: [
            {
                label: "Mood Frequency",
                data: Object.values(moodCounts),
                backgroundColor: [
                    "#FACC15", // Yellow
                    "#3B82F6", // Blue
                    "#EF4444", // Red
                    "#A78BFA", // Purple
                    "#10B981", // Green
                    "#F472B6"  // Pink
                ],
                borderRadius: 10
            }
        ]
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-8 text-indigo-600">Dashboard</h2>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Mental Health */}
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-6 rounded-2xl shadow-2xl text-white hover:scale-105 transform transition">
                    <h3 className="font-bold text-lg mb-2">Mental Health Score</h3>
                    <p className="text-2xl font-extrabold">{data?.assessment?.score || "N/A"}</p>
                    <p className="mt-1">{data?.assessment?.status || "No test yet"}</p>
                </div>

                {/* IQ Test */}
                <div className="bg-gradient-to-r from-indigo-500 to-blue-400 p-6 rounded-2xl shadow-2xl text-white hover:scale-105 transform transition">
                    <h3 className="font-bold text-lg mb-2">IQ Test Score</h3>
                    <p className="text-2xl font-extrabold">{data?.iqtest?.score || "N/A"}</p>
                    <p className="mt-1">{data?.iqtest?.level || ""}</p>
                </div>

                {/* Mood Tracker */}
                <div className="bg-gradient-to-r from-green-400 to-teal-400 p-6 rounded-2xl shadow-2xl text-white hover:scale-105 transform transition">
                    <h3 className="font-bold text-lg mb-2">Latest Mood</h3>
                    <p className="text-2xl">{moodData[moodData.length - 1] || "No data"}</p>
                    <p className="mt-1">Total moods tracked: {moodData.length}</p>
                </div>

                {/* Journal Entries */}
                <div className="bg-gradient-to-r from-pink-400 to-red-400 p-6 rounded-2xl shadow-2xl text-white hover:scale-105 transform transition">
                    <h3 className="font-bold text-lg mb-2">Journal Entries</h3>
                    <p className="text-2xl">{data?.journal ? Object.keys(data.journal).length : 0}</p>
                    <p className="mt-1">Total entries</p>
                </div>
            </div>

            {/* Mood Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-2xl">
                <h3 className="font-bold text-xl mb-4">Mood Frequency Chart</h3>
                {moodData.length > 0 ? (
                    <Bar data={moodChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                ) : (
                    <p>No mood data to show</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
