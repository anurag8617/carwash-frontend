import React, { useRef, useEffect, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";

export default function ImageCompare({ before, after, initialPosition = 50 }) {
  const containerRef = useRef(null);
  const afterImageRef = useRef(null);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);

  // This function will be responsible for moving the slider
  const handleMoveSlider = useCallback((x) => {
    if (!containerRef.current || !afterImageRef.current || !sliderRef.current)
      return;

    const rect = containerRef.current.getBoundingClientRect();
    // Calculate position as a percentage, clamping between 0 and 100
    const percent = Math.max(
      0,
      Math.min(100, ((x - rect.left) / rect.width) * 100)
    );

    // Directly update the styles for maximum performance
    sliderRef.current.style.left = `${percent}%`;
    afterImageRef.current.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
  }, []);

  // Event handler for when dragging starts
  const handleDragStart = (e) => {
    isDragging.current = true;
    // Prevent default text selection behavior while dragging
    e.preventDefault();
  };

  // Event handler for when dragging ends
  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Event handler for the actual dragging movement
  const handleDragging = useCallback(
    (e) => {
      if (!isDragging.current) return;
      // Use clientX for mouse events, and the first touch for touch events
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      handleMoveSlider(clientX);
    },
    [handleMoveSlider]
  );

  // Set up and clean up global event listeners
  useEffect(() => {
    // We listen on the window to catch mouse movements outside the container
    window.addEventListener("mousemove", handleDragging);
    window.addEventListener("touchmove", handleDragging);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchend", handleDragEnd);

    // Set the initial position when the component mounts
    if (containerRef.current) {
      const initialX =
        containerRef.current.getBoundingClientRect().left +
        (containerRef.current.offsetWidth * initialPosition) / 100;
      handleMoveSlider(initialX);
    }

    // Cleanup function to remove listeners when the component unmounts
    return () => {
      window.removeEventListener("mousemove", handleDragging);
      window.removeEventListener("touchmove", handleDragging);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [handleDragging, handleDragEnd, handleMoveSlider, initialPosition]);

  return (
    <div
      ref={containerRef}
      // --- CHANGE IS HERE ---
      className="relative w-full max-w-[800px] aspect-[497/438] overflow-hidden rounded-2xl shadow-lg select-none cursor-ew-resize"
    >
      {/* Before Image */}
      <img
        src={
          before ||
          "https://carservices.labhayatech.com/carwash/wp-content/uploads/2025/09/2-2.png"
        }
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* After Image */}
      <img
        ref={afterImageRef}
        src={
          after ||
          "https://carservices.labhayatech.com/carwash/wp-content/uploads/2025/09/1-2.png"
        }
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Divider Line + Icon */}
      <div
        ref={sliderRef}
        className="absolute top-0 bottom-0 flex items-center justify-center -translate-x-1/2"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="w-[3px] h-full bg-white/90 shadow-md"></div>
        <button
          className="absolute bg-white border border-gray-400 rounded-full p-1.5 sm:p-2.5 shadow-md hover:scale-110 active:scale-95 transition"
          aria-label="Drag to compare"
        >
          <MoveHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        </button>
      </div>

      {/* Labels */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/50 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-md pointer-events-none text-xs sm:text-base">
        Before
      </div>
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/50 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-md pointer-events-none text-xs sm:text-base">
        After
      </div>
    </div>
  );
}
