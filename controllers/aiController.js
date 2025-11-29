// controllers/aiController.js
const { GoogleGenAI } = require("@google/genai");

const generateDescription = async (req, res) => {
  const { productName } = req.body;

  if (!productName) {
    return res.status(400).json("Product name is required");
  }

  try {
    // 1. Initialize the Client (New SDK Syntax)
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `Write a professional, catchy, and SEO-friendly product description for an e-commerce item named: "${productName}". Keep it under 3 sentences.`;

    // 2. Generate Content
    // We use 'gemini-1.5-flash' because 'gemini-pro' is deprecated in this version
    const { response } = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    // 3. Extract the text correctly
    // The new SDK returns the text differently than the old one
    const text = response.text(); 

    res.status(200).json({ description: text });
  } catch (err) {
    console.error("AI Error Details:", err);
    // Send the full error message so we can see it in the frontend console if it fails
    res.status(500).json({ message: "Failed to generate description", error: err.message });
  }
};

module.exports = { generateDescription };