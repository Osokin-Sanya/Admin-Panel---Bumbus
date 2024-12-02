import supabaseClient from "../../../shared/supabase-client/api/supabaseClient";
import handleUpload from "./uploadImage";

interface ProductData {
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  brand: string;
  amount: number;
}

export const createProduct = async (
  productData: ProductData,
  imageFile: File
) => {
  try {
    let imageUrl = null;

    if (imageFile) {
      imageUrl =
        "https://jlfspvmmitgyiuzekkas.supabase.co/storage/v1/object/public/images/" +
        (await handleUpload(imageFile));
    }

    const { data, error } = await supabaseClient.from("shopItems").insert([
      {
        ...productData,
        imageUrl,
      },
    ]);

    if (error) {
      return error;
    }

    return data || [];
  } catch (err: any) {
    return err;
  }
};

export default createProduct;
