import { createAsyncThunk } from "@reduxjs/toolkit";
import supabaseClient from "../../shared/supabase-client/api/supabaseClient";

export const fetchOrdersSearch = createAsyncThunk(
  "orders/fetchOrders",
  async (
    filters: {
      searchQuery: string;
      selectedStatus: number | string;
      filter: any;
    },
    thunkAPI
  ) => {
    const { brands, customerName, deliveryMethod, maxPrice, minPrice, status } =
      filters.filter;
    const brandsQuery =
      brands.length > 0
        ? brands
        : ["Nike", "Adidas", "Puma", "Reebok", "Converse", "New Balance "];

    try {
      let query = supabaseClient.rpc("search_orders333", {
        search_query: filters.searchQuery,
        selected_status: filters.selectedStatus.toString(),
        min_price: minPrice || 0,
        max_price: maxPrice || 100000,
        brands: brandsQuery,
      });

      console.log(deliveryMethod);

      if (Number(deliveryMethod) !== 0 && deliveryMethod !== undefined) {
        query = query.eq("methodDeliveryCode", Number(deliveryMethod));
      }

      if (Number(status) !== 0) {
        query = query.eq("status", Number(status));
      }

      const { data, error } = await query;

      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return data || [];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(`Error: ${err.message}`);
    }
  }
);

// CREATE OR REPLACE FUNCTION search_orders(search_query text, selected_status text)
// RETURNS SETOF orders AS $$
// BEGIN
//   RETURN QUERY
//   SELECT *
//   FROM orders
//   WHERE
//     -- Поиск по id, если search_query - это число
//     (search_query ~ '^[0-9]+$' AND id = search_query::bigint)
//     OR
//     -- Поиск по title в массиве products
//     EXISTS (
//       SELECT 1
//       FROM jsonb_array_elements(products) AS product
//       WHERE product->>'title' ILIKE '%' || search_query || '%'
//     )
//     OR
//     -- Поиск по полям внутри contact
//     (contact->>'email' ILIKE '%' || search_query || '%'
//     OR contact->>'phone' ILIKE '%' || search_query || '%'
//     OR contact->>'lastName' ILIKE '%' || search_query || '%'
//     OR contact->>'firstName' ILIKE '%' || search_query || '%')
//     OR
//     -- Поиск по полям внутри address
//     (address->'address'->>'city' ILIKE '%' || search_query || '%'
//     OR address->'address'->>'region' ILIKE '%' || search_query || '%'
//     OR address->>'selfPickupPostomat' ILIKE '%' || search_query || '%'
//     OR address->>'selfPickupNovaPoshta' ILIKE '%' || search_query || '%')
//   ORDER BY
//     CASE
//       -- Приведение selected_status к типу numeric для корректного сравнения
//       WHEN status = CAST(selected_status AS numeric) THEN 0
//       ELSE 1
//     END,
//     -- Далее сортировка по статусам
//     CASE status
//       WHEN 1 THEN 1
//       WHEN 2 THEN 2
//       WHEN 3 THEN 3
//       WHEN 4 THEN 4
//       WHEN 5 THEN 5
//       ELSE 6
//     END;
// END;
// $$ LANGUAGE plpgsql;

////////////////////////////////////////////////////////////////////////

// CREATE OR REPLACE FUNCTION search_orders12(
//   search_query text,
//   selected_status text,
//   min_price numeric,
//   max_price numeric
// )
// RETURNS SETOF orders AS $$
// BEGIN
//   RETURN QUERY
//   SELECT *
//   FROM orders
//   WHERE
//     (
//       -- Поиск по id, если search_query - это число
//       (search_query ~ '^[0-9]+$' AND id = search_query::bigint)
//       OR
//       -- Поиск по title в массиве products
//       EXISTS (
//         SELECT 1
//         FROM jsonb_array_elements(products) AS product
//         WHERE product->>'title' ILIKE '%' || search_query || '%'
//       )
//       OR
//       -- Поиск по полям внутри contact
//       (contact->>'email' ILIKE '%' || search_query || '%'
//       OR contact->>'phone' ILIKE '%' || search_query || '%'
//       OR contact->>'lastName' ILIKE '%' || search_query || '%'
//       OR contact->>'firstName' ILIKE '%' || search_query || '%')
//       OR
//       -- Поиск по полям внутри address
//       (address->'address'->>'city' ILIKE '%' || search_query || '%'
//       OR address->'address'->>'region' ILIKE '%' || search_query || '%'
//       OR address->>'selfPickupPostomat' ILIKE '%' || search_query || '%'
//       OR address->>'selfPickupNovaPoshta' ILIKE '%' || search_query || '%')
//     )
//     AND
//     -- Фильтрация по колонке total_price (проверка на null)
//     total_price IS NOT NULL
//     AND total_price BETWEEN min_price AND max_price
//   ORDER BY
//     CASE
//       WHEN status = CAST(selected_status AS numeric) THEN 0
//       ELSE 1
//     END,
//     CASE status
//       WHEN 1 THEN 1
//       WHEN 2 THEN 2
//       WHEN 3 THEN 3
//       WHEN 4 THEN 4
//       WHEN 5 THEN 5
//       ELSE 6
//     END;
// END;
// $$ LANGUAGE plpgsql;

//////////

// CREATE OR REPLACE FUNCTION search_orders333(
//   search_query text,
//   selected_status text,
//   min_price numeric,
//   max_price numeric
// )
// RETURNS SETOF orders AS $$
// BEGIN
//   RETURN QUERY
//   SELECT *
//   FROM orders
//   WHERE
//     -- Фильтрация по диапазону цен
//     "totalPrice" IS NOT NULL
//     AND "totalPrice" BETWEEN min_price AND max_price

//     AND (
//       -- Поиск по id, если search_query - это число
//       (search_query ~ '^[0-9]+$' AND id = search_query::bigint)
//       OR
//       -- Поиск по title в массиве products
//       EXISTS (
//         SELECT 1
//         FROM jsonb_array_elements(products) AS product
//         WHERE product->>'title' ILIKE '%' || search_query || '%'
//       )
//       OR
//       -- Поиск по полям внутри contact
//       (contact->>'email' ILIKE '%' || search_query || '%'
//       OR contact->>'phone' ILIKE '%' || search_query || '%'
//       OR contact->>'lastName' ILIKE '%' || search_query || '%'
//       OR contact->>'firstName' ILIKE '%' || search_query || '%')
//       OR
//       -- Поиск по полям внутри address
//       (address->'address'->>'city' ILIKE '%' || search_query || '%'
//       OR address->'address'->>'region' ILIKE '%' || search_query || '%'
//       OR address->>'selfPickupPostomat' ILIKE '%' || search_query || '%'
//       OR address->>'selfPickupNovaPoshta' ILIKE '%' || search_query || '%')
//     )
//   ORDER BY
//     CASE
//       -- Приведение selected_status к типу numeric для корректного сравнения
//       WHEN status = CAST(selected_status AS numeric) THEN 0
//       ELSE 1
//     END,
//     CASE status
//       WHEN 1 THEN 1
//       WHEN 2 THEN 2
//       WHEN 3 THEN 3
//       WHEN 4 THEN 4
//       WHEN 5 THEN 5
//       ELSE 6
//     END;
// END;
// $$ LANGUAGE plpgsql;
