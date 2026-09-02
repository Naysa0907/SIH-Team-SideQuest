import { useState } from "react";

import SaharaAssistant from "./components/SaharaAssistant";
import Reminder from "./components/Reminder";

function App() {
  const [currentPage, setCurrentPage] =
    useState("assistant");

  const navigate = (page) => {
    console.log("Navigating to:", page);

    setCurrentPage(page);
  };


  // =========================
  // MEMORY MATCH
  // =========================

  if (currentPage === "memory-match") {
    return (
      <div className="page-container">

        <h1>🧠 Memory Match Page</h1>

        <p>
          Memory Match game will appear here.
        </p>

        <button
          className="back-button"
          onClick={() =>
            navigate("assistant")
          }
        >
          ← Back to SAHARA
        </button>

      </div>
    );
  }


  // =========================
  // FAMILY PHOTOS
  // =========================

  if (currentPage === "family-photos") {
    return (
      <div className="page-container">

        <h1>🖼️ Family Photos Page</h1>

        <p>
          Family Photos game will appear here.
        </p>

        <button
          className="back-button"
          onClick={() =>
            navigate("assistant")
          }
        >
          ← Back to SAHARA
        </button>

      </div>
    );
  }


  // =========================
  // SEQUENCE RECALL
  // =========================

  if (currentPage === "sequence-recall") {
    return (
      <div className="page-container">

        <h1>🔢 Sequence Recall</h1>

        <p>
          Sequence Recall game will appear here.
        </p>

        <button
          className="back-button"
          onClick={() =>
            navigate("assistant")
          }
        >
          ← Back to SAHARA
        </button>

      </div>
    );
  }


  // =========================
  // REMINDERS
  // =========================

  if (currentPage === "reminders") {
    return (
      <Reminder
        onNavigate={navigate}
      />
    );
  }


  // =========================
  // TIMETABLE
  // =========================

  if (currentPage === "timetable") {
    return (
      <div className="page-container">

        <h1>📅 Timetable Page</h1>

        <p>
          Your timetable will appear here.
        </p>

        <button
          className="back-button"
          onClick={() =>
            navigate("assistant")
          }
        >
          ← Back to SAHARA
        </button>

      </div>
    );
  }


  // =========================
  // SAHARA ASSISTANT
  // =========================

  return (
    <SaharaAssistant
      onNavigate={navigate}
    />
  );
}

export default App;