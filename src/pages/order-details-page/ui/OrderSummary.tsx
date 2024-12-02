import React from "react";
import { Order } from "../../../entities/orders/model/types";

interface OrderSummaryProps {
  order: Order;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  const subtotal = order.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const shipping = order.shippingCost || 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Підсумок замовлення
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 text-sm">
          <span className="text-gray-600">Номер замовлення:</span>
          <span className="font-medium text-gray-900">{order.orderNumber}</span>
        </div>
        <div className="flex justify-between items-center py-2 text-sm">
          <span className="text-gray-600">Дата замовлення:</span>
          <span className="font-medium text-gray-900">
            {new Date(order.orderDate).toLocaleDateString()}{" "}
            {new Date(order.orderDate).toLocaleTimeString()}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center py-2 text-sm">
            <span className="text-gray-600">Сума товарів:</span>
            <span className="font-medium text-gray-900">
              {subtotal.toFixed(2)} ₴
            </span>
          </div>
          <div className="flex justify-between items-center py-2 text-sm">
            <span className="text-gray-600">Доставка:</span>
            <span className="font-medium text-gray-900">
              {shipping.toFixed(2)} ₴
            </span>
          </div>
          <div className="flex justify-between items-center py-3 text-base font-medium border-t border-gray-200 mt-2">
            <span className="text-gray-900">Загальна сума:</span>
            <span className="text-indigo-600">{total.toFixed(2)} ₴</span>
          </div>
        </div>
        <div className="mt-6">
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Статус оплати
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>{order.isPaid ? "Оплачено" : "Очікує оплати"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
