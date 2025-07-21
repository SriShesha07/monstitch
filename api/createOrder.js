import Razorpay from "razorpay";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin (ensure this only runs once)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

if (!global.firebaseAdminInitialized) {
  initializeApp({ credential: cert(serviceAccount) });
  global.firebaseAdminInitialized = true;
}
const db = getFirestore();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { cartItems, receipt } = req.body;
  if (!Array.isArray(cartItems)) {
    return res.status(400).json({ error: "Invalid cart items" });
  }

  try {
    // Fetch product details from Firestore
    let totalAmount = 0;
    for (const item of cartItems) {
      const productRef = db.collection("products").doc(item.productId);
      const productSnap = await productRef.get();
      if (!productSnap.exists) {
        return res.status(404).json({ error: `Product not found: ${item.productId}` });
      }
      const productData = productSnap.data();

      const price = productData.price;
      totalAmount += price * item.quantity;
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: totalAmount * 100, // amount in paise
      currency: "INR",
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Order creation failed", details: error.message });
  }
}
