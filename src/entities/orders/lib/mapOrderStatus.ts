export type NumericStatus = 1 | 2 | 3 | 4;
export type StringStatus =
  | "pending"
  | "confirmed"
  | "in_transit"
  | "delivered"
  | "cancelled";

export const mapStatusToString = (status: NumericStatus): StringStatus => {
  const statusMap: Record<NumericStatus, StringStatus> = {
    1: "pending",
    2: "confirmed",
    3: "cancelled",
    4: "delivered",
  };
  return statusMap[status] || "pending";
};

export const mapStatusToNumber = (status: StringStatus): NumericStatus => {
  const statusMap: Record<StringStatus, NumericStatus> = {
    pending: 1,
    confirmed: 2,
    cancelled: 3,
    delivered: 4,
    in_transit: 2,
  };
  return statusMap[status] || 1;
};
