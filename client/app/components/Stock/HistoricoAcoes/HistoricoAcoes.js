import axios from "axios";
import React, { useState } from "react";
import Button from "../../inputs/Button/Button";
import TextFieldForm from "../../inputs/TextField/TextFieldForm";
import HistoricoGrafico from "./HistoricoGrafico";

const HistoricoAcoes = () => {
  const [Value, setValue] = useState("");
  const [dataStock, setDataStock] = useState([]);
  const [Name, setName] = useState("");
  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");

  function handleChange(e) {
    const name = e.target.value.toUpperCase();
    setValue(name);
  }
  function changeFrom(e) {
    const date = e.target.value.toUpperCase();
    setFrom(date);
  }
  function changeTo(e) {
    const date = e.target.value;
    setTo(date);
  }
  function handleSubmit(e) {
    e.preventDefault();

    axios
      .get("stocks/" + Value + "/history?from=" + From + "&to=" + To)
      .then((response) => {
        const data = response.data.pricing;
        const name = response.data.name;
        setName(name);
        setDataStock([data]);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  const styling = {
    width: "150px",
    margin: "10px",
  };
  return (
    <React.Fragment>
      <div>
        <h4> Historico ações(bote a data no formato ano-mês-dia):</h4>
        <form onSubmit={handleSubmit}>
          <TextFieldForm
            handleChange={handleChange}
            label={"Symbol"}
            styling={styling}
          />
          <TextFieldForm
            handleChange={changeFrom}
            label={"from"}
            styling={styling}
          />
          <TextFieldForm
            handleChange={changeTo}
            label={"to "}
            styling={styling}
          />
          <Button />
        </form>
        <p>{Name}</p>
        {dataStock.map((elements) => (
          <HistoricoGrafico data={elements} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default HistoricoAcoes;
