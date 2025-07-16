// /api/createOrder.js
import Razorpay from "razorpay";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { amount, currency } = req.body;

  try {
    const order = await instance.orders.create({
      amount,
      currency,
      receipt: `receipt_order_${Date.now()}`,
    });
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Order creation failed" });
  }
}
