import { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Orders from "../pages/orders-page";
import OrderDetailsPage from "../pages/order-details-page";
import UsersPage from "../pages/users-page";
import UserDetailsPage from "../pages/user-details-page";
import StockPage from "../pages/stock-page";
import EditProductPage from "../pages/edit-product-page";
import { AuthPage } from "../pages/auth/AuthPage";
import { ProtectedRoute } from "../shared/components/ProtectedRoute";
import Main from "../pages/main";
 

export const routesConfig: RouteObject[] = [
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <UsersPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element:  <Main />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders/:id",
    element: (
      <ProtectedRoute>
        <OrderDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/:id",
    element: (
      <ProtectedRoute>
        <UserDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/warehouse",
    element: (
      <ProtectedRoute>
        <StockPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/warehouse/new",
    element: (
      <ProtectedRoute>
        <EditProductPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/warehouse/:id",
    element: (
      <ProtectedRoute>
        <EditProductPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
