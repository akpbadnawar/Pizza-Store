import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  cancelOrder,
  moveToNextStage,
} from "../features/pizza/pizzaSlice";
import Timer from "./Timer"; // Assuming Timer is a separate component

const PizzaCard = ({ order, isCompleted = false }) => {
  const dispatch = useDispatch();

  const { id, stage, timestamps, size } = order;

  const handleCancelOrder = () => {
    dispatch(cancelOrder(id));
  };

  const handleMoveToNextStage = () => {
    dispatch(moveToNextStage(id));
  };

  return (
    <div className="bg-gradient-to-r from-gray-400 to-gray-800 text-gray-900 p-4 rounded-md shadow-md mb-4 mr-4 flex-wrap ml-10">
      <p className="text-lg font-semibold mb-2 ">
        Order Id: {id} | Stage: {stage}
      </p>

      {!isCompleted && <Timer order={order} />}

      {timestamps.map((timestamp, index) => {
        let maximumMakingTime = size.toLowerCase() === "large" ? 300 : size.toLowerCase() === "medium" ? 240 : 180
        let isDelayedOrder = timestamp.timestamp > maximumMakingTime

        return (
          <div key={index} className="mt-2">
            <p className={isDelayedOrder ? "text-sm text-red-300" : "text-sm text-white"}>
              Stage: {timestamp.stage} | Time: {timestamp.timestamp} sec
            </p>
          </div>
        );
      })}

      {(stage < 4 || !isCompleted) && (
        <div className="mt-4 space-x-2">
          <button
            onClick={handleMoveToNextStage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mb-4 flex"
          >
            Move to Next Stage
          </button>
          <button
            onClick={handleCancelOrder}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          >
            Cancel Order
          </button>
        </div>
      )}
    </div>
  );
};

export default PizzaCard;
