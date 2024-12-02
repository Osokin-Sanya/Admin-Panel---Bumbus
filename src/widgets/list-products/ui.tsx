import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { selectProducts } from "../../entities/product/model/productSelectors";
import Product from "../../entities/product/ui";
import { selectfilterStock } from "../filter-stock/model/filterStockSelectors";
import { fetchProducts } from "../../entities/product/api/fetchProductsThunks";

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchProductQuery, filter, sort } =
    useAppSelector(selectfilterStock);

  const { products, loading, error } = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts({ searchProductQuery, filter, sort }));
  }, [dispatch, searchProductQuery, filter, sort]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen -mt-72">
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
    <table className="min-w-full bg-white border rounded-lg shadow">
      <thead>
        <tr className="border-b bg-gray-50">
          <th className="p-2 text-left text-gray-600 font-semibold">ID</th>
          <th className="p-2 text-left text-gray-600 font-semibold">
            Зображення
          </th>
          <th className="p-2 text-left text-gray-600 font-semibold">Назва</th>
          <th className="p-2 text-left text-gray-600 font-semibold">Ціна</th>
          <th className="p-2 text-left text-gray-600 font-semibold">Бренд</th>
          <th className="p-2 text-left text-gray-600 font-semibold">Опис</th>
          <th className="p-2 text-left text-gray-600 font-semibold">
            Кількість
          </th>
          <th className="p-2 text-left text-gray-600 font-semibold">Дії</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: any) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            imageUrl={product.imageUrl}
            description={product.description}
            brand={product.brand}
            amount={product.amount}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Products;
