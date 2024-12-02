import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerInfo from "./CustomerInfo";
import DeliveryInfo from "./DeliveryInfo";
import OrderComment from "./OrderComment";
import OrderProductDetails from "./OrderProductDetails";
import OrderStatusButtons from "./OrderStatusButtons";
import OrderSummary from "./OrderSummary";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { fetchOrderById } from "../../../entities/orders/api/thunkFetchOrderById";
import { mapStatusToString } from "../../../entities/orders/lib/mapOrderStatus";
import { ArrowBackIcon } from "@chakra-ui/icons";

const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { order, isLoading, error } = useAppSelector((state) => state.order);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

  // if (isLoading) {
  //   return (
  // <div className="flex justify-center items-center min-h-screen">
  //   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  // </div>
  //   );
  // }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
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
              <p className="text-sm text-yellow-700">Замовлення не знайдено</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-1 grid grid-cols-3 items-center  ">
        <button
          onClick={() => navigate(-1)}
          className="mb-2 px-4 py-1  text-lg border mr-auto border-red-100 hover:border-red-200  bg-slate-50 hover:bg-slate-100  text-gray-700 rounded-xl flex items-center gap-2 transition-colors"
        >
          <ArrowBackIcon />
          Назад
        </button> 
        <h1 className="text-3xl mb-6 font-bold text-gray-900">
          Замовлення #{order.orderNumber}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CustomerInfo order={order} />
          <DeliveryInfo
            address={order.address}
            status={mapStatusToString(order.status)}
            deliveryMethod={order.deliveryMethod}
            estimatedDelivery={order.estimatedDelivery}
          />
          {order.comment && <OrderComment commentText={order.comment} />}
          <OrderProductDetails products={order.products} />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary order={order} />
          <OrderStatusButtons id={order.id} status={order.status} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
