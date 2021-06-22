import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
function AcoesInseridas(props) {
  return (
    <TableRow>
      <TableCell> {props.data.name}</TableCell>
      <TableCell> {props.data.data}</TableCell>
      <TableCell>{props.data.lastPrice}</TableCell>
    </TableRow>
  );
}

export default AcoesInseridas;
