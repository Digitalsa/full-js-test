import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import React from "react";
const Footer = () => (
  <footer style={{ position: "absolute", bottom: 0, width: "100%" }}>
    <Container>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/Saiiru">
          Sairu{" "}
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Box pt={4}></Box>
    </Container>
  </footer>
);

export default Footer;
