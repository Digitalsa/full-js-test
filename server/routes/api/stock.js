const request = require("superagent");
const apiKey = "W4YQITDE789BY3ZL";

module.exports = (app) => {
  //https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=dW4YQITDE789BY3ZLmodule.exports = (app) => {
  app.get("/stocks/:stock_name?/quote", async (req, response, next) => {
    const active = req.params.stock_name;
    await request
      .get("https://www.alphavantage.co/query")
      .query({ function: "GLOBAL_QUOTE" })
      .query({ symbol: active })
      .query({ apikey: apiKey })
      .then((res) => {
        if (!res.body.Information) {
          const name = res.body["Global Quote"]["01. symbol"];
          const lastPrice = parseFloat(
            res.body["Global Quote"]["05. price"]
          ).toFixed(2);
          const pricedAt = res.body["Global Quote"]["07. latest trading day"];
          console.log("completed");
          response.send({
            name,
            lastPrice,
            pricedAt,
          });
        } else {
          response.send({
            response: res.body,
          });
        }
      });
  });
  //Retorna preço histórico da ação
  //https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=dW4YQITDE789BY3ZL  ///stocks/:stock_name/history?from=<string>&to=<string>
  app.get("/stocks/:stock_name/history", async (req, response, next) => {
    const active = req.params.stock_name;

    request
      .get("https://www.alphavantage.co/query")
      .query({ function: "TIME_SERIES_DAILY" })
      .query({ symbol: active })
      .query({ apikey: apiKey })
      .then((res) => {
        let timeSeries = res.body["Time Series (Daily)"];
        const { from, to } = req.query;

        const rows = [];
        /*
         *eu não sei se realmente necessitava disso, mas eu fiz
         *pra colocar o objeto num array com os valores que eu queria,
         *e ai depois eu faço o filtro
         */
        for (key in timeSeries) {
          if (timeSeries.hasOwnProperty(key)) {
            var finData = timeSeries[key];
            const opening = parseFloat(finData["1. open"]).toFixed(2);
            const high = parseFloat(finData["2. high"]).toFixed(2);
            const low = parseFloat(finData["3. low"]).toFixed(2);
            const closing = parseFloat(finData["4. close"]).toFixed(2);
            const volume = finData["5. volume"];
            rows.push({
              pricedAt: key,
              opening,
              high,
              low,
              closing,
            });
          }
        }

        let resultProductData = rows.filter(function (a) {
          return a.pricedAt >= to && a.pricedAt <= from;
        });

        const name = res.body["Meta Data"]["2. Symbol"];
        response.status(200).send({ name, pricing: resultProductData });
      });
  });
  app.get("/stocks/:stock_name/compare", async (req, response, next) => {
    const active = req.params.stock_name.split(",");
    const lastPrice = [];
    //aqui eu tive que fazer duas requests por que não sabia um jeito melhor de fazer
    //sem utilizar dois parametros para stock_nome
    await request
      .get("https://www.alphavantage.co/query")
      .query({ function: "GLOBAL_QUOTE" })
      .query({ symbol: active[0] })
      .query({ apikey: apiKey })
      .then((res) => {
        const name = res.body["Global Quote"]["01. symbol"];
        const price = parseFloat(res.body["Global Quote"]["05. price"]).toFixed(
          2
        );
        const pricedAt = res.body["Global Quote"]["07. latest trading day"];
        lastPrice.push({ name, price, pricedAt });
      });
    await request
      .get("https://www.alphavantage.co/query")
      .query({ function: "GLOBAL_QUOTE" })
      .query({ symbol: active[1] })
      .query({ apikey: apiKey })
      .then((res) => {
        const name = res.body["Global Quote"]["01. symbol"];
        const price = parseFloat(res.body["Global Quote"]["05. price"]).toFixed(
          2
        );
        const pricedAt = res.body["Global Quote"]["07. latest trading day"];
        lastPrice.push({ name, price, pricedAt });
        response.send({ lastPrices: lastPrice });
      });
  });
  app.get("/stocks/:stock_name/gains", (req, response) => {
    ///stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string></string>

    const active = req.params.stock_name;
    const { purchasedAmount, purchasedAt } = req.query;
    console.log(purchasedAt);
    request
      .get("https://www.alphavantage.co/query")
      .query({ function: "TIME_SERIES_DAILY" })
      .query({ symbol: active })
      .query({ apikey: apiKey })
      .then((res) => {
        /*  "name": string,
  "purchasedAmount": number,
  "purchasedAt": string, // data em formato ISO 8601,
  "priceAtDate": number, // preço na data de compra
  "lastPrice": number,   // preço mais recente
  "capitalGains": number // ganhos ou perdas com a ação, em reais*/
        const timeSeries = res.body["Time Series (Daily)"];
        const name = res.body["Meta Data"]["2. Symbol"];
        const timeSeriesArray = [];
        timeSeriesArray.push(Object.values(timeSeries)[0]);
        const lastPrice = parseFloat(timeSeriesArray[0]["4. close"]).toFixed(2);
        const priceAtDate = parseFloat(
          timeSeries[purchasedAt]["4. close"]
        ).toFixed(2);
        let ganhosCapital =
          purchasedAmount * lastPrice - purchasedAmount * priceAtDate;
        const capitalGains = parseFloat(ganhosCapital).toFixed(2);
        response.status(200).send({
          name,
          purchasedAmount,
          purchasedAt,
          priceAtDate,
          lastPrice,
          capitalGains,
        });
      });
  });
};
