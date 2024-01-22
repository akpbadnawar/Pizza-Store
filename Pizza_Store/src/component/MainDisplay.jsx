import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PizzaCard from "./PizzaCard";

const MainDisplay = () => {
  const orders = useSelector((state) => state.pizza.orders);
  const completedOrders = useSelector((state) => state.pizza.completedOrders);


  return (
    <div className="flex flex-wrap text-center">
      <h2 className="w-full text-center">Main Display</h2>
      <div className="w-full">
        <h3>Orders in Progress</h3>
        <div className="flex flex-wrap">
          {orders.map((order) => (
            <PizzaCard key={order.id} order={order}  />
          ))}
        </div>
      </div>
      <div className="w-full">
        <h3>Total Pizza Delivered Today: {completedOrders.length}</h3>
      </div>
      <h3 className="w-full mt-8">Completed Orders</h3>

      <br/>
      <div className="flex flex-wrap ">
        {completedOrders.map((item)=>(
          <PizzaCard key={item.id} order={item} isCompleted/>
        ))}
      </div>
    </div>
  );
};

export default MainDisplay;
