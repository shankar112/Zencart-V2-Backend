// controllers/aiController.js
// We use the library you already have installed: @google/generative-ai
const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateDescription = async (req, res) => {
  const { productName } = req.body;

  if (!productName) {
    return res.status(400).json("Product name is required");
  }

  try {
    // 1. Initialize with your API Key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // 2. Use the 'gemini-1.5-flash' model (The old 'gemini-pro' is what caused the 404)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a professional, catchy, and SEO-friendly product description for an e-commerce item named: "${productName}". Keep it under 3 sentences.`;

    // 3. Generate Content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ description: text });
  } catch (err) {
    console.error("AI Error:", err);
    // Send the actual error message to help debug if it happens again
    res.status(500).json({ message: "Failed to generate description", error: err.message });
  }
};

module.exports = { generateDescription };