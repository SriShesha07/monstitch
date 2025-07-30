import Razorpay from "razorpay";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Parse Firebase service account JSON
let serviceAccount;
try {
  console.log("🔍 Parsing FIREBASE_SERVICE_ACCOUNT_JSON");
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  console.log("✅ Firebase service account loaded");
} catch (error) {
  console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON", error);
}

try {
  if (!global.firebaseAdminInitialized) {
    initializeApp({ credential: cert(serviceAccount) });
    global.firebaseAdminInitialized = true;
    console.log("✅ Firebase Admin Initialized");
  }
} catch (err) {
  console.error("❌ Firebase Admin Initialization Error", err);
}

const db = getFirestore();

export default async function handler(req, res) {
  console.log("📥 Incoming request:", req.method);

  if (req.method !== "POST") {
    console.warn("⚠️ Invalid method");
    return res.status(405).send("Method Not Allowed");
  }

  const { cartItems, receipt } = req.body;

  console.log("🛒 Received cartItems:", cartItems);
  console.log("🧾 Received receipt:", receipt);

  if (!Array.isArray(cartItems)) {
    console.error("❌ Invalid cart items");
    return res.status(400).json({ error: "Invalid cart items" });
  }

  try {
    let totalAmount = 0;
    const shippingCharge = 20;

    for (const item of cartItems) {
      console.log(`🔍 Fetching product ID: ${item.productId}`);
      const productsRef = db.collection("products");
      const querySnapshot = await productsRef.where("productId", "==", item.productId).get();

      if (querySnapshot.empty) {
        console.error(`❌ Product not found: ${item.productId}`);
        return res.status(404).json({ error: `Product not found: ${item.productId}` });
      }

      const productData = querySnapshot.docs[0].data();
      console.log(`✅ Product found: ${item.productId}`, productData);
      const price = productData.price;
      const itemTotal = price * item.quantity;
      totalAmount += itemTotal;

      console.log(`🧾 Product: ${item.productId}, Qty: ${item.quantity}, Price: ₹${price}, Subtotal: ₹${itemTotal}`);
    }

    totalAmount += shippingCharge;
    console.log(`🚚 Shipping Charge: ₹${shippingCharge}`);
    console.log(`💰 Final Total (with shipping): ₹${totalAmount}`);

    // Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: totalAmount * 100, // convert to paise
      currency: "INR",
      receipt,
    };

    console.log("📦 Creating Razorpay order with options:", options);

    const order = await razorpay.orders.create(options);
    console.log("✅ Razorpay order created:", order);

    res.status(200).json(order);
  } catch (error) {
    console.error("❌ Error during order creation", error);
    res
      .status(500)
      .json({ error: "Order creation failed", details: error.message || error.toString() });
  }
}
