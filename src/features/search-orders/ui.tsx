import { useEffect, useState, useCallback } from "react";
import { useAppDispatch } from "../../app/store/store";
import { fetchOrdersSearch } from "./api";
import debounce from "debounce";
import { searchOrders } from "../../widgets/tool-bar/model/toolBarSlice";

export const SearchOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchTitle, setSearchTitle] = useState("");

  const searchChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTitle(e.target.value);
    }, 800),
    []
  );

  useEffect(() => {
    dispatch(searchOrders(searchTitle));
  }, [searchTitle]);

  return (
    <div className="flex items-center">
      <input
        type="text"
        onChange={searchChange}
        placeholder="Пошук замовлень..."
        className="border border-gray-300 rounded-lg p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-[rgb(86,255,61)] focus:border-transparent transition duration-200"
      />
    </div>
  );
};
