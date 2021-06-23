var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:3030";


describe("Teste API", function () {
    this.timeout(100000)

    it("Retorno do preço atual", function (done) {
        setTimeout(async function () {
            request.get(
                {
                    url: urlBase + `/stocks/${"IBM"}/quote`
                },
                function (err, response, body) {

                    var _body = {};
                    try {
                        _body = JSON.parse(body);
                    }
                    catch (e) {
                        _body = {};
                    }


                    expect(response.statusCode).to.equal(200);

                    _body.should.have.property('name')
                    _body.should.have.property('lastPrice')
                    _body.should.have.property('pricedAt')


                    done();
                }
            )
        }, 20000);
    });


    it("Retorno do preço histórico da ação num intervalo", function (done) {
        setTimeout(async function () {
            request.get(
                {
                    url: urlBase + `/stocks/${"IBM"}/history?from=2021-06-10&to=2021-06-20`
                },
                function (err, response, body) {

                    var _body = {};
                    try {
                        _body = JSON.parse(body);
                    }
                    catch (e) {
                        _body = {};
                    }

                    expect(response.statusCode).to.equal(200);

                    _body.should.have.property('name')

                    if (_body.should.have.property('prices')) {

                        expect(_body.prices).to.have.lengthOf.at.least(1);

                        _body.prices[0].should.have.property('opening')
                        _body.prices[0].should.have.property('low')
                        _body.prices[0].should.have.property('high')
                        _body.prices[0].should.have.property('closing')
                        _body.prices[0].should.have.property('pricedAt')

                    }

                    done();
                }
            )
        }, 20000);

    });

    it("Comparar uma ação com uma ou mais ações", function (done) {
        setTimeout(async function () {
            request.post(
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    url: urlBase + `/stocks/${"IBM"}/compare`,
                    body: JSON.stringify({ "stocks": ["COCA", "TSCO.LON"] })
                },
                function (err, response, body) {

                    var _body = {};
                    try {
                        _body = JSON.parse(body);
                    }
                    catch (e) {
                        _body = {};
                    }

                    expect(response.statusCode).to.equal(200);


                    if (_body.should.have.property('lastPrices')) {

                        expect(_body.lastPrices).to.have.lengthOf.at.least(1);

                        _body.lastPrices[0].should.have.property('name')
                        _body.lastPrices[0].should.have.property('lastPrice')
                        _body.lastPrices[0].should.have.property('pricedAt')


                    }

                    done();
                }
            )
        }, 20000);

    });

    it("Projeção de ganhos com compra em uma data", function (done) {
        setTimeout(async function () {
            request.get(
                {
                    url: urlBase + `/stocks/${"IBM"}/gains?purchasedAmount=100&purchasedAt=2021-01-20`,
                },
                function (err, response, body) {

                    var _body = {};
                    try {
                        _body = JSON.parse(body);
                    }
                    catch (e) {
                        _body = {};
                    }

                    expect(response.statusCode).to.equal(200);

                    _body.should.have.property('name')
                    _body.should.have.property('purchasedAmount')
                    _body.should.have.property('purchasedAt')
                    _body.should.have.property('priceAtDate')
                    _body.should.have.property('lastPrice')
                    _body.should.have.property('capitalGains')

                    done();
                }
            )
        }, 30000);

    });
});