// components/PizzaProgress.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveOrder } from '../actions';

const PizzaProgress = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const handleMoveOrder = (orderId, stage) => {
    dispatch(moveOrder(orderId, stage));
  };

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className={`pizza-card ${order.stage === 'Order Ready' ? 'order-ready' : ''}`}>
          <p>Order ID: {order.id}</p>
          <p>Type: {order.type}</p>
          <p>Size: {order.size}</p>
          <p>Base: {order.base}</p>
          <p>Stage: {order.stage}</p>
          <p>Time Spent: {order.timeSpent} min</p>
          <button onClick={() => handleMoveOrder(order.id, 'Next')}>Next</button>
          <button onClick={() => handleMoveOrder(order.id, 'Picked')}>Picked</button>
          <button onClick={() => handleMoveOrder(order.id, 'Cancel')}>Cancel</button>
        </div>
      ))}
    </div>
  );
};

export default PizzaProgress;
