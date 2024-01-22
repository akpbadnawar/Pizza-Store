import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  updateOrderTimestamps,
  onCompleteOrder,
} from "../features/pizza/pizzaSlice";

const Timer = (props) => {
  const { order } = props;
  const { id, stage } = order;
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stageTime, setStageTime] = useState(0)

  let intervalRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (stage > 0) {
      dispatch(
        updateOrderTimestamps({
          orderId: id,
          timestamp: elapsedTime - stageTime,
          stage: stage,
        })
      );
    }

    setStageTime(elapsedTime)

    if (stage === 4) {
      clearInterval(intervalRef.current);
      dispatch(onCompleteOrder(order));
    }
  }, [stage]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <p>Elapsed Time: {formatTime(elapsedTime)}</p>
    </div>
  );
};

export default Timer;
