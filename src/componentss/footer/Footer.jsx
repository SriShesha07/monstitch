import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div>
      <footer className="text-gray-600 body-font bg-black">
        <div className="container px-5 py-5 mx-auto flex flex-col sm:flex-row items-center justify-between">
          {/* Logo or Branding (optional) */}

          {/* Legal Links */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-gray-300 text-sm mb-4 sm:mb-0">
            <Link to="/privacy-policy" className="hover:text-white transition duration-300">
              Privacy Policy
            </Link>
            <Link to="/shipping-policy" className="hover:text-white transition duration-300">
              Shipping & Delivery
            </Link>
            <Link to="/cancellation-policy" className="hover:text-white transition duration-300">
              Cancellation & Refund
            </Link>
            <Link to="/termsandconditions" className="hover:text-white transition duration-300">
              Terms & Conditions
            </Link>
            <span
              onClick={() => navigate("/contactus")}
              className="hover:text-white cursor-pointer transition duration-300"
            >
              Contact Us
            </span>
            <Link to="/aboutUs" className="hover:text-white transition duration-300">
              About Us
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-100 text-center sm:text-left">
            © 2025 Monstitch —
            <Link
              to="/"
              className="text-gray-100 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @monstitch
            </Link>
          </p>

          {/* Social Icons */}
          <span className="inline-flex mt-4 sm:mt-0">
            {/* <a className="text-gray-100 cursor-pointer mr-3">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                   className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a className="text-gray-100 cursor-pointer mr-3">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                   className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a> */}
           <a
  href={import.meta.env.VITE_INSTAGRAM_URL}
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-100 cursor-pointer mr-3"
>
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="w-5 h-5"
    viewBox="0 0 24 24"
  >
    <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
  </svg>
</a>


            {/* <a className="text-gray-100 cursor-pointer">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0}
                   className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none"
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx={4} cy={4} r={2} stroke="none" />
              </svg>
            </a> */}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
