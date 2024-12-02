import React from "react";
import { NavLink } from "react-router-dom";
import { TitleLinks } from "./model";

const LinksToPages: React.FC = () => {
  return (
    <nav className="flex items-center space-x-6">
      {Object.entries(TitleLinks).map(([route, title]) => (
        <NavLink
          key={route}
          to={route}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium
            transition-all duration-200
            ${
              isActive
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
            }
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`
          }
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );
};

export default LinksToPages;
