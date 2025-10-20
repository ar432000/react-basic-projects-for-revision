import { useState, useEffect } from "react";
import data from "./data";
import SlidableListShowActions from "./SlidableList";
import "./index.css";

function DisplayLists() {
  const [items, setItems] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [toastHiding, setToastHiding] = useState(false);
  const TOAST_AUTO_HIDE_MS = 3000;

  const hideToast = (delay = 0) => {
    // start hide animation
    setToastHiding(true);
    // after animation complete, actually remove toast
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
      setToastHiding(false);
    }, 250 + delay); // 250ms matches slideDown duration
  };

  const showToast = (message, type = "success") => {
    // clear any existing hide timers by resetting state
    setToastHiding(false);
    setToast({ show: true, message, type });
    // auto hide after configured time
    setTimeout(() => hideToast(), TOAST_AUTO_HIDE_MS);
  };

  const handleDeleteItem = (id) => {
    const filterDeletedItem = items.filter((item) => item.id !== id);
    setItems(filterDeletedItem);
    showToast("Item deleted successfully", "success");
  };

  useEffect(() => {
    setItems(data);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <p style={{ textAlign: "center", margin: "20px 0" }}>
        Swipeable List Items with Actions
      </p>
      <div className="items-container">
        {items.map((item) => (
          <SlidableListShowActions
            key={item.id}
            text={item.text}
            handleDeleteItem={() => handleDeleteItem(item.id)}
          />
        ))}
      </div>
      {toast.show && (
        <div
          className={`toast ${toast.type} ${toastHiding ? "hide" : ""}`}
          role="status"
          aria-live="polite"
        >
          <span>{toast.message}</span>
          <button
            className="close-btn"
            onClick={() => hideToast()}
            aria-label="Close toast"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default DisplayLists;
