import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { ref, set, push, get, remove } from "firebase/database";

const Journal = () => {
    const { user } = useAuth();
    const [entry, setEntry] = useState("");
    const [entries, setEntries] = useState([]);

    const journalRef = ref(db, `users/${user.uid}/journal`);

    useEffect(() => {
        // Load journal entries
        get(journalRef).then(snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const arr = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setEntries(arr.reverse()); // newest first
            }
        });
    }, [user]);

    const addEntry = async () => {
        if (!entry) return;
        const newRef = push(journalRef);
        const newEntry = {
            text: entry,
            date: new Date().toISOString()
        };
        await set(newRef, newEntry);
        setEntries([{ id: newRef.key, ...newEntry }, ...entries]);
        setEntry("");
    };

    const deleteEntry = async (id) => {
        await remove(ref(db, `users/${user.uid}/journal/${id}`));
        setEntries(entries.filter(e => e.id !== id));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Journal</h2>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <textarea
                    className="flex-1 p-4 rounded-xl border-2 border-indigo-300 focus:ring-2 focus:ring-purple-400 transition"
                    rows={3}
                    placeholder="Write your thoughts here..."
                    value={entry}
                    onChange={e => setEntry(e.target.value)}
                />
                <button
                    onClick={addEntry}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transform transition-all"
                >
                    Add Entry
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {entries.map((e) => (
                    <div
                        key={e.id}
                        className="bg-gradient-to-r from-purple-200 to-indigo-200 p-4 rounded-xl shadow-md relative"
                    >
                        <p className="mb-2">{e.text}</p>
                        <span className="text-sm text-gray-600">
                            {new Date(e.date).toLocaleString()}
                        </span>
                        <button
                            onClick={() => deleteEntry(e.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 transition"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Journal;
