import { useEffect } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { routesConfig } from "./routesConfig";
import { useAppDispatch } from "./store/store";
import { checkAuth } from "../features/auth/authSlice";
import AppProviders from "./store/providers";
import Layout from "./Layout";
import { PageTransition } from '../shared/components/PageTransition';

import "./input.css";

function App() {
  const dispatch = useAppDispatch();
  const element = useRoutes(routesConfig);
  const location = useLocation();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          {element}
        </PageTransition>
      </AnimatePresence>
    </Layout>
  );
}

const AppWithProviders = () => {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
};

export default AppWithProviders;
