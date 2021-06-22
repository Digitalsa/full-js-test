import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'regenerator-runtime/runtime'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

/** Pag */
import CurrentSituation from './views/current-situation'
import HistoryStocks from './views/history-stocks'

ReactDOM.render(
  <BrowserRouter>

    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/cotacao_recente" component={CurrentSituation} />
      <Route exact path="/historico_preco" component={HistoryStocks} />
    </Switch>
  </BrowserRouter>
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
