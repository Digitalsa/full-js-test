import React, { useState } from 'react'
import Header from '../../components/Header';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';
import Alert from '../../components/Alert';
import Calendar from '../../components/Calendar'
import HistoryStocks_Controller from '../../controllers/History-stocks_Controller';

function Projection() {

    let [stockInput, setStockInput] = useState('');
    let [firstDateInput, setInputFirstDateInput] = useState('');
    let [lastDateInput, setLastDateInput] = useState('');
    let [response, setResponde] = useState({ name: "", prices: [] });

    const [visibleAlert, setVisibleAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    function handleinputChange(event) {
        if (event.target.getAttribute('name') === "stocks") {
            setStockInput(event.target.value);
        } else if (event.target.getAttribute('name') === "firstDate") {
            setInputFirstDateInput(event.target.value);
        } else if (event.target.getAttribute('name') === "lastDate") {
            setLastDateInput(event.target.value);
        }
    }

    const loadData = async () => {

        const response = await HistoryStocks_Controller.read(stockInput, firstDateInput, lastDateInput)
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
                                <Input onChange={handleinputChange} name="stocks" />
                                <InputGroupAddon addonType="append">
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </Row><br />
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Calendar h5={"Data inicial:"} name={"firstDate"} onChange={handleinputChange} />
                        </Col>
                    </Row><br />
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>

                            <Calendar h5={"Data final:"} name={"lastDate"} onChange={handleinputChange} />
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
                                    <th>Abertura</th>
                                    <th>Baixa</th>
                                    <th>Alta</th>
                                    <th>Fechamento</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    response.prices.map((data, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{data.opening}</td>
                                            <td>{data.low}</td>
                                            <td>{data.high}</td>
                                            <td>{data.closing}</td>
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

export default Projection;
