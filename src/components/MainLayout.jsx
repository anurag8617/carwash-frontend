import React, { useState } from "react";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content area */}
      <main className="flex-1 min-h-screen p-8 bg-gradient-to-br from-[#73C8D2] to-[#0046FF] font-sans transition-all duration-300">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
