import React from "react";
import { Product } from "../../../entities/orders/model/types";

interface OrderProductDetailsProps {
  products: Product[];
}

const OrderProductDetails: React.FC<OrderProductDetailsProps> = ({
  products,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Деталі замовлення
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Товар
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Кількість
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ціна
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Сума
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {product.image && (
                      <div className="flex-shrink-0 h-10 w-10 mr-4">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.price.toFixed(2)} ₴
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {(product.price * product.quantity).toFixed(2)} ₴
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td
                colSpan={3}
                className="px-6 py-4 text-sm font-medium text-gray-900 text-right"
              >
                Всього:
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {products
                  .reduce(
                    (sum, product) => sum + product.price * product.quantity,
                    0
                  )
                  .toFixed(2)}{" "}
                ₴
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default OrderProductDetails;
