import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

import { Stack } from "react-bootstrap";
import cafe from "../assets/cafe.png";

export default function Login() {
  const navigator = useNavigate();
  const [formValues, setFormValues] = useState({
    user: "",
    password: "",
    favClass: "1",
  });
  const [formState, setFormState] = useState({ valid: true });

  const validateForm = () => {
    if (formValues.user === "" || formValues.password === "") {
      setFormState({ valid: false });
    }
    handlePost(formValues);
  };

  const handleuserChange = (e) => {
    setFormValues({ ...formValues, user: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setFormValues({ ...formValues, password: e.target.value });
  };

  const eraseForm = () => {
    setFormValues({ user: "", password: "" });
  };

  async function handlePost(formValues) {
    console.log(formValues);
    const body = {
      login: formValues.user,
      password: formValues.password,
    };
    console.log(body);
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
    const dataa = await response.json();

    if (dataa.status === "error") {
      setFormState({ valid: false });
    } else {
      navigator("/home");
    }
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
        <Col md={8} className="mx-auto">
          <Stack>
            <h2 className="login-title">
              <FormattedMessage id="Inicio de sesión" />
            </h2>
            <Stack
              gap={3}
              style={{
                justifyContent: "center",
                justifyItems: "center",
                textAlign: "left",
                padding: "23px 148px",
                border: "1px solid #000",
                background: "rgba(224, 187, 187, 0.20)",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Form style={{ marginBottom: formState.valid ? "36px" : "" }}>
                <Form.Group className="mb-3 " controlId="formBasicuser">
                  <Form.Label className="login-title">
                    <FormattedMessage id="Nombre de usuario" />
                  </Form.Label>
                  <Form.Control
                    type="user"
                    placeholder=""
                    className="login-input"
                    onChange={handleuserChange}
                    value={formValues.user}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="login-title">
                    <FormattedMessage id="Contraseña" />
                  </Form.Label>
                  <Form.Control
                    className="login-input"
                    type="password"
                    placeholder=""
                    onChange={handlePasswordChange}
                    value={formValues.password}
                  />
                </Form.Group>
                <Row className="gy-3">
                  <Col md={6}>
                    <Button
                      style={{
                        backgroundColor: "#8FA98F",
                        borderRadius: "0",
                        width: "253px",
                      }}
                      onClick={validateForm}
                    >
                      <span className="login-title">
                        <FormattedMessage id="Ingresar" />
                      </span>
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button
                      style={{
                        backgroundColor: "#E75D5D",
                        borderRadius: "0",
                        width: "253px",
                      }}
                      onClick={eraseForm}
                    >
                      <span className="login-title">
                        <FormattedMessage id="Cancelar" />
                      </span>
                    </Button>
                  </Col>
                  {!formState.valid && (
                    <Col>
                      <p className="login-title" style={{ color: "red" }}>
                        <FormattedMessage id="Error de autenticación. Revise sus credenciales" />
                      </p>
                    </Col>
                  )}
                </Row>
              </Form>
            </Stack>
          </Stack>
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
