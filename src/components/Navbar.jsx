import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm px-10 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        PREFSCALE
      </Link>

      <div className="flex items-center gap-6 text-gray-700">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
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
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
