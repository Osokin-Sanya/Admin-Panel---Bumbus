import supabaseClient from "../../../shared/supabase-client/api/supabaseClient";

interface Product {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  brand: string;
  amount: number;
}

export const updateProduct = async (
  id: string | undefined,
  product: Product
) => {
  const { title, price, description, imageUrl, brand, amount } = product;
  try {
    const { data, error } = await supabaseClient
      .from("shopItems")
      .upsert({ id: id, title, price, description, imageUrl, brand, amount });

    if (error) {
      return error;
    }

    return data || [];
  } catch (err: any) {
    return err;
  }
};

export default updateProduct;
