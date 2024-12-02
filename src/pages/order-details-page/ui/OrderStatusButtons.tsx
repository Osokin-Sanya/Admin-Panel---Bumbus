import React, { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import classNames from "classnames";
import getStatusLabel from "../../../features/get-current-status/getStatusLabel";
import { useAppDispatch } from "../../../app/store/store";
import statuses from "../model/data";
import { NumericStatus } from "../../../entities/orders/lib/mapOrderStatus";
import { updateOrderStatusThunk } from "../../../features/buttons-change-status/model/updateOrderStatusThunk";
import { fetchOrderById } from "../../../entities/orders/api/thunkFetchOrderById";

interface Props {
  id: number;
  status: NumericStatus;
}

const OrderStatusButtons: React.FC<Props> = ({ id, status }) => {
  const [updatingStatus, setUpdatingStatus] = useState<NumericStatus | null>(
    null
  );
  const dispatch = useAppDispatch();

  const handleStatusChange = async (newStatus: NumericStatus) => {
    setUpdatingStatus(newStatus);
    try {
      await dispatch(
        updateOrderStatusThunk({ id, status: newStatus })
      ).unwrap();

      await dispatch(fetchOrderById(String(id))).unwrap();
    } catch (error) {
      console.error("The error of the status update:", error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const statusClass = classNames({
    "bg-blue-500 text-white": status === 1,
    "bg-green-500 text-white": status === 2,
    "bg-red-500 text-white": status === 3,
    "bg-gray-500 text-white": status === 4,
    "bg-yellow-500 text-black": ![1, 2, 3, 4].includes(status),
  });

  return (
    <div className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white hover:shadow-md transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
          <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Статус замовлення
          </span>
        </h3>
        <div
          className={`${statusClass} py-3 px-4 rounded-xl text-center font-medium shadow-sm transform hover:scale-[1.02] transition-all duration-300`}
        >
          {getStatusLabel({ status })}
        </div>
      </div>

      <div className="space-y-3">
        {statuses.map((statusItem) => {
          const numericStatus = parseInt(statusItem.status) as NumericStatus;
          const isActive = status === numericStatus;
          const isUpdating = updatingStatus === numericStatus;

          return (
            <button
              key={statusItem.status}
              onClick={() => handleStatusChange(numericStatus)}
              disabled={isActive || updatingStatus !== null}
              className={`
                w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 relative
                ${
                  isActive
                    ? "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-white to-gray-50 border border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                }
              `}
            >
              {isUpdating ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Spinner size="sm" color="blue" />
                </div>
              ) : null}
              <span className={isUpdating ? "opacity-0" : ""}>
                {statusItem.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusButtons;
