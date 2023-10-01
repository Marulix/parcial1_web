import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { Card } from "react-bootstrap";
import cafe from "../assets/cafe.png";
import { FormattedMessage } from "react-intl";

export default function Home() {
  async function getDatos() {
    const response = await fetch("http://localhost:3001/cafes");
    const cafes = await response.json();
    console.log(cafes);
    return cafes;
  }
  const [cafes, setCafes] = useState([]);
  useEffect(() => {
    getDatos().then((data) => {
      setCafes(data);
    });
  }, []);

  const [selectedCoffee, setSelectedCoffee] = useState(null);

  async function handleRowClick(id) {
    const cafe = await fetch(`http://localhost:3001/cafes/${id}`);
    const cafeData = await cafe.json();
    console.log(cafeData);
    setSelectedCoffee(cafeData);
  }

  return (
    <Container fluid style={{ padding: "26px 93px" }}>
      <Row className="gy-1">
        <Col md={12}>
          <h1 className="home-title">
            <FormattedMessage id="El aroma mágico" />
          </h1>
        </Col>
        <hr />
        <Col md={12}>
          <img className="home-image" src={cafe} alt="" />
        </Col>
      </Row>
      <hr />
      <Row style={{ marginBottom: "20px" }}>
        <Col md={8}>
          <Table hover>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>
                  <FormattedMessage id="Nombre" />
                </th>
                <th>
                  <FormattedMessage id="Tipo" />
                </th>
                <th>
                  <FormattedMessage id="Región" />
                </th>
              </tr>
            </thead>
            <tbody>
              {cafes.map((cafe, index) => (
                <tr key={index} onClick={() => handleRowClick(cafe.id)}>
                  <th scope="row">{index + 1}</th>
                  <td>{cafe.nombre}</td>
                  <td>{cafe.tipo}</td>
                  <td>{cafe.region}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={4} style={{ backgroundColor: "white" }}>
          {selectedCoffee && (
            <Card className="coffee-card text-center">
              <Card.Body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "0",
                  paddingBottom: "0",
                }}
              >
                <div>
                  <Card.Title className="card-title-coffee">
                    {selectedCoffee.nombre}
                  </Card.Title>
                  <Card.Subtitle className="card-date">
                    {selectedCoffee.fecha_cultivo}
                  </Card.Subtitle>
                </div>
                <img
                  src={selectedCoffee.imagen}
                  height={"150px"}
                  width={"116px"}
                  alt={selectedCoffee.nombre}
                ></img>
                <div>
                  <Card.Subtitle className="card-notes">
                    <FormattedMessage id="Notas" />
                  </Card.Subtitle>
                  <Card.Subtitle className="card-notes">
                    {selectedCoffee.notas}
                  </Card.Subtitle>
                </div>
                <Card.Text className="card-altura">
                  <FormattedMessage id="Cultivado a una altura de" />:{" "}
                  {selectedCoffee.altura} <FormattedMessage id="msnm" />
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <Row className="align-items-end">
        <Col md={8} className="mx-auto text-center gy-5">
          <footer>
            <FormattedMessage id="Contáctenos" /> - +57 3102105253 -
            info@elaromamagico.com - @elaromamagico
          </footer>
        </Col>
      </Row>
    </Container>
  );
}
