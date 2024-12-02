import React, { useState } from "react";
import { selectFilterOrders } from "../tool-bar/model/toolBarSlice";
import { useAppDispatch } from "../../app/store/store";

const brandsList = [
  "Nike",
  "Adidas",
  "Puma",
  "Reebok",
  "New Balance",
  "Converse",
];

const FilterUsers: React.FC = () => {
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value === "" ? "" : parseInt(e.target.value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value === "" ? "" : parseInt(e.target.value));
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedBrands((prevBrands) =>
      checked
        ? [...prevBrands, value]
        : prevBrands.filter((brand) => brand !== value)
    );
  };

  const applyFilters = () => {
    const filters = {
      minPrice: minPrice,
      maxPrice: maxPrice,
      brands: selectedBrands,
    };
    dispatch(selectFilterOrders(filters));
  };

  return (
    <div className="p-4 border bg-white border-gray-300 rounded-lg shadow-md space-y-4 w-72">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Фільтр по ціні</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            placeholder="Ціна від"
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            placeholder="Ціна до"
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Бренди</h3>
        <div className="flex flex-col space-y-2">
          {brandsList.map((brand) => (
            <label key={brand} className="inline-flex items-center">
              <input
                type="checkbox"
                value={brand}
                onChange={handleBrandChange}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-2 text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
      >
        Застосувати фільтри
      </button>
    </div>
  );
};

export default FilterUsers;
