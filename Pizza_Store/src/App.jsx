// src/App.js
import React from "react";
import PizzaForm from "./component/PizzaForm";
import MainDisplay from "./component/MainDisplay";

const App = () => {


  return (
    <>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PizzaForm />
      </div>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MainDisplay />
      </div>
    </>
  );
};

export default App;
