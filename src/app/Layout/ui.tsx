import React from "react";
import Header from "../../pages/header-page";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="App  ">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
