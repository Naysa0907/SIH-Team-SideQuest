export function processCommand(text) {
  const command = String(text || "")
    .toLowerCase()
    .trim();

  console.log("User command:", command);

  // =========================
  // MEMORY MATCH
  // English + Hindi + Assamese
  // =========================

  if (
    command.includes("memory match") ||
    command.includes("memorymatch") ||
    command.includes("memory game") ||
    command.includes("match game") ||
    command.includes("play memory match") ||
    command.includes("open memory match") ||

    command.includes("मेमोरी मैच") ||
    command.includes("मेमरी मैच") ||
    command.includes("मेमोरी") ||

    command.includes("মেমৰি মেচ") ||
    command.includes("মেমরি ম্যাচ") ||
    command.includes("মেমৰি")
  ) {
    return "OPEN_MEMORY_MATCH";
  }

  // =========================
  // FAMILY PHOTOS
  // =========================

  if (
    command.includes("family photos") ||
    command.includes("family photo") ||
    command.includes("familyphotos") ||
    command.includes("family game") ||
    command.includes("photo game") ||
    command.includes("photos game") ||
    command.includes("play family photos") ||
    command.includes("open family photos") ||

    command.includes("फैमिली फोटो") ||
    command.includes("फैमिली फोटोज") ||
    command.includes("फैमिली") ||

    command.includes("ফেমিলি ফটো") ||
    command.includes("ফেমিলি ফটোছ") ||
    command.includes("ফেমিলি")
  ) {
    return "OPEN_FAMILY_PHOTOS";
  }

  // =========================
  // QUIZ GAME
  // =========================

  if (
    command.includes("quiz game") ||
    command.includes("quizgame") ||
    command.includes("quiz") ||
    command.includes("question game") ||
    command.includes("questions game") ||
    command.includes("play quiz") ||
    command.includes("open quiz") ||
    command.includes("open quiz game") ||
    command.includes("play quiz game") ||

    command.includes("क्विज गेम") ||
    command.includes("क्विज़ गेम") ||
    command.includes("क्विज") ||
    command.includes("क्विज़") ||
    command.includes("कुइज") ||

    command.includes("কুইজ গেম") ||
    command.includes("কুইজ")
  ) {
    return "OPEN_QUIZ_GAME";
  }

  // =========================
  // TIMETABLE
  // =========================

  if (
    command.includes("timetable") ||
    command.includes("time table") ||
    command.includes("show my timetable") ||
    command.includes("show timetable") ||
    command.includes("open timetable") ||
    command.includes("my schedule") ||
    command.includes("show schedule") ||
    command.includes("open schedule") ||
    command.includes("schedule") ||

    command.includes("टाइमटेबल") ||
    command.includes("टाइम टेबल") ||
    command.includes("समय सारणी") ||
    command.includes("समयसारणी") ||

    command.includes("সময়সূচী") ||
    command.includes("সময়সূচী") ||
    command.includes("টাইমটেবল") ||
    command.includes("টাইম টেবুল")
  ) {
    return "SHOW_TIMETABLE";
  }

  // =========================
  // SHOW GAMES
  // =========================

  if (
    command.includes("show games") ||
    command.includes("show game") ||
    command.includes("open games") ||
    command.includes("open game") ||
    command === "games" ||
    command === "game" ||

    command.includes("गेम दिखाओ") ||
    command.includes("गेम खोलो") ||
    command.includes("खेल दिखाओ") ||
    command.includes("खेल खोलो") ||

    command.includes("গেম দেখুওৱা") ||
    command.includes("গেম দেখুও") ||
    command.includes("গেম খোলক") ||
    command.includes("গেম খোল") ||
    command.includes("খেল দেখুওৱা") ||
    command.includes("খেল খোলক") ||
    command === "গেম"
  ) {
    return "SHOW_GAMES";
  }

  // =========================
  // GREETING
  // =========================

  if (
    command.includes("hello") ||
    command === "hi" ||
    command.includes("hey") ||

    command.includes("नमस्ते") ||
    command.includes("हेलो") ||

    command.includes("নমস্কাৰ") ||
    command.includes("হেলো")
  ) {
    return "GREETING";
  }

  // =========================
  // UNKNOWN
  // =========================

  return "UNKNOWN";
}