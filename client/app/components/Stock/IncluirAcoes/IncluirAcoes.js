import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useState } from "react";
import api from "../../../services/api";
import Button from "../../inputs/Button/Button";
import TextFieldForm from "../../inputs/TextField/TextFieldForm";
import AcoesInseridas from "./AcoesInseridas";

const IncluirAcoes = () => {
  const [value, setValue] = useState("");

  const [dataStock, setDataStock] = useState([]);
  /*this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);*/

  function handleChange(e) {
    const name = e.target.value.toUpperCase();
    setValue({ value: name });
  }
  function handleSubmit(e) {
    e.preventDefault();

    api
      .get("stocks/" + value.value + "/quote")
      .then((response) => {
        const data = response.data.pricedAt;
        const name = response.data.name;
        const lastPrice = response.data.lastPrice;
        setDataStock([...dataStock, { name, data, lastPrice }]);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4> Verificar ações:</h4>
        <TextFieldForm
          handleChange={handleChange}
          styling={{ width: "50%" }}
          label={"Add Symbol"}
        />
        <Button></Button>
        <hr />
      </form>
      <div style={{ maxWidth: "50%" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataStock.map((elementos) => (
              <AcoesInseridas data={elementos} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IncluirAcoes;
