import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

function ClientHeader({ title }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
      <Link to="/dashboard">
        <img
          src="https://carservices.labhayatech.com/carwash/wp-content/uploads/2025/09/bashbaba.png"
          alt="Bashbaba Logo"
          className="h-8 w-auto" // Adjusted height for a navbar
        />
      </Link>
      <h1 className="text-xl font-bold text-gray-800 dark:text-white absolute left-1/2 -translate-x-1/2">
        {title}
      </h1>
      <button onClick={toggleTheme} className="text-gray-800 dark:text-white">
        {theme === "light" ? <Moon /> : <Sun />}
      </button>
    </header>
  );
}

export default ClientHeader;
