import { useCallback, useState } from "react";
import debounce from "debounce";
import { useAppDispatch } from "../../app/store/store";
import { searchUsers } from "../../entities/users/api/thunkSearchUsers";

export const SearchUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(
    debounce((value: string) => {
      if (value.trim()) {
        dispatch(searchUsers(value));
      } else {
        dispatch(searchUsers(""));
      }
    }, 300),
    [dispatch]
  );
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={onChange}
        placeholder="Пошук за ID, ім'ям або email..."
        className="border border-gray-300 rounded-lg p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-[rgb(86,255,61)] focus:border-transparent transition duration-200"
      />
    </div>
  );
};
