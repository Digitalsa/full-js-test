import express from 'express';
import request from "request";

const routes = express();


function doRequest(url) {
    return new Promise(function (resolve, reject) {
        request.get({
            url: url,
            json: true,
            headers: { 'User-Agent': 'request' }
        }, (err, resp, data) => {
            if (err) {
                reject(err)
                console.log('error:', err);
            } else if (resp.statusCode !== 200) {
                console.log('Status:', resp.statusCode);
            } else {
                resolve(data)
            }
        });
    })
}

async function infoStocks(stock_name, type) {

    let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=546M72GB5ZUMCF4H`;

    if (type == "wait") {
        var promise = new Promise(function (resolve, reject) {
            setTimeout(async function () {
                resolve(await doRequest(url));
            }, 15000);
        })

        return promise
    } else {
        return await doRequest(url)
    }
}


routes.get('/', function (req, res) {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Servidor</title>
    </head>
        <body>
           Rodando ...
        </body>
    </html>`

    res.send(html);
})

routes.get('/stocks/:stock_name/quote', async function (req, res) {

    const { stock_name } = req.params
    let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stock_name}&apikey=CPU4KCW6RXDDUY2L`;

    let symbol = await doRequest(url)

    if (symbol.bestMatches.length == 0) {
        res.status(404)
        res.send({
            error: "Empresa não encontrada"
        })
        return;
    }

    let infoStock = await infoStocks(symbol['bestMatches'][0]['1. symbol'])

    try {
        res.status(200)
        res.send({
            name: symbol['bestMatches'][0]['1. symbol'],
            lastPrice: parseFloat(infoStock['Global Quote']['05. price']),
            pricedAt: new Date(infoStock['Global Quote']['07. latest trading day'])
        })
    } catch {
        res.status(404)
        res.send({
            error: "Limite de solicitação excedida"
        })
    }




})

routes.get('/stocks/:stock_name/history', async function (req, res) {

    const { stock_name } = req.params

    let firstDate = new Date(req.query.from)
    let lastDate = new Date(req.query.to)

    if (firstDate > lastDate) {
        res.status(403)
        res.send({
            error: "Data final menor que a inicial"
        })
        return;
    }

    let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stock_name}&apikey=CPU4KCW6RXDDUY2L`;

    let symbol = await doRequest(url)

    if (symbol.bestMatches.length == 0) {
        res.status(404)
        res.send({
            error: "Empresa não encontrada"
        })
        return;
    }

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol['bestMatches'][0]['1. symbol']}&apikey=CPU4KCW6RXDDUY2L`;

    let response = await doRequest(url)
    let dates = new Array();

    while (firstDate <= lastDate) {
        firstDate.setDate(firstDate.getDate() + 1)
        dates.push(firstDate.toLocaleDateString("zh-Hans-CN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }))
    }

    let prices = new Array();

    dates.forEach(date => {
        if (response['Time Series (Daily)'][date]) {
            prices.push({
                "opening": parseFloat(response['Time Series (Daily)'][date]['1. open']),
                "low": parseFloat(response['Time Series (Daily)'][date]['3. low']),
                "high": parseFloat(response['Time Series (Daily)'][date]['2. high']),
                "closing": parseFloat(response['Time Series (Daily)'][date]['4. close']),
                "pricedAt": date
            })
        }
    })
    res.status(200)
    res.send({
        name: symbol['bestMatches'][0]['1. symbol'],
        prices: prices
    })

})

routes.post('/stocks/:stock_name/compare', async function (req, res) {

    const { stock_name } = req.params

    let stocks = req.body.stocks;
    let lastPrices = new Array();

    for (var i = 0; i < stocks.length; i++) {

        let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stocks[i]}&apikey=CPU4KCW6RXDDUY2L`;

        let symbol = await doRequest(url)
        if (symbol.bestMatches.length != 0) {

            let infoStock = await infoStocks(symbol['bestMatches'][0]['1. symbol'], "wait")

            lastPrices.push({
                name: symbol['bestMatches'][0]['1. symbol'],
                lastPrice: parseFloat(infoStock['Global Quote']['05. price']),
                pricedAt: infoStock['Global Quote']['07. latest trading day']
            })

        }
    }

    if (lastPrices.length == 0) {
        res.status(404)
        res.send({
            error: "Nenhuma empresa encontrada"
        })
        return;
    }
    res.status(200)
    res.send({ lastPrices: lastPrices })

})

routes.get('/stocks/:stock_name/gains', async function (req, res) {

    const { stock_name } = req.params
    let purchasedAmount = parseInt(req.query.purchasedAmount)
    let purchasedAt = req.query.purchasedAt

    let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stock_name}&apikey=CPU4KCW6RXDDUY2L`;

    let symbol = await doRequest(url)

    if (symbol.bestMatches.length == 0) {
        res.status(404)
        res.send({
            error: "Empresa não encontrada"
        })
        return;
    }

    let infoStock = await infoStocks(symbol['bestMatches'][0]['1. symbol'])

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol['bestMatches'][0]['1. symbol']}&outputsize=full&apikey=demo`;

    let response = await doRequest(url)

    try {
        res.status(200)
        res.send({
            name: symbol['bestMatches'][0]['1. symbol'],
            purchasedAmount: purchasedAmount,
            purchasedAt: purchasedAt,
            priceAtDate: parseFloat(response['Time Series (Daily)'][purchasedAt]['4. close']),
            lastPrice: parseFloat(infoStock['Global Quote']['05. price']),
            capitalGains: (parseFloat(infoStock['Global Quote']['05. price']) * purchasedAmount) - (parseFloat(response['Time Series (Daily)'][purchasedAt]['4. close']) * purchasedAmount)
        })
    } catch {
        res.status(404)
        res.send({
            error: "Data não disponivel"
        })
    }


})

export default routes;