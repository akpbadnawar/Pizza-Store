// src/components/PizzaForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {placeOrder} from '../features/pizza/pizzaSlice'

const PizzaForm = ({ onPlaceOrder }) => {
  const [order, setOrder] = useState({
    type: 'Veg',
    size: 'Large',
    base: 'Thick',
  });
  const [orderId, setOrderId] = useState(1)

  const dispatch = useDispatch()

  const handlePlaceOrder = () => {
    const makingTime = order.size === 'Small' ? 180 : (order.size === 'Medium' ? 240 : 300);
    const timestamp = Date.now();


    dispatch(placeOrder({
      ...order,
      id: orderId,
      stage: 0,
      timestamp,
      timestamps: [],
      makingTime,
      timeInCurrentStage: 0, // Initialize timeInCurrentStage property
    }));
    setOrder({
      type: 'Veg',
      size: 'Large',
      base: 'Thick',
    });
    setOrderId(orderId+1)
  };  

  return (
    <div>
    <h2 className="text-3xl text-inherit text-sky-400 mb-4 font-semibold text-gray-900 dark:text-white">Place Pizza Order</h2>
  
    <form>
      <label className="block mb-4">
        Type of Pizza
        <select
          value={order.type}
          onChange={(e) => setOrder({ ...order, type: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-black focus:border-black sm:text-sm text-black mx-auto" // Add text-black for blue text color
        >
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
      </label>
  
      <label className="block mb-4">
        Size
        <select
          value={order.size}
          onChange={(e) => setOrder({ ...order, size: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-black focus:border-black sm:text-sm text-black mx-auto" // Add text-black for blue text color
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </label>
  
      <label className="block mb-4">
        Type of base
        <select
          value={order.base}
          onChange={(e) => setOrder({ ...order, base: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-black focus:border-black sm:text-sm text-black" // Add text-black for blue text color
        >
          <option value="Thin">Thin</option>
          <option value="Thick">Thick</option>
        </select>
      </label>
  
      <button
        type="button"
        onClick={handlePlaceOrder}
        className="px-4 py-2 font-medium text-black bg-gray-400 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-black"
      >
        Place Order
      </button>
    </form>
  </div>
  
  );
};

export default PizzaForm;
