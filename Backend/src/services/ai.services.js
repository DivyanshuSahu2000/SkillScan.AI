// import { GoogleGenAI } from "@google/genai";

// const invokeGeminiAi = async () => {
//   const ai = new GoogleGenAI({
//     apiKey: process.env.SKILLSCAN_GENAI_API_KEY,
//   });

//   const response = await ai.models.generateContent({
//     model: "gemini-3.8-flash",
//     contents: "Hello ! explain interview?",
//   });
//   console.log(response.text);
// };
// export default invokeGeminiAi;

// // const interaction = await ai.interactions.create({
// //   model: "gemini-3.8-flash",
// //   input: "Explain how AI works in a few words",
// // });
// // console.log(interaction.output_text);

import { GoogleGenAI } from "@google/genai";

const invokeGeminiAi = async () => {
  const ai = new GoogleGenAI({
    apiKey: process.env.SKILLSCAN_GENAI_API_KEY,
  });

  try {
    // Correct 3.8-flash model using interactions.create
    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: "Hello! Explain what a job interview is.",
    });

    console.log("Gemini Response:", interaction.output_text);
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    console.log("🔄 Server is still running. Nodemon won't crash!");
  }
};

export default invokeGeminiAi;
