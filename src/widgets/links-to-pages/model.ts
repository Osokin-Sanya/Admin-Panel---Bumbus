interface Link {
  to: string;
  text: string;
}

export const links: Link[] = [
  {
    to: "/users",
    text: "Клієнти",
  },
  {
    to: "/orders",
    text: "Замовлення",
  },
  {
    to: "/warehouse",
    text: "Склад",
  },
];

export const TitleLinks = {
  "/home": "Головна",
  "/orders": "Замовлення",
  "/warehouse": "Склад",
  "/users": "Клієнти",
};
