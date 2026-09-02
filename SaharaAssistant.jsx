import { useState, useEffect } from "react";

import "../App.css";

import { processCommand } from "../ai/commandProcessor";

import { getResponse } from "../ai/responseGenerator";

import {
  testAssameseSpeechServer,
} from "../services/speechService";


function SaharaAssistant({ onNavigate }) {

  // =========================
  // STATES
  // =========================

  const [text, setText] = useState("");

  const [input, setInput] = useState("");

  const [response, setResponse] = useState("");

  const [isListening, setIsListening] =
    useState(false);

  const [language, setLanguage] =
    useState("en");

  const [showGames, setShowGames] =
    useState(false);

  const [voices, setVoices] =
    useState([]);


  // =========================
  // LOAD AVAILABLE VOICES
  // =========================

  useEffect(() => {

    const loadVoices = () => {

      const availableVoices =
        window.speechSynthesis.getVoices();

      setVoices(availableVoices);

      console.log(
        "Available voices:",
        availableVoices
      );

    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged =
      loadVoices;

    return () => {

      window.speechSynthesis.onvoiceschanged =
        null;

    };

  }, []);


  // =========================
  // GET LANGUAGE CODE
  // =========================

  const getLanguageCode = () => {

    if (language === "hi") {
      return "hi-IN";
    }

    if (language === "as") {
      return "as-IN";
    }

    return "en-IN";

  };


  // =========================
  // NAVIGATION
  // =========================

  const navigateToPage = (command) => {

    if (!onNavigate) {

      console.error(
        "Navigation function is missing."
      );

      return;

    }

    switch (command) {

      case "OPEN_MEMORY_MATCH":

        onNavigate("memory-match");

        break;


      case "OPEN_FAMILY_PHOTOS":

        onNavigate("family-photos");

        break;


      case "OPEN_QUIZ_GAME":

        onNavigate("quiz-game");

        break;


      case "SHOW_TIMETABLE":

        onNavigate("timetable");

        break;


      default:

        break;

    }

  };


  // =========================
  // SAHARA SPEAKS
  // =========================

  const speak = async (message) => {

    console.log(
      "SAHARA speaking:",
      message
    );

    console.log(
      "Selected language:",
      language
    );


    // =========================
    // ASSAMESE
    // =========================

    if (language === "as") {

      console.log(
        "Sending Assamese text to server:",
        message
      );

      try {

        const serverResponse =
          await testAssameseSpeechServer(
            message
          );

        console.log(
          "Assamese server response:",
          serverResponse
        );

      } catch (error) {

        console.error(
          "Assamese speech server error:",
          error
        );

      }

      return;

    }


    // =========================
    // ENGLISH AND HINDI
    // =========================

    if (!("speechSynthesis" in window)) {

      console.error(
        "Speech synthesis is not supported."
      );

      return;

    }


    // Stop previous speech

    window.speechSynthesis.cancel();


    const speech =
      new SpeechSynthesisUtterance(
        message
      );


    const languageCode =
      getLanguageCode();


    speech.lang =
      languageCode;


    const languagePrefix =
      languageCode
        .substring(0, 2)
        .toLowerCase();


    const matchingVoice =
      voices.find((voice) =>
        voice.lang
          .toLowerCase()
          .startsWith(languagePrefix)
      );


    if (matchingVoice) {

      speech.voice =
        matchingVoice;

    } else {

      console.warn(
        "No matching voice found for:",
        languageCode
      );

    }


    // Slow and clear speech
    // Suitable for elderly users

    speech.rate = 0.8;

    speech.pitch = 1;

    speech.volume = 1;


    speech.onerror = (event) => {

      console.error(
        "Speech error:",
        event.error
      );

    };


    window.speechSynthesis.speak(
      speech
    );

  };


  // =========================
  // RUN COMMAND
  // =========================

  const runCommand = (userText) => {

    if (
      !userText ||
      !userText.trim()
    ) {

      return;

    }


    // Show user text

    setText(userText);


    // Understand command

    const command =
      processCommand(userText);


    console.log(
      "SAHARA recognized command:",
      command
    );


    // Generate response

    const assistantResponse =
      getResponse(
        command,
        language
      );


    // Show response

    setResponse(
      assistantResponse
    );


    // Speak response

    speak(
      assistantResponse
    );


    // Show games

    if (
      command ===
      "SHOW_GAMES"
    ) {

      setShowGames(true);

      return;

    }


    setShowGames(false);


    // Navigate to page

    navigateToPage(command);

  };


  // =========================
  // TYPED COMMAND
  // =========================

  const handleCommand = () => {

    if (!input.trim()) {

      setResponse(
        "Please type a command first."
      );

      return;

    }


    runCommand(input);

    setInput("");

  };


  // =========================
  // ENTER KEY
  // =========================

  const handleKeyDown = (
    event
  ) => {

    if (
      event.key === "Enter"
    ) {

      handleCommand();

    }

  };


  // =========================
  // VOICE INPUT
  // =========================

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

      setResponse(
        "Speech recognition is not supported. Please use Google Chrome."
      );

      return;

    }


    const recognition =
      new SpeechRecognition();


    recognition.lang =
      getLanguageCode();


    recognition.continuous =
      false;


    recognition.interimResults =
      false;


    recognition.maxAlternatives =
      1;


    recognition.onstart =
      () => {

        setIsListening(true);

        console.log(
          "Listening in:",
          getLanguageCode()
        );

      };


    recognition.onresult =
      (event) => {

        const spokenText =
          event.results[0][0]
            .transcript;


        console.log(
          "Voice heard:",
          spokenText
        );


        runCommand(
          spokenText
        );

      };


    recognition.onerror =
      (event) => {

        console.error(
          "Speech recognition error:",
          event.error
        );


        setResponse(
          "Voice input error: " +
          event.error
        );


        setIsListening(
          false
        );

      };


    recognition.onend =
      () => {

        setIsListening(
          false
        );

      };


    recognition.start();

  };


  // =========================
  // SELECT GAME
  // =========================

  const selectGame = (
    command,
    gameName
  ) => {

    setText(
      gameName
    );


    const assistantResponse =
      getResponse(
        command,
        language
      );


    setResponse(
      assistantResponse
    );


    speak(
      assistantResponse
    );


    setShowGames(
      false
    );


    navigateToPage(
      command
    );

  };


  // =========================
  // LANGUAGE TEXT
  // =========================

  const getLanguageText =
    () => {

      if (
        language === "hi"
      ) {

        return "भाषा चुनें:";

      }


      if (
        language === "as"
      ) {

        return "ভাষা বাছনি কৰক:";

      }


      return "Select your language:";

    };


  // =========================
  // SUBTITLE
  // =========================

  const getSubtitle =
    () => {

      if (
        language === "hi"
      ) {

        return "आज मैं आपकी कैसे मदद कर सकती हूँ?";

      }


      if (
        language === "as"
      ) {

        return "আজি মই আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?";

      }


      return "How can I help you today?";

    };


  // =========================
  // MICROPHONE TEXT
  // =========================

  const getMicText =
    () => {

      if (isListening) {

        if (
          language === "hi"
        ) {

          return "🎙️ सुन रही हूँ...";

        }


        if (
          language === "as"
        ) {

          return "🎙️ শুনি আছোঁ...";

        }


        return "🎙️ Listening...";

      }


      if (
        language === "hi"
      ) {

        return "माइक्रोफोन दबाएं और बोलें";

      }


      if (
        language === "as"
      ) {

        return "মাইক্ৰ'ফোন টিপক আৰু কথা কওক";

      }


      return "Tap the microphone and speak";

    };


  // =========================
  // UI
  // =========================

  return (

    <div className="container">

      <div className="assistant-card">


        {/* TITLE */}

        <h1>

          🎙️ SAHARA

          <span>
            {" "}
            Assistant
          </span>

        </h1>


        {/* SUBTITLE */}

        <p className="subtitle">

          {getSubtitle()}

        </p>


        {/* LANGUAGE SELECTOR */}

        <div className="language-selector">

          <p>

            {getLanguageText()}

          </p>


          <button
            className={
              language === "en"
                ? "active-language"
                : ""
            }
            onClick={() =>
              setLanguage("en")
            }
          >

            English

          </button>


          <button
            className={
              language === "hi"
                ? "active-language"
                : ""
            }
            onClick={() =>
              setLanguage("hi")
            }
          >

            हिन्दी

          </button>


          <button
            className={
              language === "as"
                ? "active-language"
                : ""
            }
            onClick={() =>
              setLanguage("as")
            }
          >

            অসমীয়া

          </button>

        </div>


        {/* MICROPHONE */}

        <button
          className="mic-button"
          onClick={
            startListening
          }
          disabled={
            isListening
          }
        >

          {isListening
            ? "🔴"
            : "🎤"}

        </button>


        <p className="mic-text">

          {getMicText()}

        </p>


        {/* GAME SELECTOR */}

        {showGames && (

          <div className="games-selector">

            <h3>

              {language === "hi"
                ? "एक गेम चुनें"
                : language === "as"
                ? "এটা গেম বাছনি কৰক"
                : "Choose a game"}

            </h3>


            <button
              onClick={() =>
                selectGame(
                  "OPEN_MEMORY_MATCH",
                  "Memory Match"
                )
              }
            >

              🧠 Memory Match

            </button>


            <button
              onClick={() =>
                selectGame(
                  "OPEN_FAMILY_PHOTOS",
                  "Family Photos"
                )
              }
            >

              🖼️ Family Photos

            </button>


            <button
              onClick={() =>
                selectGame(
                  "OPEN_QUIZ_GAME",
                  "Quiz Game"
                )
              }
            >

              ❓ Quiz Game

            </button>

          </div>

        )}


        {/* TEXT INPUT */}

        <div className="test-section">

          <h3>

            Test the Assistant

          </h3>


          <input
            type="text"
            placeholder="Type your command..."
            value={input}
            onChange={(event) =>
              setInput(
                event.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
          />


          <button
            onClick={
              handleCommand
            }
          >

            Send

          </button>

        </div>


        {/* USER TEXT */}

        <div className="result-box">

          <h3>

            You said:

          </h3>


          <p>

            {text ||
              "Nothing yet..."}

          </p>

        </div>


        {/* RESPONSE */}

        <div className="response-box">

          <h3>

            SAHARA:

          </h3>


          <p>

            {response ||
              "I am ready to help you."}

          </p>

        </div>


      </div>

    </div>

  );

}


export default SaharaAssistant;