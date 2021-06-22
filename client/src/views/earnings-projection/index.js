import React, { useState } from 'react'
import Header from '../../components/Header';
import { InputGroup, InputGroupAddon, Input, Button, Table, Container, Row, Col, Spinner, FormFeedback } from 'reactstrap';
import Alert from '../../components/Alert';
import EarningsProjection_Controller from '../../controllers/Earnings-projection_Controller';
import Calendar from '../../components/Calendar'

function Projection() {

    const [stockInput, setStockInput] = useState('');
    const [purchasedAtInput, setPurchasedAtInput,] = useState('');
    const [purchasedAmountInput, setPurchasedAmountInput] = useState('');
    const [response, setResponde] = useState();

    let [nameStockInvalid, setNameStockInvalid] = useState(false);
    let [purchasedAtInputInvalid, setPurchasedAtInputInvalid] = useState(false);
    let [purchasedAmountInputInvalid, setPurchasedAmountInputInvalid] = useState(false);

    let [loading, setLoading] = useState(false);
    let [disabledButtonFind, setDisabledButtonFind] = useState(false);

    const [visibleAlert, setVisibleAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    function handleinputChange(event) {
        if (event.target.getAttribute('name') === "stock") {
            setStockInput(event.target.value);
        } else if (event.target.getAttribute('name') === "purchasedAt") {
            setPurchasedAtInput(event.target.value);
        } else if (event.target.getAttribute('name') === "purchasedAmount") {
            setPurchasedAmountInput(event.target.value);
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
        if (purchasedAmountInput === "") {
            setPurchasedAmountInputInvalid(true)
            passed = false;
        } else {
            setPurchasedAmountInputInvalid(false)
        }
        if (purchasedAtInput === "") {
            setPurchasedAtInputInvalid(true)
            passed = false;
        } else {
            setPurchasedAtInputInvalid(false)
        }

        return passed;
    }

    const loadData = async () => {

        if (!checkForm()) return

        setLoading(true);
        setDisabledButtonFind(true)

        const response = await EarningsProjection_Controller.read(stockInput, purchasedAmountInput, purchasedAtInput)
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
        <div >
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
                            <Calendar h5={"Data da compra:"} name={"purchasedAt"} onChange={handleinputChange} dateInvalid={purchasedAtInputInvalid} />
                        </Col>
                    </Row><br />
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <h5>Nº de ações:</h5>
                            <InputGroup>
                                <Input type="number" onChange={handleinputChange} name="purchasedAmount" invalid={purchasedAmountInputInvalid} />
                                <FormFeedback>Informe o Nº de ações!</FormFeedback>
                            </InputGroup>
                        </Col>
                    </Row><br />

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
                                    <th>Nº de ações compradas</th>
                                    <th>Data da compra</th>
                                    <th>Preço data da compra</th>
                                    <th>Preço atual</th>
                                    <th>Capital ganho</th>
                                </tr>
                            </thead>
                            <tbody>
                                {response &&
                                    <tr>
                                        <td>1</td>
                                        <td>{response.name}</td>
                                        <td>{response.purchasedAmount}</td>
                                        <td>{response.purchasedAt}</td>
                                        <td>{response.priceAtDate}</td>
                                        <td>{response.lastPrice}</td>
                                        <td>{(response.capitalGains).toFixed(2)}</td>
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Container>
            </div>

        </div>
    );
}

export default Projection;
