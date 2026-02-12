import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const linkStyle = (path) =>
    `hover:text-blue-600 transition ${
      location.pathname === path ? "text-blue-600 font-semibold" : ""
    }`;

  return (
    <nav className="bg-white shadow-sm px-10 py-4 flex justify-between items-center">
      
      {/* LOGO */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        PREFSCALE
      </Link>

      {/* NAV LINKS */}
      <div className="flex items-center gap-6 text-gray-700">
        <Link to="/" className={linkStyle("/")}>
          Home
        </Link>

        <Link to="/about" className={linkStyle("/about")}>
          About
        </Link>

        <Link to="/services" className={linkStyle("/services")}>
          Services
        </Link>

        {/* 🔥 Resources (Old Blog Section) */}
        <Link to="/resources" className={linkStyle("/resources")}>
          Resources
        </Link>

        {/* 🔥 NEW All Blogs Section */}
        <Link to="/allblogs" className={linkStyle("/allblogs")}>
          All Blogs
        </Link>

        {user ? (
          <>
            <span className="text-sm text-gray-600">
              Welcome, <b>{user.name}</b>
            </span>

            <button
              onClick={handleLogout}
              className="border px-4 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={linkStyle("/login")}>
              Login
            </Link>

            <Link to="/signup" className={linkStyle("/signup")}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
