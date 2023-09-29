import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useState } from "react";
import { Table } from "react-bootstrap"
import { Card } from "react-bootstrap"



export default function Home() {
    async function getDatos() {
        const response = await fetch("http://localhost:3001/cafes");
        const cafes = await response.json();
        console.log(cafes)
        return cafes;
    }
    const [cafes, setCafes] = useState([]);
    useEffect(() => {
        getDatos().then((data) => {
            setCafes(data);
        });
    }, []);


    const [selectedCoffee, setSelectedCoffee] = useState(null);

    const handleRowClick = (cafe) => {
        setSelectedCoffee(cafe);
    };

    return (
        <Container fluid style={{ border: "solid gray 80px" }}>
            <Row>
                <Col md={12} style={{ backgroundColor: "brown" }}>
                    <h3>El aroma mágico</h3>
                </Col>
            </Row>
            <Row>
                <Col md={8} style={{ backgroundColor: "white" }}>
                    <div className="p-5">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Tipo</th>
                                    <th>Region</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cafes.map((cafe, index) => (
                                    <tr key={index} onClick={() => handleRowClick(cafe)}>
                                        <td>{cafe.nombre}</td>
                                        <td>{cafe.tipo}</td>
                                        <td>{cafe.region}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
                <Col md={4} style={{ backgroundColor: "white" }}>
                    {selectedCoffee && (
                        <Card>
                            <Card.Body>
                                <Card.Title>{selectedCoffee.nombre}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Tipo: {selectedCoffee.tipo}
                                </Card.Subtitle>
                                <Card.Text>Región: {selectedCoffee.region}</Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
