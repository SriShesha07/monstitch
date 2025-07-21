import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../componentss/loader/Loader";

export const ProtectedRouteForAdmin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(fireDB, "user", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Error checking admin role:", err);
      }
      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) return <Loader />;

  return isAdmin ? children : <Navigate to="/login" />;
};
