import { useState, useRef } from "react";

function SlidableListShowActions() {
  const [translateX, setTranslateX] = useState(0);
  const [lockedPosition, setLockedPosition] = useState(0); // it could be -120 ,0, 120 as difference between startX and endX
  const startXRef = useRef(0);
  const dragging = useRef(false);

  const handleMouseDown = (e) => {
    dragging.current = true;
    startXRef.current = e.clientX;
    console.log("Mouse Down at:", startXRef.current);
    e.currentTarget.style.transition = "none"; // disable transition while drag
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;

    const deltaX = e.clientX - startXRef.current;
    const final = lockedPosition + deltaX;

    // Allow free movement within bounds during drag
    if (final >= -120 && final <= 120) {
      setTranslateX(final);
    }
  };

  const handleMouseUp = (e) => {
    if (!dragging.current) return;
    dragging.current = false;

    const deltaX = e.clientX - startXRef.current;
    const final = lockedPosition + deltaX;
    let newLock = final;

    // Clamp to bounds
    if (final > 120) {
      newLock = 120;
    } else if (final < -120) {
      newLock = -120;
    }

    setLockedPosition(newLock);
    e.currentTarget.style.transition = "transform 0.1s ease"; // Re-enable transition
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
          borderRadius: "10px",
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
          transition: "transform 0.1s ease",
          cursor: "grab",
          selector: "none",
        }}
      >
        Drag me left or right
      </div>
    </div>
  );
}

export default SlidableListShowActions;
