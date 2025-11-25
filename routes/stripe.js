// routes/stripe.js
const router = require('express').Router();
// FIX: Ensure key is trimmed to avoid whitespace issues
const stripe = require('stripe')(process.env.STRIPE_KEY ? process.env.STRIPE_KEY.trim() : "");

router.post('/payment', async (req, res) => {
  try {
    // Log the incoming request for debugging (don't log full key for security)
    console.log("Initiating Payment with key ending in:", process.env.STRIPE_KEY ? process.env.STRIPE_KEY.slice(-4) : "MISSING");

    const line_items = req.body.items.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    // Change success/cancel URLs to the LIVE frontend URL
    // You need to update this to your Vercel URL!
    const frontendURL = req.headers.origin || 'https://zencart-v2-frontend.vercel.app'; 

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${frontendURL}/success`,
      cancel_url: `${frontendURL}/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error Detailed:", error); // This will show in Render logs
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;