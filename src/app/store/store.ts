import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../../entities/product/model/productSlice";
import ordersSlice from "../../entities/orders/model/ordersSlice";
import orderSlice from "../../pages/order-details-page/model/orderSlice";
import usersSlice from "../../entities/users/model/usersSlice";
import userSlice from "../../entities/users/user/model/userSlice";
import userOrdersSlice from "../../entities/orders/user-orders/model/userOrdersSlice";
import toolBarSlice from "../../widgets/tool-bar/model/toolBarSlice";
import filterStockSlice from "../../widgets/filter-stock/model/filterStockSlice";
import authReducer from "../../features/auth/authSlice";
import orderReducer from "../../entities/orders/model/orderSlice";
import usersReducer from "../../entities/users/model/usersSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    product: productSlice,
    orders: ordersSlice,
    orderDetails: orderSlice,
    users: usersReducer,
    usersDetails: userSlice,
    userOrders: userOrdersSlice,
    toolBar: toolBarSlice,
    filterStock: filterStockSlice,
    auth: authReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>(); 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
