import { FC } from "react";
import ListUsers from "../../../widgets/list-users/ui";
import { SearchUsers } from "../../../features/search-users/ui";

const UsersPage: FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Користувачі
            </h1>
            <SearchUsers />
          </div>
          <ListUsers />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
