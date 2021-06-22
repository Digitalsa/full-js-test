import TextField from "@material-ui/core/TextField";
import React from "react";

function TextFieldForm(props) {
  const handleChange = props.handleChange;
  return (
    <TextField
      id="filled-size-small"
      label={props.label}
      variant="filled"
      size="small"
      style={{ width: props.styling.width, marginLeft: props.styling.margin }}
      onChange={handleChange}
    />
  );
}

export default TextFieldForm;
