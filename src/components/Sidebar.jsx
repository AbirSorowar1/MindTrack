import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    return (
        <div className="w-64 bg-black text-white min-h-screen p-6 flex flex-col">
            <h1 className="text-2xl font-bold mb-8">MindTrack</h1>

            <nav className="flex flex-col gap-4 flex-1">
                {[
                    { to: "/dashboard", label: "🏠 Dashboard" },
                    { to: "/assessment", label: "📝 Assessment" },
                    { to: "/iqtest", label: "🧠 IQ Test" },
                    { to: "/mood", label: "📊 Mood Tracker" },
                    { to: "/journal", label: "📔 Journal" },
                    { to: "/resources", label: "📚 Resources" },
                    { to: "/profile", label: "👤 Profile" }
                ].map((link, idx) => (
                    <Link
                        key={idx}
                        to={link.to}
                        className="px-4 py-2 rounded-lg transition-all hover:bg-white hover:text-black"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            <button
                onClick={handleLogout}
                className="mt-6 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-bold transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
