import Products from "../../widgets/list-products";
import FilterStock from "../../widgets/filter-stock";

const StockPage = () => {
  return (
    <div className="container mx-auto p-4">
      <FilterStock />
      <Products />
    </div>
  );
};

export default StockPage;
