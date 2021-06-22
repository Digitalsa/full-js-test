import React, { useState } from 'react'
import Header from '../../components/Header';
import { InputGroup, InputGroupAddon, Input, Button, Table, Container, Row, Col, Spinner, FormFeedback } from 'reactstrap';
import Alert from '../../components/Alert';
import Compare_Controller from '../../controllers/Compare_Controller';

function Compare() {

    let [stockInput, setStockInput] = useState('');
    let [stocksInput, setStocksInput] = useState('');
    let [stocksList, setStocksList] = useState([]);
    let [response, setResponde] = useState({ lastPrices: [] });

    let [nameStockInvalid, setNameStockInvalid] = useState(false);
    let [nameStocksInvalid, setNameStocksInvalid] = useState(false);

    let [loading, setLoading] = useState(false);
    let [disabledButtonFind, setDisabledButtonFind] = useState(false);

    const [visibleAlert, setVisibleAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    function handleinputChange(event) {
        if (event.target.getAttribute('name') === "stock") {
            setStockInput(event.target.value);
        } else if (event.target.getAttribute('name') === "stocks") {
            setStocksInput(event.target.value);
        }
    }

    function keyPress(event) {
        if (event.keyCode === 13) {
            setStocksList([...stocksList, stocksInput]);
            setStocksInput('')
        }
    }

    function checkForm() {

        let passed = true;

        if (stockInput === "") {
            setNameStockInvalid(true)
            passed = false;
        } else {
            setNameStockInvalid(false)
        }
        if (stocksList.length === 0) {
            setNameStocksInvalid(true)
            passed = false;
        } else {
            setNameStocksInvalid(false)
        }

        return passed;
    }

    const loadData = async () => {

        if (!checkForm()) return

        setStocksList([]);

        setLoading(true);
        setDisabledButtonFind(true)

        const response = await Compare_Controller.read(stockInput, stocksList)
        const data = await response.json();

        setLoading(false);
        setDisabledButtonFind(false)

        if (response.status === 200) {
            setResponde(data)
        } else {
            setVisibleAlert(true)

            setTimeout(function () {
                setVisibleAlert(false)
            }, 8000);

            setMessageAlert(data.error)
        }
    }

    return (
        <div>
            <Header />
            <div>
                <Container>
                    <Row>
                        <Alert visibleAlert={visibleAlert} messageAlert={messageAlert} />
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <h5>Informe o nome da ação:</h5>
                            <InputGroup>
                                <Input onChange={handleinputChange} name="stock" invalid={nameStockInvalid} />
                                <FormFeedback>Informe o nome da ação!</FormFeedback>
                            </InputGroup>
                        </Col>
                    </Row><br />
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <h5>Informe o nome da ação a ser comparada:</h5>
                            <InputGroup>
                                <Input onKeyDown={keyPress} onChange={handleinputChange} name="stocks" value={stocksInput} invalid={nameStocksInvalid} />
                                <InputGroupAddon addonType="append">
                                    <Button color="secondary" onClick={() => {
                                        setStocksList([...stocksList, stocksInput]);
                                        setStocksInput('')
                                    }}>
                                        Adicionar
                                    </Button>
                                </InputGroupAddon>
                                <FormFeedback>Informe ao menos uma ação!</FormFeedback>
                            </InputGroup>
                        </Col>
                    </Row><br />
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Input type="select" multiple>
                                {
                                    stocksList.map((oneStock, index) => (
                                        <option key={index}>{oneStock}</option>
                                    ))
                                }
                            </Input>
                        </Col>
                    </Row><br /><br /><br />
                    <Row>
                        <Col xs="6" sm="4"></Col>
                        <Col xs="6" sm="4"></Col>
                        <Col sm="4">
                            <Button color="primary" disabled={disabledButtonFind} onClick={loadData}>{loading ?
                                <Spinner color="success" children="" /> :
                                "BUSCAR"
                            }</Button>
                        </Col>
                    </Row><br /><br /><br />
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ação</th>
                                    <th>Preço</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    response.lastPrices.map((data, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{data.name}</td>
                                            <td>{data.lastPrice}</td>
                                            <td>{data.pricedAt}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Container>
            </div>
        </div>

    );
}

export default Compare;
