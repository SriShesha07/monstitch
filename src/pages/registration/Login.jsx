// Login.jsx
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Layout from "../../componentss/layout/Layout";
import toast from "react-hot-toast";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(fireDB, "user", user.uid);
      const userSnap = await getDoc(userRef);

      // Check if user exists
      if (!userSnap.exists()) {
        // Default role
        let role = "user";

        // OPTIONAL: Define specific admins by email
        const adminEmails = ["youradmin@gmail.com"];
        if (adminEmails.includes(user.email)) {
          role = "admin";
        }

        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role: role,
          time: serverTimestamp(),
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        });

        toast.success(`Welcome ${user.displayName}`);
      } else {
        toast.success(`Welcome back ${user.displayName}`);
      }

      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      toast.error("Login failed");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="bg-[#121212] rounded-2xl shadow-2xl p-8 max-w-sm w-full text-white text-center">
          <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
          <p className="text-gray-400 mb-8">
            Sign in to continue to <span className="text-white font-semibold">MONSTITCH</span>
          </p>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 bg-white text-black py-2 px-6 rounded-full font-medium hover:shadow-lg transition duration-200 mx-auto"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>

          <p className="mt-10 text-sm text-gray-500">
            Don’t have an account? Just sign in with Google — it’s quick and easy!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
