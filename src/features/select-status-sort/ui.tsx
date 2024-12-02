import { useAppDispatch } from "../../app/store/store";
import { selectStatus } from "../../widgets/tool-bar/model/toolBarSlice";

const SelectStatus: React.FC = () => {
  const dispatch = useAppDispatch();
  interface Option {
    value: string;
    label: string;
    type: string;
  }

  const options: Option[] = [
    { value: "1", label: "В обробці", type: "status" },
    { value: "2", label: "Відправлено", type: "status" },
    { value: "3", label: "Скасавано", type: "status" },
    { value: "4", label: "Отримано", type: "status" },
    { value: "5", label: "Невідомий", type: "status" },
  ];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    dispatch(selectStatus(selectedValue));
  };

  return (
    <div className="relative inline-block w-64">
      <select
        onChange={handleSelectChange}
        className="block w-full appearance-none bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500 transition duration-200 ease-in-out"
      >
        {options.map((option, id) => (
          <option key={id} value={option.value} data-type={option.type}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectStatus;
