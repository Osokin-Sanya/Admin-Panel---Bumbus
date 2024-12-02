import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setFilters } from "./model/filterStockSlice";

interface SortOption {
  value: "asc" | "desc";
  label: string;
  type: "date" | "price" | "amount";
}

interface SortStandart {
  field?: "price" | "date" | "amount";
  direction?: "asc" | "desc";
}

interface LocalFilters {
  searchQuery: string;
  sortBrand: string;
  sortStandart: SortStandart;
  minPrice: number | null;
  maxPrice: number | null;
}

const options: SortOption[] = [
  { value: "asc", label: "За часом ↑", type: "date" },
  { value: "desc", label: "За часом ↓", type: "date" },
  { value: "asc", label: "За цiною ↑", type: "price" },
  { value: "desc", label: "За цiною ↓", type: "price" },
  { value: "desc", label: "За кількістю ↓", type: "amount" },
  { value: "asc", label: "За кількістю ↑", type: "amount" },
];

const FilterStock: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { searchProductQuery, filter, sort } = useAppSelector(
    (state) => state.filterStock
  );

  const initialFilters: LocalFilters = {
    searchQuery: "",
    sortBrand: "",
    sortStandart: {
      field: "date",
      direction: "desc",
    },
    minPrice: null,
    maxPrice: null,
  };

  const [localFilters, setLocalFilters] = useState<LocalFilters>({
    searchQuery: searchProductQuery,
    sortBrand: sort.sortBrand,
    sortStandart: sort.sortStandart as SortStandart,
    minPrice: filter.minPrice,
    maxPrice: filter.maxPrice,
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "sortStandart") {
      const select = e.target as HTMLSelectElement;
      const selectedOption = select.options[select.selectedIndex];
      const sortType = selectedOption.getAttribute("data-type") as
        | "date"
        | "price"
        | "amount"
        | null;

      if (sortType && (value === "asc" || value === "desc")) {
        setLocalFilters((prev) => ({
          ...prev,
          sortStandart: {
            field: sortType,
            direction: value,
          },
        }));
      }
    } else if (name === "minPrice" || name === "maxPrice") {
      const numValue = value === "" ? null : Number(value);
      setLocalFilters((prev) => ({ ...prev, [name]: numValue }));
    } else {
      setLocalFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleApplyFilters = () => {
    dispatch(
      setFilters({
        searchProductQuery: localFilters.searchQuery,
        filter: {
          minPrice: localFilters.minPrice || 0,
          maxPrice: localFilters.maxPrice,
        },
        sort: {
          sortBrand: localFilters.sortBrand,
          sortStandart: localFilters.sortStandart,
        },
      })
    );
  };

  const cleanFilters = () => {
    setLocalFilters(initialFilters);
    dispatch(
      setFilters({
        searchProductQuery: "",
        filter: {
          minPrice: 0,
          maxPrice: null,
        },
        sort: {
          sortBrand: "",
          sortStandart: {
            field: "date",
            direction: "desc",
          } as SortStandart,
        },
      })
    );
  };

  return (
    <div className="flex items-center justify-between mb-4 bg-white rounded-lg shadow-md p-4">
      <input
        type="text"
        placeholder="Пошук за назвою..."
        name="searchQuery"
        value={localFilters.searchQuery}
        onChange={handleFilterChange}
        className="border rounded-lg px-4 py-2 w-1/5"
      />

      <select
        name="sortBrand"
        value={localFilters.sortBrand}
        onChange={handleFilterChange}
        className="border rounded-lg px-4 py-2"
      >
        <option value="">Всі бренди</option>
        <option value="Nike">Nike</option>
        <option value="Adidas">Adidas</option>
        <option value="Puma">Puma</option>
        <option value="New Balance">New Balance</option>
      </select>

      <select
        name="sortStandart"
        onChange={handleFilterChange}
        className="border rounded-lg px-4 py-2"
      >
        {options.map((option, id) => (
          <option key={id} value={option.value} data-type={option.type}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Ціна від"
          name="minPrice"
          value={localFilters.minPrice || ""}
          onChange={handleFilterChange}
          className="border rounded-lg px-4 py-2 w-28"
          min="0"
        />
        <input
          type="number"
          placeholder="Ціна до"
          name="maxPrice"
          value={localFilters.maxPrice || ""}
          onChange={handleFilterChange}
          className="border rounded-lg px-4 py-2 w-28"
          min="0"
        />
      </div>

      <div className="flex gap-2">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        onClick={handleApplyFilters}
      >
        Застосувати
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        onClick={cleanFilters}
      >
        X
      </button>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => navigate("/warehouse/new")}
      >
        Створити
      </button>
    </div>
  );
};

export default FilterStock;
