import React from "react";
import ToolBar from "../../widgets/tool-bar";

import OrderItems from "../../widgets/list-orders";
import FilterOrders from "../../widgets/filter-orders";

const Orders: React.FC = () => {
  return (
    <div>
      <ToolBar />
      <div className="flex gap-2 justify-between w-4/5 m-auto mt-5">  
      <FilterOrders />
      <OrderItems />
      </div>
    </div>
  );
};

export default Orders;
