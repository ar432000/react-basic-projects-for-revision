import { useState, useRef } from "react";

function SlidableListShowActions() {
  const [translateX, setTranslateX] = useState(0);
  const [lockedPosition, setLockedPosition] = useState(0); // it could be -120 ,0, 120 as difference between startX and endX
  const startXRef = useRef(0);
  const dragging = useRef(false);

  const handleMouseDown = (e) => {
    dragging.current = true;
    startXRef.current = e.clientX;
    e.currentTarget.style.transition = "none"; // disable transition while drag
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;

    const deltaX = e.clientX - startXRef.current;
    setTranslateX(lockedPosition + deltaX);
  };

  const handleMouseUp = (e) => {
    if (!dragging.current) return;
    dragging.current = false;

    const deltaX = e.clientX - startXRef.current;
    const final = lockedPosition + deltaX;
    let newLock = lockedPosition;
    if (final > 100) {
      newLock = 120; // right action ✅
    } else if (final < -100) {
      newLock = -120; // left action 🗑️
    } else if (final > -60 && final < 60) {
      newLock = 0; // center position or back to center
    }
    setLockedPosition(newLock);
    setTranslateX(newLock);
  };

  return (
    <div style={{ position: "relative", width: "300px", margin: "40px auto" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#f0f0f0",
          borderRadius: "0 15px",
          fontSize: "22px",
        }}
      >
        <span style={{ color: "green" }}>✅</span>
        <span style={{ color: "red" }}>🗑️</span>
      </div>

      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "15px",
          textAlign: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          transform: `translateX(${translateX}px)`,
          transition: dragging.current ? "none" : "transform 0.25s ease",
          cursor: "grab",
        }}
      >
        Drag me left or right
      </div>
    </div>
  );
}

export default SlidableListShowActions;
