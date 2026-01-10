const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `You are a creative social media assistant. 
Generate short engaging captions for images. 
Use a friendly casual tone. 
Include relevant hashtags and emojis when appropriate. 
Keep the caption under 2 sentences. 
Focus on being catchy and relatable like Instagram or Twitter captions.`,
    },
  });
  return response.text;
}
module.exports = generateCaption;
