import { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-indigo-900 via-purple-900 to-black">

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl 
                      w-96 text-white border border-white/20 shadow-2xl">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg 
                       bg-white 
                       text-black 
                       placeholder-gray-400
                       focus:outline-none 
                       focus:ring-2 
                       focus:ring-purple-500 
                       transition"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg 
                       bg-white 
                       text-black 
                       placeholder-gray-400
                       focus:outline-none 
                       focus:ring-2 
                       focus:ring-purple-500 
                       transition"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg 
                       bg-white 
                       text-black 
                       placeholder-gray-400
                       focus:outline-none 
                       focus:ring-2 
                       focus:ring-purple-500 
                       transition"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 py-2 rounded-lg 
                       hover:bg-purple-700 transition duration-300"
          >
            Register
          </button>

        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-300 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;