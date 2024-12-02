import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../shared/api/supabase";
import { Order, ServerOrder, ServerProduct, Product } from "../model/types";

const mapServerProductToProduct = (product: ServerProduct): Product => ({
  ...product,
  name: product.title,
  quantity: product.amount,
  image: product.imageUrl,
});

export const fetchOrderById = createAsyncThunk(
  "order/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (!data) {
        throw new Error("Замовлення не знайдено");
      }

      const serverOrder = data as ServerOrder;

      const order: Order = {
        ...serverOrder,
        customerName:
          serverOrder.contact.firstName + " " + serverOrder.contact.lastName,
        phone: serverOrder.contact.phone,
        email: serverOrder.contact.email,
        paymentMethod: "Оплата при отриманні", //Затичка
        orderNumber: String(serverOrder.id),
        orderDate: serverOrder.created_at,
        deliveryMethod: serverOrder.method,
        shippingCost: parseFloat(serverOrder.deliveryCost),
        isPaid: false,
        products: serverOrder.products.map(mapServerProductToProduct),
      };

      return order;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Невідома помилка при отриманні замовлення");
    }
  }
);
