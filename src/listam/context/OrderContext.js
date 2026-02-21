import { createContext, useContext, useReducer } from 'react';

const initialState = {
  inputText: '',
  detectedItems: [],   // [{ ...item, qty }]
  hands: 1,
  baseTime: 120,       // minutes
  screenshotFile: null,
  transferConfirmed: false,
};

function orderReducer(state, action) {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, inputText: action.payload };
    case 'SET_DETECTED_ITEMS':
      return { ...state, detectedItems: action.payload };
    case 'UPDATE_QTY': {
      const items = state.detectedItems.map(item =>
        item.id === action.payload.id ? { ...item, qty: action.payload.qty } : item
      );
      return { ...state, detectedItems: items };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        detectedItems: state.detectedItems.filter(item => item.id !== action.payload),
      };
    case 'SET_HANDS':
      return { ...state, hands: action.payload };
    case 'SET_SCREENSHOT':
      return { ...state, screenshotFile: action.payload };
    case 'SET_TRANSFER_CONFIRMED':
      return { ...state, transferConfirmed: action.payload };
    case 'REORDER':
      return {
        ...initialState,
        inputText: action.payload.inputText,
        detectedItems: action.payload.items,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used within OrderProvider');
  return ctx;
}

/* Derived helpers */
export function calcExtraHands(hands, baseTime) {
  if (hands === 1) return { eta: baseTime, fee: 0 };
  if (hands === 2) return { eta: Math.round(baseTime * 0.5 + 15), fee: 1500 };
  if (hands === 3) return { eta: Math.round(baseTime * 0.33 + 10), fee: 3000 };
  return { eta: baseTime, fee: 0 };
}

export function calcItemsTotal(items) {
  return items.reduce((sum, item) => sum + item.qty * item.pricePerUnit, 0);
}
