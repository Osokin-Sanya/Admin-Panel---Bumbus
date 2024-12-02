import React, { useEffect, useState } from "react";
import SearchOrders from "../../features/search-orders";
import SearchUsers from "../../features/search-users";
import { useLocation } from "react-router-dom";

import SelectUsersSort from "../../features/select-users-sort";
import SelectStatus from "../../features/select-status-sort";

const ToolBar: React.FC = () => {
  const location = useLocation().pathname;
  const [toggleSearch, setToggleSearch] = useState(false);

  useEffect(() => {
    if (location === "/user") {
      setToggleSearch(false);
    } else if (location === "/orders") {
      setToggleSearch(true);
    }
  }, [location]);

  return (
    <div className="flex w-4/5 mx-auto justify-between items-center gap-8 border border-gray-300 rounded-lg p-6 bg-white shadow-lg mt-4">
      {toggleSearch ? <SearchOrders /> : <SearchUsers />}

      <div className="flex items-center gap-2">
        <span className="text-gray-600 font-medium">Сортувати по:</span>
        {toggleSearch ? <SelectStatus /> : <SelectUsersSort />}
      </div>
    </div>
  );
};

export default ToolBar;
