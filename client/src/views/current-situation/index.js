import React, { useState } from 'react'
import Header from '../../components/Header';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';
import Alert from '../../components/Alert';
import CurrentSituation_Controller from '../../controllers/current-situation_Controller'

function Situation() {

    let [stockInput, setInput] = useState('');
    let [response, setResponde] = useState();

    const [visibleAlert, setVisibleAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    function handleinputChange(event) {
        setInput(event.target.value);
    }

    const loadData = async () => {

        const response = await CurrentSituation_Controller.read(stockInput)
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
                            <h3>Informe o nome da ação:</h3>
                            <InputGroup>
                                <Input onChange={handleinputChange} />
                                <InputGroupAddon addonType="append">
                                </InputGroupAddon>
                            </InputGroup>
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
                                    <th>Ultimo Preço</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {response &&
                                    <tr>
                                        <td>1</td>
                                        <td>{response.name}</td>
                                        <td>{response.lastPrice}</td>
                                        <td>{response.pricedAt}</td>
                                    </tr>
                                }

                            </tbody>
                        </Table>
                    </Col>
                </Container>
                <div>
                </div>
            </div>
        </div>
    );
}

export default Situation;
