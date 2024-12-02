import React from "react";
import classNames from "classnames";
import getStatusLabel from "../../../features/get-current-status/getStatusLabel";

interface OrderItemProps {
  id: number;
  name: string;
  status: number;
  nameProduct: string;
  phone: string;
  created_at: string;
  totalCost: number;
  numberItems: number;
}

const OrderItem: React.FC<OrderItemProps> = ({
  id,
  nameProduct,
  name,
  phone,
  status,
  created_at,
  totalCost,
  numberItems,
}) => {
  const date = new Date(created_at);

  const formattedDate = date.toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const statusClass = classNames({
    "bg-blue-500 text-white": status === 1,
    "bg-green-500 text-white": status === 2,
    "bg-red-500 text-white": status === 3,
    "bg-gray-500 text-white": status === 4,
    "bg-yellow-500 text-black": ![1, 2, 3, 4].includes(status),
  });
  return (
    <div className="flex items-center justify-between border p-6 rounded-lg shadow-lg bg-white">
      <div className="flex items-center space-x-6">
        <div className="border p-4 bg-gray-100 rounded-lg flex items-center justify-center w-16 h-16">
          <span className="text-gray-500">img</span>
        </div>

        <div>
          <div className="text-lg text-start font-semibold text-gray-900 mb-2">
            {nameProduct}
            <span className="text-sm">{numberItems > 1 ? ` + ${numberItems-1}` : ""}</span>
          </div>

          <div className="flex gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-medium text-gray-700 mr-2">Ім'я: </span>
              {name}
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-700  mr-2">Телефон: </span>
              {phone}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="flex flex-col items-end ml-0">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-700 mr-2">Дата:</span>
            {formattedDate}
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-700 mr-2">Вартість:</span>
            {totalCost}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className={`border p-2 rounded-lg ${statusClass}`}>
            Статус: {getStatusLabel({ status })}
          </div>

          <div className="border p-2 rounded-lg bg-gray-100 text-gray-700">
            № {id}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
