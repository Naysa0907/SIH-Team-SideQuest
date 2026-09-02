import { useEffect, useState } from "react";

import "../App.css";

function Reminder({ onNavigate }) {
  const [reminderText, setReminderText] =
    useState("");

  const [reminderTime, setReminderTime] =
    useState("");

  const [reminders, setReminders] =
    useState([]);

  // =========================
  // SPEAK REMINDER
  // =========================

  const speakReminder = (text) => {
    if (!("speechSynthesis" in window)) {
      console.error(
        "Speech synthesis is not supported."
      );

      return;
    }

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang = "en-IN";

    speech.rate = 0.8;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
  };


  // =========================
  // ADD REMINDER
  // =========================

  const addReminder = () => {
    if (!reminderText.trim()) {
      alert("Please enter a reminder.");

      return;
    }

    if (!reminderTime) {
      alert("Please select a reminder time.");

      return;
    }

    const newReminder = {
      id: Date.now(),
      text: reminderText.trim(),
      time: reminderTime,
      triggered: false,
    };

    setReminders((previousReminders) => [
      ...previousReminders,
      newReminder,
    ]);

    setReminderText("");
    setReminderTime("");
  };


  // =========================
  // DELETE REMINDER
  // =========================

  const deleteReminder = (id) => {
    setReminders((previousReminders) =>
      previousReminders.filter(
        (reminder) =>
          reminder.id !== id
      )
    );
  };


  // =========================
  // CHECK REMINDERS
  // =========================

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setReminders((previousReminders) =>
        previousReminders.map(
          (reminder) => {
            const reminderDate =
              new Date(reminder.time);

            if (
              !reminder.triggered &&
              now >= reminderDate
            ) {
              speakReminder(
                `Reminder. ${reminder.text}`
              );

              alert(
                `🔔 Reminder: ${reminder.text}`
              );

              return {
                ...reminder,
                triggered: true,
              };
            }

            return reminder;
          }
        )
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  // =========================
  // FORMAT DATE AND TIME
  // =========================

  const formatReminderTime = (time) => {
    return new Date(
      time
    ).toLocaleString();
  };


  // =========================
  // UI
  // =========================

  return (
    <div className="page-container">

      <div className="reminder-page">

        <h1>🔔 Reminders</h1>

        <p className="page-subtitle">
          Add reminders and SAHARA will notify you.
        </p>


        {/* ADD REMINDER */}

        <div className="reminder-page-card">

          <input
            type="text"
            placeholder="Enter your reminder..."
            value={reminderText}
            onChange={(event) =>
              setReminderText(
                event.target.value
              )
            }
          />


          <input
            type="datetime-local"
            value={reminderTime}
            onChange={(event) =>
              setReminderTime(
                event.target.value
              )
            }
          />


          <button
            className="add-reminder-button"
            onClick={addReminder}
          >
            + Add Reminder
          </button>

        </div>


        {/* REMINDER LIST */}

        <div className="reminder-list">

          <h2>Your Reminders</h2>


          {reminders.length === 0 ? (

            <div className="no-reminders">

              <p>🔔</p>

              <span>
                No reminders added yet.
              </span>

            </div>

          ) : (

            reminders.map(
              (reminder) => (

                <div
                  className="reminder-item"
                  key={reminder.id}
                >

                  <div className="reminder-content">

                    <h3>
                      {reminder.text}
                    </h3>

                    <p>
                      📅{" "}
                      {formatReminderTime(
                        reminder.time
                      )}
                    </p>

                    <p className="reminder-status">
                      {reminder.triggered
                        ? "✓ Completed"
                        : "⏳ Upcoming"}
                    </p>

                  </div>


                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteReminder(
                        reminder.id
                      )
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

              )
            )

          )}

        </div>


        {/* BACK */}

        {onNavigate && (

          <button
            className="back-button"
            onClick={() =>
              onNavigate("assistant")
            }
          >
            ← Back to SAHARA
          </button>

        )}

      </div>

    </div>
  );
}

export default Reminder;