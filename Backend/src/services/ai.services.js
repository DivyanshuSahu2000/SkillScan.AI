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

// const invokeGeminiAi = async () => {
//   const ai = new GoogleGenAI({
//     apiKey: process.env.SKILLSCAN_GENAI_API_KEY,
//   });

//   try {
//     // Correct 3.8-flash model using interactions.create
//     const interaction = await ai.interactions.create({
//       model: "gemini-3.8-flash",
//       input: "Hello! Explain what a job interview is.",
//     });

//     console.log("Gemini Response:", interaction.output_text);
//   } catch (error) {
//     console.error("❌ Gemini API Error:", error.message);
//     console.log("🔄 Server is still running. Nodemon won't crash!");
//   }
// };
import { GoogleGenAI } from "@google/genai";
import z from "zod";
import zodToJsonSchema from "zod-to-json-schema";
const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job describe"
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc."
          ),
      })
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and how to answer them"
    ),

  behaviouralQuestions: z.array(
    z.object({
      question: z
        .string()
        .describe("The technical question can be asked in the interview"),
      intention: z
        .string()
        .describe("The intention of interviewer behind asking this question"),
      answer: z
        .string()
        .describe(
          "How to answer this question, what points to cover, what approach to take etc."
        )
        .describe(
          "Behavioural questions that can be asked in the interview along with their intention and how to answer them"
        ),
    })
  ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which candidate lacking."),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances"
          ),
      })
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity"
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc."
          ),
      })
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"
    ),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated"
    ),
});

const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.SKILLSCAN_GENAI_API_KEY,
  });
  const candidateProfile = [
    resume.trim() && `Resume:\n${resume.trim()}`,
    selfDescription.trim() && `Self-description:\n${selfDescription.trim()}`,
  ]
    .filter(Boolean)
    .join("\n\n");
  const prompt = `Generate an interview report using the candidate profile and job description below.
The candidate profile may contain a resume, a self-description, or both. Use all provided information; do not require a missing profile source or assume details that were not provided.

Candidate profile:
${candidateProfile}

Job description:
${jobDescription}
`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      // model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(interviewReportSchema),
      },
    });
    // Ensure the response object exists and has text before parsing
    if (!response || !response.text) {
      throw new Error("Empty response received from Gemini AI.");
    }

    // FIX 2: Move the return inside the try block where 'response' is securely defined!
    return JSON.parse(response.text);
  } catch (error) {
    console.error(
      "❌ Gemini API Error caught in service layer:",
      error.message
    );

    // Throw a clean custom error so your controller knows exactly what went wrong
    if (error.status === 503) {
      const unavailableError = new Error(
        "Gemini AI servers are currently overloaded. Please wait a few seconds and try again."
      );
      unavailableError.status = 503;
      throw unavailableError;
    }
    throw error;
  }
};

export default generateInterviewReport;
