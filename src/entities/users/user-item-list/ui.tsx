import React from "react";

interface OrderItemProps {
  user: {
    id: string;
    identity_data: {
      email: string;
      name: string;
    };
    user_id: string;
    created_at: string;
  };
}

const UserItem: React.FC<OrderItemProps> = ({ user }) => {
  const { id, user_id, identity_data, created_at } = user;
  const { email, name } = identity_data;

  const date = new Date(created_at);

  const formattedDate = date.toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between border p-6 rounded-lg shadow-md bg-white space-y-4 md:space-y-0">
      <div className="flex items-start md:items-center space-x-6">
        <div className="border p-4 bg-gray-100 rounded-lg w-16 h-16 flex items-center justify-center"></div>

        <div className="flex flex-col items-start">
          <div className="text-lg font-semibold text-gray-900 mb-2">{name}</div>

          <div className="text-sm text-gray-600 flex   gap-2">
            <div className="text-start">
              <span className="font-medium text-gray-700">
                Номер телефону:{" "}
              </span>
              -
            </div>
            <div>
              <span className="font-medium text-gray-700">Email: </span> {email}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center md:justify-end">
        <div className="border p-3 rounded-lg bg-gray-100 text-gray-700 text-sm">
          <span className="font-medium text-gray-700">Дата реєстрації:</span>{" "}
          {formattedDate}
        </div>
      </div>
    </div>
  );
};

export default UserItem;
