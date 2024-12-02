import React from "react";
import { Order } from "../../../entities/orders/model/types";

interface CustomerInfoProps {
  order: Order;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Інформація про клієнта
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full text-left">
            <tbody>
              <tr className="border-b">
                <th className="px-4 py-2 text-sm font-medium text-gray-500">
                  Ім'я:
                </th>
                <td className="px-4 py-2 text-base text-gray-900">
                  {order.customerName}
                </td>
              </tr>
              <tr className="border-b">
                <th className="px-4 py-2 text-sm font-medium text-gray-500">
                  Телефон:
                </th>
                <td className="px-4 py-2 text-base text-gray-900">
                  {order.phone}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full text-left">
            <tbody>
              <tr className="border-b">
                <th className="px-4 py-2 text-sm font-medium text-gray-500">
                  Email:
                </th>
                <td className="px-4 py-2 text-base text-gray-900">
                  {order.email}
                </td>
              </tr>
              <tr className="border-b">
                <th className="px-4 py-2 text-sm font-medium text-gray-500">
                  Спосіб оплати:
                </th>
                <td className="px-4 py-2 text-base text-gray-900">
                  {order.paymentMethod}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
