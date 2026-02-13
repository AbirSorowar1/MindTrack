import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        await signInWithPopup(auth, provider);
        navigate("/dashboard");
    };

    return (
        <div className="flex items-center justify-center h-screen bg-indigo-100">
            <div className="bg-white p-10 rounded-xl shadow-lg text-center">
                <h2 className="text-3xl font-bold mb-6">MindTrack BD</h2>

                <button
                    onClick={handleLogin}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
                >
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
