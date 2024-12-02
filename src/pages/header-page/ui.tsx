import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store/store";
import { logout } from "../../features/auth/authSlice";
import logo from "../../img/logo.png";
import LinksToPages from "../../widgets/links-to-pages";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <img
              className="h-10 w-10 object-contain rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              src={logo}
              alt="Logo"
            />
            <span className="text-lg font-semibold text-gray-800">
              Admin Panel
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <LinksToPages />
          </div>

          <button
            onClick={handleLogout}
            className="
              px-4 py-2
              bg-indigo-600
              hover:bg-indigo-700
              active:bg-indigo-800
              text-white
              rounded-lg
              shadow-sm
              hover:shadow-md
              transition-all
              duration-200
              text-sm
              font-medium
              flex
              items-center
              space-x-2
            "
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Вихід</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
