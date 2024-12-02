import { NumericStatus } from "../lib/mapOrderStatus";

export interface ServerProduct {
  id: number;
  brand: string;
  price: number;
  title: string;
  amount: number;
  imageUrl: string;
}

export interface ServerOrder {
  id: number;
  created_at: string;
  products: ServerProduct[];
  method: string;
  comment: string;
  user: string;
  status: NumericStatus;
  address: DeliveryAddress;
  contact: Contact;
  cityRef: string;
  deliveryCost: string;
  totalPrice: number;
  methodDeliveryCode: number;
}

export interface Product extends ServerProduct {
  name: string;
  quantity: number;
  image: string;
}

export interface Contact {
  email: string;
  phone: string;
  lastName: string;
  firstName: string;
}

export interface DeliveryAddress {
  address: {
    city: string;
    region: string;
  };
  courierAddress?: {
    street: string;
    house: string;
    apartment: string;
    floor: string;
    cargoElevator: "yes" | "no";
  };
  selfPickupPostomat: string;
  selfPickupNovaPoshta: string;
}

export interface Order extends Omit<ServerOrder, "products"> {
  products: Product[];
  customerName: string;
  phone: string;
  email: string;
  paymentMethod: string;
  orderNumber: string;
  orderDate: string;
  deliveryMethod: string;
  estimatedDelivery?: string;
  shippingCost: number;
  isPaid: boolean;
}
