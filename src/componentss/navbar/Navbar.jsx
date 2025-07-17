import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  // const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      // Optional: Redirect or show toast
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Error signing out:", error);
      // toast.error("Logout failed");
    }
  };

  //   const logout = () => {
  //     localStorage.clear("users");
  //     navigate("/login");
  //   };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black sticky top-0 z-50">
      {/* Top section with logo and hamburger */}
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <Link to="/">
          <h2 className="font-bold text-white text-xl lg:text-2xl">
            MONSTITCH
          </h2>
        </Link>
        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* Desktop nav */}
        <ul className="hidden lg:flex space-x-9 text-white font-medium text-md">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/allproduct">All Product</Link>
          </li>
          {!user && (
            <li>
              <Link to="/login">Sign In</Link>
            </li>
          )}
          {user?.role === "user" && (
            <li>
              <Link to="/user-dashboard">User</Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li>
              <Link to="/admin-dashboard">Admin</Link>
            </li>
          )}
          {user && (
            <li className="cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          )}
          {user && (
            <li>
              <Link to="/cart">
                Cart ({user !== null && user !== "" ? cartItems.length : 0})
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile menu — horizontal layout */}
      {isMenuOpen && (
        <div className="lg:hidden w-full bg-black px-4 py-3">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white text-sm font-medium">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/allproduct">All Product</Link>
            </li>
            {!user && (
              <li>
                <Link to="/login">Sign In</Link>
              </li>
            )}
            {user?.role === "user" && (
              <li>
                <Link to="/user-dashboard">User</Link>
              </li>
            )}
            {user?.role === "admin" && (
              <li>
                <Link to="/admin-dashboard">Admin</Link>
              </li>
            )}
            {user && (
              <li className="cursor-pointer" onClick={logout}>
                Logout
              </li>
            )}
            {user && (
              <li>
                <Link to="/cart">Cart ({cartItems.length})</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
