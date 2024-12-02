import supabaseClient from "../../../shared/supabase-client/api/supabaseClient";

export const fetchProduct = async (id: string | undefined) => {
  try {
    const { data, error } = await supabaseClient
      .from("shopItems")
      .select("*")
      .eq("id", id);
    if (error) {
      return error;
    }

    return data || [];
  } catch (err: any) {
    return err;
  }
};

export default fetchProduct;
