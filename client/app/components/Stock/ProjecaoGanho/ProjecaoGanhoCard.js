import Typography from "@material-ui/core/Typography";
import React from "react";
function ProjecaoGanhoCard(props) {
  console.log(props.data);

  return (
    <div>
      <Typography>Você ira lucrar: </Typography>
      <Typography component="p" variant="h4">
        {props.data.capitalGains}
      </Typography>
      <Typography color="textSecondary" style={{ flex: 1 }}>
        Comprando: {props.data.name}
      </Typography>
      <Typography color="textSecondary" style={{ flex: 1 }}>
        on {props.data.purchasedAt}
      </Typography>
      <Typography color="textSecondary" style={{ flex: 1 }}>
        Last Price: {props.data.lastPrice}
      </Typography>
      <Typography color="textSecondary" style={{ flex: 1 }}>
        Preço Na Data De Compra: {props.data.priceAtDate}
      </Typography>
      <Typography color="textSecondary" style={{ flex: 1 }}></Typography>
    </div>
  );
}

export default ProjecaoGanhoCard;
