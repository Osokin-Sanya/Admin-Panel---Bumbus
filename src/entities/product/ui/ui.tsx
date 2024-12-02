import { FC } from "react";
import { useNavigate } from "react-router-dom";
import deleteProduct from "../api/deleteProduct";
import { useAppDispatch } from "../../../app/store/store";
import { fetchProducts } from "../api/fetchProductsThunks";

interface Props {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
  description: string;
  brand: string;
  amount: number;
}

const Product: FC<Props> = ({
  id,
  title,
  price,
  brand,
  description,
  imageUrl,
  amount,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEdit = (id: number) => {
    navigate(`/warehouse/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);

      dispatch(
        fetchProducts({
          searchProductQuery: "",
          filter: { minPrice: 0, maxPrice: null },
          sort: {
            sortBrand: "",
            sortStandart: {
              field: "price",
              direction: "asc",
            },
          },
        })
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <tr
        key={id}
        className="border-b bg-gray-50 hover:bg-gray-100 transition duration-200"
      >
        <td className="p-4 text-gray-700 font-medium text-left">{id}</td>
        <td className="p-4">
          <img
            src={imageUrl}
            alt={title}
            className="w-16 h-16 object-cover rounded-md shadow-md"
          />
        </td>
        <td className="p-4 text-gray-700 font-medium text-left">{title}</td>
        <td className="p-4 text-gray-700 font-medium text-left">{price}</td>
        <td className="p-4 text-gray-700 font-medium text-left">{brand}</td>
        <td className="p-4 text-gray-600 text-left">{description}</td>
        <td className="p-4 text-gray-600 text-left">{amount}</td>
        <td className="p-4 text-left">
          <button
            className="text-blue-600 hover:text-blue-800 hover:underline font-semibold mr-4 transition duration-200"
            onClick={() => handleEdit(id)}
          >
            Змінити
          </button>
          <button
            className="text-red-600 hover:text-red-800 hover:underline font-semibold transition duration-200"
            onClick={() => handleDelete(id)}
          >
            Видалити
          </button>
        </td>
      </tr>
    </>
  );
};

export default Product;
