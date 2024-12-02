import supabaseClient from "../../../shared/supabase-client/api/supabaseClient";

export const deleteProduct = async (id: number) => {
  try {
    const { data, error } = await supabaseClient
      .from("shopItems")
      .delete()
      .eq("id", id);

    if (error) {
      return error;
    }

    return data || [];
  } catch (err: any) {
    return err;
  }
};

export default deleteProduct;
