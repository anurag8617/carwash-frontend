import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      toast.success("Login successful!");

      // --- This is the corrected part ---
      // Get the token and user from the response directly
      const { access_token, user } = response.data;

      // Now save them to localStorage
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      // ---------------------------------

      if (user.role === "vendor") {
        navigate("/vendor/dashboard");
      } else if (user.role === "staff") {
        navigate("/staff/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#73C8D2] to-[#0046FF] font-sans">
      <div className="flex flex-col items-center space-y-6">
        <img
          src="https://carservices.labhayatech.com/carwash/wp-content/uploads/2025/09/bashbaba.png"
          alt="Bashbaba Logo"
          className="w-80 mb-0"
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-0 w-[350px] bg-[#F5F1DC] shadow-lg shadow-[#73C8D2]/50 p-5 border border-solid border-gray-200 rounded-lg"
        >
          <h1 className="block mb-[15px] text-xl text-black font-semibold">
            Shgn in
          </h1>
          <div className="space-y-8">
            <div>
              <label
                htmlFor="Email"
                className="block mb-[10px] text-s text-[#0046FF] font-semibold"
              >
                Email
              </label>
              <input
                placeholder="abc@email.com"
                id="Email"
                type="email"
                name="email"
                onChange={handleChange}
                required
                className="w-full h-[35px] px-2 text-[1em] font-semibold text-[#353538] bg-white border-2 border-[#73C8D2] rounded transition-all duration-200 
                           focus:outline-none focus:shadow-md focus:shadow-[#73C8D2]/40 focus:border-[#0046FF]
                           placeholder:text-[#0046FF]/50"
              />
            </div>
            <div>
              <label
                htmlFor="Password"
                className="block mb-[10px] text- text-[#0046FF] font-semibold"
              >
                Password
              </label>
              <input
                id="Password"
                type="password"
                name="password"
                onChange={handleChange}
                required
                className="w-full h-[35px] px-4 text-[1em] font-semibold text-[#353538] bg-white border-2 border-[#73C8D2] rounded-lg transition-all duration-200 
                           focus:outline-none focus:shadow-md focus:shadow-[#73C8D2]/40 focus:border-[#0046FF]
                           placeholder:text-[#0046FF]/50"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full h-[25px] rounded text-white text-[1em] font-semibold bg-[#FF9013]
                           hover:bg-[#0046FF] active:scale-[0.98] transition-all duration-200"
              >
                Log in
              </button>
            </div>
          </div>
          <p className="mt-6 text-sm text-center text-black">
            Don’t have an account?
            <Link
              to="/register"
              className="font-semibold text-[#0046ff] hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
