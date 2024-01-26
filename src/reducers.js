const initialState = {
    orders: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PLACE_ORDER':
        return {
          ...state,
          orders: [...state.orders, { ...action.payload, stage: 'Order Placed', timeSpent: 0, id: state.orders.length + 1 }],
        };
      case 'MOVE_ORDER':
        return {
          ...state,
          orders: state.orders.map((order) => {
            if (order.id === action.payload.orderId) {
              const nextStage = action.payload.stage === 'Next' ? getNextStage(order.stage) : action.payload.stage;
              return { ...order, stage: nextStage, timeSpent: order.timeSpent + 3 };
            }
            return order;
          }),
        };
      default:
        return state;
    }
  };
  
  const getNextStage = (currentStage) => {
    switch (currentStage) {
      case 'Order Placed':
        return 'Order in Making';
      case 'Order in Making':
        return 'Order Ready';
      default:
        return currentStage;
    }
  };
  
  export default rootReducer;
  