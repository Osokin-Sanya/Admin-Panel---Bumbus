import supabaseClient from "../../shared/supabase-client/api/supabaseClient";

export const updateOrderStatus = async (orderId: number, status: number) => {
  try {
    const { data, error } = await supabaseClient
      .from("orders")
      .upsert({ id: orderId, status: status });
    if (error) {
      return console.log(error);
    }

    return data || [];
  } catch (err: any) {
    return console.log(err);
  }
};
