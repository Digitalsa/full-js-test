import React, { useState } from 'react'
import Header from '../../components/Header';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';
import Alert from '../../components/Alert';
import Compare_Controller from '../../controllers/Compare_Controller';

function Compare() {

    let [stockInput, setStockInput] = useState('');
    let [stocksInput, setStocksInput] = useState('');
    let [stocksList, setStocksList] = useState([]);
    let [response, setResponde] = useState({ lastPrices: [] });

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

    const loadData = async () => {
        setStocksList([]);
        const response = await Compare_Controller.read(stockInput, stocksList)
        const data = await response.json();
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
                                <Input onChange={handleinputChange} name="stock" />
                                <InputGroupAddon addonType="append">
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </Row><br />
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <h5>Informe o nome da ação a ser comparada:</h5>
                            <InputGroup>
                                <Input onKeyDown={keyPress} onChange={handleinputChange} name="stocks" value={stocksInput} />
                                <InputGroupAddon addonType="append">
                                </InputGroupAddon>
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
                            <Button color="primary" onClick={loadData}>BUSCAR</Button>
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
