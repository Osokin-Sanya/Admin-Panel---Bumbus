export const prepareOrderData = (order: any) => {
  const {
    id,
    products,
    contact: { firstName, lastName, phone },
    status,
    created_at,
    totalPrice,
  } = order;

  const product = products[0];
  const numberItems = products.length;
  return {
    id,
    productTitle: product?.title,
    fullName: `${firstName} ${lastName}`,
    phone,
    status,
    created_at,
    totalPrice,
    numberItems,
  };
};
