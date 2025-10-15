import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    role: "client",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register", formData);
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      const errorMessages = Object.values(error.response.data.message).flat();
      toast.error(`Error: ${errorMessages.join(", ")}`);
      console.error("Registration error:", error);
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
          className="flex flex-col mt-0 w-[380px] bg-[#F5F1DC] shadow-lg shadow-[#73C8D2]/50 p-6 border border-solid border-gray-200 rounded-lg"
        >
          <h1 className="block mb-[15px] text-xl text-black font-semibold">
            Create Account
          </h1>

          <div className="space-y-5">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              required
              className="w-full h-[35px] px-3 text-[1em] font-semibold text-[#353538] bg-white border-2 border-[#73C8D2] rounded 
                         focus:outline-none focus:shadow-md focus:shadow-[#73C8D2]/40 focus:border-[#0046FF]
                         placeholder:text-[#0046FF]/50"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              required
              className="w-full h-[35px] px-3 text-[1em] font-semibold text-[#353538] bg-white border-2 border-[#73C8D2] rounded 
                         focus:outline-none focus:shadow-md focus:shadow-[#73C8D2]/40 focus:border-[#0046FF]
                         placeholder:text-[#0046FF]/50"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full h-[35px] px-3 text-[1em] font-semibold text-[#353538] bg-white border-2 border-[#73C8D2] rounded 
                         focus:outline-none focus:shadow-md focus:shadow-[#73C8D2]/40 focus:border-[#0046FF]
                         placeholder:text-[#0046FF]/50"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
              className="w-full h-[35px] px-3 text-[1em] font-semibold text-[#353538] bg-white border-2 border-[#73C8D2] rounded 
                         focus:outline-none focus:shadow-md focus:shadow-[#73C8D2]/40 focus:border-[#0046FF]
                         placeholder:text-[#0046FF]/50"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full h-[35px] px-3 text-[1em] font-semibold text-[#353538] bg-white border-2 border-[#73C8D2] rounded 
                         focus:outline-none focus:shadow-md focus:shadow-[#73C8D2]/40 focus:border-[#0046FF]
                         placeholder:text-[#0046FF]/50"
            />

            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              className="w-full h-[35px] px-3 text-[1em] font-semibold text-[#353538] bg-white border-2 border-[#73C8D2] rounded 
                         focus:outline-none focus:shadow-md focus:shadow-[#73C8D2]/40 focus:border-[#0046FF]
                         placeholder:text-[#0046FF]/50"
            />

            <button
              type="submit"
              className="w-full h-[30px] rounded text-white text-[1em] font-semibold bg-[#FF9013]
                         hover:bg-[#0046FF] active:scale-[0.98] transition-all duration-200"
            >
              Register
            </button>
          </div>

          <p className="mt-6 text-sm text-center text-black">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#0046ff] hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
