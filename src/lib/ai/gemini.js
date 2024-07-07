const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run() {
  const prompt =
    "Give me a quick fact about something that happened in the US Civil War";
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
