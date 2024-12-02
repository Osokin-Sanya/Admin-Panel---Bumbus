import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OrderItem from "../../entities/orders/order-item-list";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { selectOrders } from "../../entities/orders/model/ordersSelectors";
import { prepareOrderData } from "./model";
import { fetchOrdersSearch } from "../../features/search-orders/api";
import { selecToolBar } from "../tool-bar/model/toolBarSelectors";
 

const OrderItems: React.FC = () => {
  const dispatch = useAppDispatch();
  const stateToolBar = useAppSelector(selecToolBar);
  const { orders, loading, error } = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(
      fetchOrdersSearch({
        searchQuery: stateToolBar.searchOrdersQuery,
        selectedStatus: stateToolBar.selectedStatus,
        filter: stateToolBar.filter,
      })
    );
  }, [dispatch, stateToolBar]);

  if (loading) {
    return (
      <div className="flex justify-center items-center  w-full min-h-screen -mt-72">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen -mt-72">
        {error}
      </div>
    );
  }

  return (
      <div className="gap-3 flex flex-col w-full">
        {orders.map((order) => {
          const orderData = prepareOrderData(order);
          return (
            <Link key={orderData.id} to={`/orders/${order.id}`}>
              <OrderItem
                id={orderData.id}
                nameProduct={orderData.productTitle}
                name={`${orderData.fullName}`}
                phone={orderData.phone}
                status={orderData.status}
                created_at={orderData.created_at}
                totalCost={orderData.totalPrice}
                numberItems={orderData.numberItems}
              />
            </Link>
          );
        })}
      </div>
   
  );
};

export default OrderItems;
