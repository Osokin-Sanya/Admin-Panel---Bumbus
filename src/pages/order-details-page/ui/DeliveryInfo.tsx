import React from "react";
import { DeliveryAddress } from "../../../entities/orders/model/types";

interface DeliveryInfoProps {
  address: DeliveryAddress;
  status: "pending" | "confirmed" | "in_transit" | "delivered" | "cancelled";
  deliveryMethod: string;
  estimatedDelivery?: string;
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({
  address,
  status,
  deliveryMethod,
  estimatedDelivery,
}) => {
  console.log(address.courierAddress);

  const renderAddress = () => {
    if (
      address.courierAddress &&
      Object.keys(address.courierAddress).length > 0
    ) {
      return (
        <>
          <tr>
            <th className="px-4 py-2 text-sm font-medium text-gray-500">
              Адреса доставки:
            </th>
            <td className="px-4 py-2 text-base text-gray-900">
              вул. {address.courierAddress.street}, буд.{" "}
              {address.courierAddress.house}
              {address.courierAddress.apartment &&
                `, кв. ${address.courierAddress.apartment}`}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 text-sm font-medium text-gray-500">
              Додаткова інформація:
            </th>
            <td className="px-4 py-2 text-base text-gray-900">
              Поверх: {address.courierAddress.floor}
              {address.courierAddress.cargoElevator && ", Є вантажний ліфт"}
            </td>
          </tr>
        </>
      );
    }

    if (address.selfPickupNovaPoshta) {
      return (
        <tr>
          <th className="px-4 py-2 text-sm font-medium text-gray-500">
            Відділення Нової Пошти:
          </th>
          <td className="px-4 py-2 text-base text-gray-900">
            {address.selfPickupNovaPoshta}
          </td>
        </tr>
      );
    }

    if (address.selfPickupPostomat) {
      return (
        <tr>
          <th className="px-4 py-2 text-sm font-medium text-gray-500">
            Поштомат:
          </th>
          <td className="px-4 py-2 text-base text-gray-900">
            {address.selfPickupPostomat}
          </td>
        </tr>
      );
    }

    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Інформація про доставку
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-left">
          <tbody>
            <tr>
              <th className="px-4 py-2 text-sm font-medium text-gray-500">
                Спосіб доставки:
              </th>
              <td className="px-4 py-2 text-base text-gray-900">
                {deliveryMethod}
              </td>
            </tr>
            <tr>
              <th className="px-4 py-2 text-sm font-medium text-gray-500">
                Місто:
              </th>
              <td className="px-4 py-2 text-base text-gray-900">
                {address.address.city}, {address.address.region}
              </td>
            </tr>
            {renderAddress()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryInfo;
