import React, { useState } from "react";
import api from "../../../services/api";
import ButtonForm from "../../inputs/Button/Button";
import TextFieldForm from "../../inputs/TextField/TextFieldForm";
import CompareGrafico from "./CompareGrafico";

function CompareAcoes() {
  const [Value, setValue] = useState("MSFT");
  const [DataStock, setDataStock] = useState([]);
  const [Name, setName] = useState("IBM");
  //127.0.0.1:3002/stocks/MSFT,IBM/compare
  function handleChange(e) {
    const value = e.target.value.toUpperCase();
    setValue(value);
  }
  function onChangeSymbol(e) {
    const symbol = e.target.value.toUpperCase();
    setName(symbol);
  }
  function handleSubmit(e) {
    e.preventDefault();
    api
      .get("stocks/" + Value + "," + Name + "/compare")
      .then((response) => {
        const data = response.data.lastPrices;
        setDataStock([data]);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  return (
    <div>
      <h3>Comparar Ações: </h3>
      <form onSubmit={handleSubmit}>
        <TextFieldForm
          handleChange={handleChange}
          label={"Symbol"}
          styling={{ width: 80 }}
        />
        <TextFieldForm
          handleChange={onChangeSymbol}
          label={"Symbol"}
          styling={{ width: 80, margin: 20 }}
        />
        <ButtonForm />
      </form>
      {DataStock.map((elements) => (
        <CompareGrafico data={elements} />
      ))}
    </div>
  );
}

export default CompareAcoes;
