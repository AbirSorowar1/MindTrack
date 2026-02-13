import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user } = useAuth();

    // Fallback avatar if no photoURL
    const profileImg = user?.photoURL
        ? user.photoURL
        : "https://avatars.githubusercontent.com/u/9919?s=280&v=4"; // github octocat as placeholder

    return (
        <div className="flex flex-col items-center mt-8 min-h-screen bg-gray-50">
            <h2 className="text-3xl font-bold mb-8 text-indigo-600">Your Profile</h2>

            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center transition transform hover:scale-105">
                {/* Profile Image */}
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                    <img
                        src={profileImg}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Name & Email */}
                <h3 className="text-xl font-bold text-white">{user?.displayName || "No Name"}</h3>
                <p className="text-white/90 mb-4">{user?.email || "No Email"}</p>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button
                        className="px-6 py-2 bg-white text-purple-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
                    >
                        Edit Profile
                    </button>
                    <button
                        className="px-6 py-2 bg-white text-red-500 font-bold rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
