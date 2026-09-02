export function getResponse(command, language) {

  // =========================
  // TIMETABLE
  // =========================

  if (command === "SHOW_TIMETABLE") {

    if (language === "hi") {
      return "ज़रूर। आपका टाइमटेबल खोल रही हूँ।";
    }

    if (language === "as") {
      return "নিশ্চয়। আপোনাৰ সময়সূচী খুলি আছোঁ।";
    }

    return "Sure. Opening your timetable.";
  }

  // =========================
  // SHOW GAMES
  // =========================

  if (command === "SHOW_GAMES") {

    if (language === "hi") {
      return "ज़रूर। आप कौन सा गेम खेलना चाहेंगे? मेमोरी मैच, फैमिली फोटोज़ या क्विज़ गेम?";
    }

    if (language === "as") {
      return "নিশ্চয়। আপুনি কোনটো গেম খেলিব বিচাৰে? মেমৰি মেচ, ফেমিলি ফটোছ নে কুইজ গেম?";
    }

    return "Sure. Which game would you like to play? Memory Match, Family Photos, or Quiz Game?";
  }

  // =========================
  // MEMORY MATCH
  // =========================

  if (command === "OPEN_MEMORY_MATCH") {

    if (language === "hi") {
      return "मेमोरी मैच खोल रही हूँ।";
    }

    if (language === "as") {
      return "মেমৰি মেচ খুলি আছোঁ।";
    }

    return "Opening Memory Match.";
  }

  // =========================
  // FAMILY PHOTOS
  // =========================

  if (command === "OPEN_FAMILY_PHOTOS") {

    if (language === "hi") {
      return "फैमिली फोटोज़ खोल रही हूँ।";
    }

    if (language === "as") {
      return "ফেমিলি ফটোছ খুলি আছোঁ।";
    }

    return "Opening Family Photos.";
  }

  // =========================
  // QUIZ GAME
  // =========================

  if (command === "OPEN_QUIZ_GAME") {

    if (language === "hi") {
      return "क्विज़ गेम खोल रही हूँ।";
    }

    if (language === "as") {
      return "কুইজ গেম খুলি আছোঁ।";
    }

    return "Opening Quiz Game.";
  }

  // =========================
  // GREETING
  // =========================

  if (command === "GREETING") {

    if (language === "hi") {
      return "नमस्ते! मैं SAHARA हूँ। मैं आपकी कैसे मदद कर सकती हूँ?";
    }

    if (language === "as") {
      return "নমস্কাৰ! মই SAHARA। মই আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?";
    }

    return "Hello! I am SAHARA. How can I help you?";
  }

  // =========================
  // UNKNOWN
  // =========================

  if (language === "hi") {
    return "माफ़ कीजिए, मैं आपका आदेश समझ नहीं पाई।";
  }

  if (language === "as") {
    return "ক্ষমা কৰিব, মই আপোনাৰ কথাটো বুজি নাপালোঁ।";
  }

  return "Sorry, I did not understand that command.";
}