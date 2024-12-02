import { useAppDispatch } from "../../app/store/store";
import { selectUsersSort } from "../../widgets/tool-bar/model/toolBarSlice";

const SelectUsersSort: React.FC = () => {
  const dispatch = useAppDispatch();

  interface Option {
    value: string;
    label: string;
    type: string;
  }

  const options: Option[] = [
    { value: "true", label: "За алфавітом ↑", type: "name" },
    { value: "false", label: "За алфавітом ↓", type: "name" },
    { value: "true", label: "За часом ↑", type: "date" },
    { value: "false", label: "За часом ↓", type: "date" },
  ];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedOption = e.target.selectedOptions[0];
    const selectedType = selectedOption.getAttribute("data-type");

    dispatch(selectUsersSort({ selectedValue, selectedType }));
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

export default SelectUsersSort;
