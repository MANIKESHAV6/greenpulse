// Format amount in Indian Rupees (INR)
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to ensure amount is treated as INR
export const convertToINR = (amount: number): number => {
  return amount;
}; 