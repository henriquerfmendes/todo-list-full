import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { UserIcon } from "@heroicons/react/24/solid";

function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gray-800 shadow-lg font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-white font-semibold text-lg">
              Task Manager
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <div className="relative group flex items-center">
                <UserIcon
                  className="w-6 h-6 text-gray-300 cursor-pointer"
                  title={user.email}
                />
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-gray-700 text-xs text-gray-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {user.email}
                </span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
