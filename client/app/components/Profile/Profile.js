import { Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import CompareAcoes from "../Stock/CompareAcoes.js/CompareAcoes";
import HistoricoAcoes from "../Stock/HistoricoAcoes/HistoricoAcoes";
import IncluirAcoes from "../Stock/IncluirAcoes/IncluirAcoes";
import ProjecaoGanho from "../Stock/ProjecaoGanho/ProjecaoGanho";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 240,
  },
}));
const Profile = () => {
  const classes = useStyles();
  const fixedHeightPaper = classes.paper;

  return (
    <div>
      <div>
        <Container maxWidth="lg" style={{ paddingTop: 32, paddingBottom: 32 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                variant="outlined"
                className={fixedHeightPaper}
                style={{ height: "100%" }}
              >
                <IncluirAcoes />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                variant="outlined"
                className={fixedHeightPaper}
                style={{ height: "100%" }}
              >
                <HistoricoAcoes />
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={4}>
              <Paper
                variant="outlined"
                className={fixedHeightPaper}
                style={{ height: "90%", marginTop: 40 }}
              >
                <CompareAcoes />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <Paper
                variant="outlined"
                className={fixedHeightPaper}
                style={{ height: "90%", marginTop: 40 }}
              >
                <ProjecaoGanho />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Profile;
