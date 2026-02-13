import { useState } from "react";

const resourcesData = [
    {
        title: "Meditation for Beginners",
        type: "Article",
        link: "https://www.mindful.org/meditation-for-beginners/",
        color: "bg-green-400"
    },
    {
        title: "Managing Anxiety",
        type: "Video",
        link: "https://www.youtube.com/watch?v=O-6f5wQXSu8",
        color: "bg-blue-400"
    },
    {
        title: "Healthy Sleep Tips",
        type: "Article",
        link: "https://www.sleepfoundation.org/articles/healthy-sleep-tips",
        color: "bg-purple-400"
    },
    {
        title: "Stress Management Techniques",
        type: "Article",
        link: "https://www.apa.org/topics/stress",
        color: "bg-pink-400"
    },
    {
        title: "Guided Meditation Video",
        type: "Video",
        link: "https://www.youtube.com/watch?v=inpok4MKVLM",
        color: "bg-yellow-400"
    },
    {
        title: "Coping with Depression",
        type: "Article",
        link: "https://www.helpguide.org/articles/depression/coping-with-depression.htm",
        color: "bg-red-400"
    }
];

const Resources = () => {
    const [filter, setFilter] = useState("All");

    const filteredResources =
        filter === "All"
            ? resourcesData
            : resourcesData.filter((r) => r.type === filter);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Mental Health Resources</h2>

            {/* Filter Buttons */}
            <div className="flex gap-4 mb-6">
                {["All", "Article", "Video"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full font-bold text-white transition-all transform hover:scale-105
              ${f === "All" ? "bg-indigo-500" : f === "Article" ? "bg-green-500" : "bg-pink-500"}
              ${filter === f ? "ring-4 ring-indigo-300" : ""}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Resource Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredResources.map((res, idx) => (
                    <a
                        key={idx}
                        href={res.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl ${res.color} text-white`}
                    >
                        <h3 className="text-lg font-bold mb-2">{res.title}</h3>
                        <p className="font-semibold">{res.type}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Resources;
