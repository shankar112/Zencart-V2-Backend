// controllers/aiController.js
// We use the NEW library: @google/genai
const { GoogleGenAI } = require("@google/genai");

const generateDescription = async (req, res) => {
  const { productName } = req.body;

  if (!productName) {
    return res.status(400).json("Product name is required");
  }

  try {
    // 1. Initialize the Client (matches your screenshot)
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `Write a professional, catchy, and SEO-friendly product description for an e-commerce item named: "${productName}". Keep it under 3 sentences.`;

    // 2. Generate Content using the new syntax
    // We use 'gemini-1.5-flash' as it is the current stable, fast model.
    const { response } = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    // 3. Extract the text
    const text = response.text();

    res.status(200).json({ description: text });
  } catch (err) {
    console.error("AI Error:", err);
    // Send the full error message for debugging
    res.status(500).json({ message: "Failed to generate description", error: err.message });
  }
};

module.exports = { generateDescription };