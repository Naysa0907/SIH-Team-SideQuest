export const testAssameseSpeechServer = async (text) => {
  console.log("=================================");
  console.log("SENDING TEXT TO ASSAMESE SERVER");
  console.log("Text:", text);
  console.log("=================================");

  try {
    const response = await fetch(
      "http://localhost:5000/api/assamese-speech",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
        }),
      }
    );

    console.log(
      "Server status:",
      response.status
    );

    const data = await response.json();

    console.log(
      "Server response:",
      data
    );

    return data;
  } catch (error) {
    console.error(
      "Cannot connect to Assamese server:",
      error
    );

    return null;
  }
};