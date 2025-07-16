import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const { amount, currency = "INR", receipt } = req.body;

  try {
    const options = {
      amount: amount * 100, // in paise
      currency,
      receipt,
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: "Order creation failed", details: err });
  }
}
