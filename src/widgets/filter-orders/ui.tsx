import React, { useEffect, useState } from "react";
import {
  searchOrders,
  selectFilterOrders,
} from "../tool-bar/model/toolBarSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { selecToolBar } from "../tool-bar/model/toolBarSelectors";

const statusOptions = [
  { title: "В обробці", value: 1 },
  { title: "Відправлено", value: 2 },
  { title: "Доставлено", value: 4 },
  { title: "Скасовано", value: 3 },
];

const paymentMethods = ["Готівкою", "Картою", "Онлайн"];
const deliveryMethods = [
  { title: "Всі методи доставки", value: 0 },
  { title: "Самовивіз", value: 1 },
  { title: "Поштомат", value: 2 },
  { title: "Кур'єр", value: 3 },
];
const brandsList = ["Nike", "Adidas", "Puma", "New Balance ", "Converse"];

const FilterOrders: React.FC = () => {
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [status, setStatus] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string | "">("");
  const [deliveryMethod, setDeliveryMethod] = useState<number>();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const stateToolBar = useAppSelector(selecToolBar);

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setSelectedBrands((prevBrands) =>
      checked
        ? [...prevBrands, value]
        : prevBrands.filter((brand) => brand !== value)
    );
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.selectedOptions[0];
    const dataValue = selectedStatus.getAttribute("data-status");

    setStatus(Number(dataValue));
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handleDeliveryMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOption = e.target.selectedOptions[0];
    const dataValue = selectedOption.getAttribute("data-delivery");
    if (dataValue) {
      setDeliveryMethod(Number(dataValue));
    }
  };

  const applyFilters = () => {
    const filters = {
      minPrice: minPrice,
      maxPrice: maxPrice,
      status,
      customerName,
      paymentMethod,
      deliveryMethod,
      brands: selectedBrands,
    };
  
    dispatch(selectFilterOrders(filters));
    if (customerName) {
      dispatch(searchOrders(customerName));
    }
  };
  
  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setStatus(0);
    setCustomerName("");
    setPaymentMethod("");
    setDeliveryMethod(0);
    setSelectedBrands([]);
    
     
    dispatch(selectFilterOrders({
      minPrice: "",
      maxPrice: "",
      status: 0,
      customerName: "",
      paymentMethod: "",
      deliveryMethod: 0,
      brands: [],
    }));
    dispatch(searchOrders(""));
  };

  useEffect(() => {
    setSelectedBrands(stateToolBar.filter.brands);
  }, [stateToolBar.filter.brands]);

  return (
    <div className="p-4 bg-white border-gray-300 rounded-lg shadow-md space-y-4 w-80  ">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Фільтр за ціною</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value === "" ? "" : parseInt(e.target.value))
            }
            placeholder="Ціна від"
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value === "" ? "" : parseInt(e.target.value))
            }
            placeholder="Ціна до"
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Статус замовлення</h3>
        <select
          onChange={handleStatusChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="">Всі статуси</option>
          {statusOptions.map((statusOption) => (
            <option
              key={statusOption.value}
              data-status={statusOption.value}
              value={statusOption.value}
            >
              {statusOption.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Бренди</h3>
        <div className="flex flex-col space-y-2">
          {brandsList.map((brand, id) => (
            <label key={brand} className="inline-flex items-center">
              <input
                checked={selectedBrands.includes(brand)}
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

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Метод оплати</h3>
        <select
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          {paymentMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Метод доставки</h3>
        <select
          value={deliveryMethod}
          onChange={handleDeliveryMethodChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          {deliveryMethods.map((method) => (
            <option
              data-delivery={method.value}
              key={method.value}
              value={method.value}
            >
              {method.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Ім'я клієнта</h3>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Введіть ім'я клієнта"
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
      >
        Застосувати фільтри
      </button>
      <button
        onClick={clearFilters}
        className="w-full bg-fuchsia-400 text-black py-2 px-4 rounded-lg hover:bg-fuchsia-600 transition duration-300"
      >
        Очистити фільтри
      </button>
    </div>
  );
};

export default FilterOrders;
