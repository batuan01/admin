export const CATEGORY_STATUS = [
  {
    value: 1,
    label: "Active",
  },
  {
    value: 0,
    label: "Inactive",
  },
];

export const ORDER_STATUS = [
  { value: 1, label: "Wait for pay", color: "#FFA500" },
  { value: 2, label: "Transport", color: "#008000" },
  { value: 3, label: "Waiting for delivery", color: "#0000FF" },
  { value: 4, label: "Complete", color: "#800080" },
  { value: 5, label: "Cancelled", color: "#FF0000" },
];

export const PAYMENT_STATUS = [
  { value: 1, label: "Payment on delivery", color: "#76885B" },
  { value: 2, label: "Pay with VNPAY", color: "#912BBC" },
];

export const ReasonForCancellation = [
  { name: "Failure to receive the product within the promised time" },
  { name: "Product does not match the description" },
  { name: "Product received in damaged condition" },
  { name: "Received wrong product" },
  { name: "Product quality is not as expected" },
  { name: "Product price is higher than expected" },
  { name: "Changed my mind" },
  { name: "Issues with the payment method" },
  { name: "Others" },
];