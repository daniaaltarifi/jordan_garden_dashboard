import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import auth from "../assets/slide2.jpg";
import "../Css/SignUp.css";
import { Link } from "react-router-dom";
function Login() {
  const [validated, setValidated] = useState(false);
  const lang = location.pathname.split("/")[1] || "en";

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (

    <Container className="mt-5">
      <Row>
        <Col xl={6} md={12} sm={12}  >
       
            <img src={auth} alt="auth img" className="auth_img" />
        </Col>

        <Col xl={6} md={12} sm={12} className="cont_login">
          <h1 className="create_acc_title">      {lang==='ar'? "تسجيل دخول":"Sign In "}
          </h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="cont_form"
          >
            <Form.Group controlId="validationCustom02" className="input_group_auth">
              <Form.Label>{lang==='ar'? "البريد الالكتروني":"Email"}</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="name@gmail.com"
                className="form_input_auth"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom04"className="input_group_auth">
              <Form.Label>{lang==='ar'? "كلمة السر":"Password"}</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                required
                className="form_input_auth"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Password.
              </Form.Control.Feedback>
            </Form.Group>
            <button type="submit" className="Login-button w-50 mt-3">
            {lang==='ar'? "تسجيل دخول":" Sign In"}
            </button>
            <Link to="/login" className="link_auth">
            {lang==='ar'? "تسجيل حساب":"Sign Up"}
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>

  );
}

export default Login;
