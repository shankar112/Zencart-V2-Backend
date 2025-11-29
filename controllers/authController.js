// controllers/aiController.js
// Use the correct Node.js import for the generative-ai library
const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateDescription = async (req, res) => {
  const { productName } = req.body;

  if (!productName) {
    return res.status(400).json("Product name is required");
  }

  try {
    // Initialize with your API Key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Use the correct model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a professional, catchy, and SEO-friendly product description for an e-commerce item named: "${productName}". Keep it under 3 sentences.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ description: text });
  } catch (err) {
    console.error("AI Error:", err);
    // Send the actual error message to help debug
    res.status(500).json({ message: "Failed to generate description", error: err.message });
  }
};

module.exports = { generateDescription };