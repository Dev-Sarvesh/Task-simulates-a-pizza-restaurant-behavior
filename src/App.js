import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import PizzaOrderForm from './components/PizzaOrderForm';
import PizzaProgress from './components/PizzaProgress';

const App = () => {
  return (
    <Provider store={store}>
      <div className="app-container">
        <div className="app-section">
          <h2>Pizza Shop</h2>
          <PizzaOrderForm />
        </div>
        <div className="app-section">
          <h2>Pizza Progress</h2>
          <PizzaProgress />
        </div>
      </div>
    </Provider>
  );
};

export default App;
