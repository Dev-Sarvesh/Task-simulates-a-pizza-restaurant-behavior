export const placeOrder = (order) => ({
    type: 'PLACE_ORDER',
    payload: order,
  });
  
  export const moveOrder = (orderId, stage) => ({
    type: 'MOVE_ORDER',
    payload: { orderId, stage },
  });
  