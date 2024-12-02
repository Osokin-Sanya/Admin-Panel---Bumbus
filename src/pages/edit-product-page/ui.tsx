import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchProduct from "../../entities/product/api/fetchProduct";
import createProduct from "../../entities/product/api/createProduct";
import updateProduct from "../../entities/product/api/updateProduct";
import { useAppDispatch } from "../../app/store/store";

interface ValidationErrors {
  title?: string;
  price?: string;
  description?: string;
  brand?: string;
  amount?: string;
  imageFile?: string;
}

const EditProductPage = () => {
  const navigate = useNavigate();
  const brandsList = ["Nike", "Adidas", "Puma", "New Balance", "Converse"];
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      setValidationErrors({ ...validationErrors, imageFile: undefined });
    }
  };

  const { id: idProduct } = useParams<{ id: string | undefined }>();
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    imageUrl: "",
    brand: "",
    amount: 0,
  });

  const fetchData = async () => {
    try {
      const [item] = await fetchProduct(idProduct);
      setProduct(item);
    } catch (error) {
      setError("Помилка при завантаженні продукту");
    }
  };

  useEffect(() => {
    if (idProduct) {
      fetchData();
    }
  }, [idProduct]);

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!product.title.trim()) {
      errors.title = "Назва товару обов'язкова";
    }

    if (product.price <= 0) {
      errors.price = "Ціна повинна бути більше 0";
    }

    if (!product.description.trim()) {
      errors.description = "Опис товару обов'язковий";
    }

    if (!product.brand) {
      errors.brand = "Виберіть бренд";
    }

    if (product.amount < 0) {
      errors.amount = "Кількість не може бути від'ємною";
    }

    if (!idProduct && !imageFile) {
      errors.imageFile = "Додайте зображення товару";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setValidationErrors({ ...validationErrors, [name]: undefined });
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError(null);
      await updateProduct(idProduct, product);
      navigate("/warehouse");
    } catch (error) {
      setError("Помилка при оновленні продукту");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError(null);
      if (imageFile) {
        await createProduct(product, imageFile);
        navigate("/warehouse");
      }
    } catch (error) {
      setError("Помилка при створенні продукту");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {idProduct ? (
        <h1 className="text-2xl font-bold mb-4">Редагувати продукт</h1>
      ) : (
        <h1 className="text-2xl font-bold mb-4">Створити продукт</h1>
      )}

      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg mx-auto">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Назва</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            className={`border rounded w-full px-4 py-2 mt-1 ${
              validationErrors.title ? "border-red-500" : ""
            }`}
            placeholder="Назва товару"
          />
          {validationErrors.title && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.title}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Ціна</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className={`border rounded w-full px-4 py-2 mt-1 ${
              validationErrors.price ? "border-red-500" : ""
            }`}
            placeholder="Ціна товару"
          />
          {validationErrors.price && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.price}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Опис</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className={`border rounded w-full px-4 py-2 mt-1 ${
              validationErrors.description ? "border-red-500" : ""
            }`}
            placeholder="Опис товару"
            rows={3}
          ></textarea>
          {validationErrors.description && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.description}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">URL зображення</label>
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            className="border rounded w-full px-4 py-2 mt-1"
            placeholder="URL зображення товару"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Зображення товару</label>
          <input
            type="file"
            onChange={handleFileChange}
            className={validationErrors.imageFile ? "border-red-500" : ""}
          />
          {validationErrors.imageFile && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.imageFile}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Кількість</label>
          <input
            type="number"
            name="amount"
            value={product.amount}
            onChange={handleChange}
            className={`border rounded w-full px-4 py-2 mt-1 ${
              validationErrors.amount ? "border-red-500" : ""
            }`}
            placeholder="Кількість товару"
          />
          {validationErrors.amount && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.amount}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Бренд</label>
          <select
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className={`border rounded w-full px-4 py-2 mt-1 ${
              validationErrors.brand ? "border-red-500" : ""
            }`}
          >
            <option value="">Виберіть бренд</option>
            {brandsList.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          {validationErrors.brand && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.brand}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => navigate("/warehouse")}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            disabled={isLoading}
          >
            Скасувати
          </button>
          <button
            onClick={idProduct ? handleSave : handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Збереження..." : idProduct ? "Зберегти" : "Створити"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
