import React, { useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Layout from "../../componentss/layout/Layout";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  // Redirect if user already signed in
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         navigate("/");
//       }
//     });
//     return () => unsubscribe();
//   }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      toast.success(`Welcome, ${user.displayName}`);
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  return (
    <Layout>
     <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-[#121212] rounded-2xl shadow-2xl p-8 max-w-sm w-full text-white text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
        <p className="text-gray-400 mb-8">Sign in to continue to <span className="text-white font-semibold">MONSTITCH</span></p>
        
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
