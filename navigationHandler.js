export function handleNavigation(
  command,
  navigate
) {
  if (command === "SHOW_TIMETABLE") {
    navigate("timetable");
  }

  if (
    command ===
    "OPEN_MEMORY_MATCH"
  ) {
    navigate("memory-match");
  }

  if (
    command ===
    "OPEN_FAMILY_PHOTOS"
  ) {
    navigate("family-photos");
  }

  if (
    command ===
    "OPEN_QUIZ_GAME"
  ) {
    navigate("quiz-game");
  }
}