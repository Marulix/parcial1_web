import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "react-bootstrap";

import { Stack } from "react-bootstrap"

export default function Login() {
    const navigator = useNavigate();
    const [formValues, setFormValues] = useState({ user: "", password: "", favClass: "1" });
    const [formState, setFormState] = useState({ valid: true });



    const validateForm = () => {
        if (formValues.user === "" || formValues.password === "") {
            setFormState({ valid: false });
        }
        const response = handlePost(formValues);

    }


    const handleuserChange = (e) => {
        setFormValues({ ...formValues, user: e.target.value });
    }

    const handlePasswordChange = (e) => {
        setFormValues({ ...formValues, password: e.target.value });
    }

    const eraseForm = () => {
        setFormValues({ user: "", password: "" });
    }

    async function handlePost(formValues) {
        const body = {
            _login_: formValues.user,
            _password_: formValues.password
        }
        const response = await fetch("http://localhost:3001/login", { method: "POST", body: JSON.stringify(body) })
        const dataa = await response.json()

        if (dataa.status === "error") {
            setFormState({ valid: false });
        }
        else {
            navigator("/home");
        }

    };


    return (
        <Container fluid style={{ border: "solid gray 80px" }}>
            <Row>
                <Col md={12} style={{ backgroundColor: "brown" }}>
                    <h3>El aroma mágico</h3>
                </Col>
            </Row>
            <Row>
                <Col md={12} style={{ backgroundColor: "white", textAlign: "center" }}>
                    <Stack className="p-5" gap={5}>
                        <h4 style={{ fontSize: "30px" }}>Inicio de sesión</h4>
                        <Stack gap={3} style={{ alignItems: "center", justifyContent: "center", justifyItems: "center", textAlign: "left" }}>
                            <Form>
                                <Form.Group className="mb-3 " controlId="formBasicuser">
                                    <Form.Label className="black">Nombre de usuario</Form.Label>
                                    <Form.Control type="user" placeholder="" onChange={handleuserChange} value={formValues.user} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label >Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="" onChange={handlePasswordChange} value={formValues.password} />
                                </Form.Group>
                                <Row>
                                    <Col md={6}><Button style={{ backgroundColor: "gray", borderRadius: "20px", borderBlockColor: "gray", width: "200px" }} onClick={validateForm}>Ingresar</Button></Col>
                                    <Col md={6}><Button style={{ backgroundColor: "gray", borderRadius: "20px", borderBlockColor: "gray", width: "200px" }} onClick={eraseForm}>Cancelar</Button></Col>
                                    {!formState.valid && <p style={{ color: "red" }}>Error de autenticación. Revise sus credenciales</p>}
                                </Row>
                            </Form>
                        </Stack>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
}
