import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder, moveOrder } from '../actions';

const PizzaOrderForm = () => {
  const [type, setType] = useState(null);
  const [size, setSize] = useState(null);
  const [base, setBase] = useState(null);

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const maxOrders = 10;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (orders.length >= maxOrders) {
      alert('Not taking any more orders for now. Please try again later.');
      return;
    }

    if (type !== null && size !== null && base !== null) {
      const newOrder = { id: orders.length + 1, type, size, base, timePlaced: 0 }; // Initialize timePlaced to 0
      dispatch(placeOrder(newOrder));
      setType(null);
      setSize(null);
      setBase(null);
    }
  };

  const handleNext = (orderId) => {
    dispatch(moveOrder(orderId));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(moveOrder());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Pizza Type:
          <select value={type || ''} onChange={(e) => setType(e.target.value)}>
            <option value="">Select</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </label>
        <label>
          Pizza Size:
          <select value={size || ''} onChange={(e) => setSize(e.target.value)}>
            <option value="">Select</option>
            <option value="Large">Large</option>
            <option value="Medium">Medium</option>
            <option value="Small">Small</option>
          </select>
        </label>
        <label>
          Pizza Base:
          <select value={base || ''} onChange={(e) => setBase(e.target.value)}>
            <option value="">Select</option>
            <option value="Thin">Thin</option>
            <option value="Thick">Thick</option>
          </select>
        </label>
        <button type="submit">Place Order</button>
      </form>
      {orders.length > 0 && (
        <div>
          <h3>All Placed Orders</h3>
          {orders.map((order) => (
            <div
              key={order.id}
              className={`order-card ${order.stage === 'in-progress' && order.timeSpentInCurrentStage > 180
                  ? 'overdue'
                  : ''
                }`}
            >
              <p>Order Number: {order.id}</p>
              <p>Type: {order.type}</p>
              <p>Size: {order.size}</p>
              <p>Base: {order.base}</p>
              <p>Time Placed: {order.timePlaced}</p>
              {order.stage === 'in-progress' && (
                <p>Time Elapsed: {formatTime(order.timeSpentInCurrentStage)}</p>
              )}
              <button onClick={() => handleNext(order.id)}>Next</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export default PizzaOrderForm;
