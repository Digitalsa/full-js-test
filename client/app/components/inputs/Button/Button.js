import { Button } from "@material-ui/core";
import React from "react";

function ButtonForm() {
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      style={{ top: 6, left: 10 }}
    >
      SUBMIT
    </Button>
  );
}

export default ButtonForm;
