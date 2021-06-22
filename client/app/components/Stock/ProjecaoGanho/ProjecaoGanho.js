import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useState } from "react";
import ButtonForm from "../../inputs/Button/Button";
import TextFieldForm from "../../inputs/TextField/TextFieldForm";
import ProjecaoGanhoCard from "./ProjecaoGanhoCard";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

function ProjecaoGanho() {
  const classes = useStyles();
  const [PurchasedAmount, setPurchasedAmount] = useState(100);
  const [PurchasedAt, setPurchasedAt] = useState("2021-06-15");
  const [Symbol, setSymbol] = useState("MSFT");
  const [Compare, setCompare] = useState({});
  //127.0.0.1:3002/stocks/MSFT/gains?purchasedAmount=100&purchasedAt=2021-06-15
  function handleChange(e) {
    const name = e.target.value.toUpperCase();
    setSymbol(name);
  }
  function changePurchasedAt(e) {
    const date = e.target.value.toUpperCase();
    setPurchasedAt(date);
  }
  function changePurchasedAmount(e) {
    const amount = e.target.value;
    setPurchasedAmount(amount);
  }
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get(
        "stocks/" +
          Symbol +
          "/gains?purchasedAmount=" +
          PurchasedAmount +
          "&purchasedAt=" +
          PurchasedAt
      )
      .then((response) => {
        const compare = response.data;
        setCompare(compare);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }
  console.log(Compare);
  return (
    <div>
      <h3>Projeção de Ganho:</h3>
      <form onSubmit={handleSubmit}>
        <TextFieldForm
          handleChange={handleChange}
          label={"Symbol"}
          styling={{ width: 200, margin: 5 }}
        />
        <TextFieldForm
          handleChange={changePurchasedAt}
          label={"Data Da Compra"}
          styling={{ width: 200, margin: 5 }}
        />
        <TextFieldForm
          handleChange={changePurchasedAmount}
          label={"Quantidade de ações"}
          styling={{ width: 200, margin: 5 }}
        />
        <ButtonForm />
        <hr />
      </form>
      <div>
        <ProjecaoGanhoCard data={Compare} />
      </div>
    </div>
  );
}

export default ProjecaoGanho;
