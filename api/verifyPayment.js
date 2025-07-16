// /api/verifyPayment.js
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import crypto from "crypto";

// Initialize Firebase Admin SDK
const firebasePrivateKey = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
const app = initializeApp({ credential: cert(firebasePrivateKey) });
const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    formData,
    cartItems,
    total,
  } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    // Signature is valid — store in Firestore
    await db.collection("payments").add({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
      cartItems,
      total,
      status: "Paid",
      createdAt: new Date(),
    });

    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, error: "Invalid signature" });
  }
}
