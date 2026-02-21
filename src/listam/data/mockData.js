export const mockUser = {
  name: 'Amaka',
  phone: '+234 801 234 5678',
};

export const mockBankAccount = {
  bankName: 'Opay',
  accountNumber: '8012345678',
  accountName: 'Listam Markets Ltd',
};

export const mockOrderHistory = [
  {
    id: 'ORD-001',
    date: '2025-06-14',
    inputText: 'I need 4 tubers of yam, tomatoes, onions and beef',
    items: [
      { id: 'yam', name: 'Yam', emoji: '🍠', qty: 4, unit: 'tubers', pricePerUnit: 800 },
      { id: 'tomato', name: 'Tomatoes', emoji: '🍅', qty: 6, unit: 'pieces', pricePerUnit: 50 },
      { id: 'onion', name: 'Onions', emoji: '🧅', qty: 4, unit: 'pieces', pricePerUnit: 100 },
      { id: 'beef', name: 'Beef', emoji: '🥩', qty: 1, unit: 'kg', pricePerUnit: 3500 },
    ],
    hands: 1,
    totalFee: 700,
    errandFee: 0,
    status: 'delivered',
  },
  {
    id: 'ORD-002',
    date: '2025-06-07',
    inputText: 'rice, chicken, spinach and palm oil please',
    items: [
      { id: 'rice', name: 'Rice', emoji: '🍚', qty: 4, unit: 'cups', pricePerUnit: 200 },
      { id: 'chicken', name: 'Chicken', emoji: '🍗', qty: 2, unit: 'kg', pricePerUnit: 2800 },
      { id: 'spinach', name: 'Spinach', emoji: '🥬', qty: 2, unit: 'bunches', pricePerUnit: 200 },
      { id: 'palm_oil', name: 'Palm Oil', emoji: '🫙', qty: 1, unit: 'litres', pricePerUnit: 900 },
    ],
    hands: 2,
    totalFee: 8300,
    errandFee: 1500,
    status: 'delivered',
  },
  {
    id: 'ORD-003',
    date: '2025-05-30',
    inputText: '6 eggs, plantain, pepper and fish',
    items: [
      { id: 'egg', name: 'Eggs', emoji: '🥚', qty: 6, unit: 'pieces', pricePerUnit: 120 },
      { id: 'plantain', name: 'Plantain', emoji: '🍌', qty: 5, unit: 'fingers', pricePerUnit: 150 },
      { id: 'pepper', name: 'Pepper', emoji: '🌶️', qty: 5, unit: 'pieces', pricePerUnit: 50 },
      { id: 'fish', name: 'Fish', emoji: '🐟', qty: 3, unit: 'pieces', pricePerUnit: 1200 },
    ],
    hands: 1,
    totalFee: 5020,
    errandFee: 0,
    status: 'delivered',
  },
];
