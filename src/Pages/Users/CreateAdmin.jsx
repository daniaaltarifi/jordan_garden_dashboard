import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import auth from "../../assets/slide2.jpg"; 
import "../../Css/SignUp.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../App";
function CreateAdmin() {
  const lang = location.pathname.split("/")[1] || "en";
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(lang === "ar" ? "كلمتا السر غير متطابقتين" : "Passwords do not match");
      return;
    }

    setValidated(true);

    try {
   
      const response = await fetch(`${API_URL}/users/createadmin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password,
          lang,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create admin");
        return;
      }

  
      navigate(`/${lang}`); 
    } catch (error) {
      setError(lang === "ar" ? "حدث خطأ أثناء إنشاء المستخدم" : "An error occurred while creating the admin",error);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col xl={6} md={12} sm={12}>
          <img src={auth} alt="auth img" className="auth_img" />
        </Col>
        <Col xl={6} md={12} sm={12}>
          <h1 className="create_acc_title">{lang === "ar" ? "إنشاء مدير" : "Create Admin"}</h1>
          {error && <p className="text-danger">{error}</p>}
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="cont_form"
          >
            <Form.Group controlId="validationCustom01" className="input_group_auth">
              <Form.Label>{lang === "ar" ? "اسم المستخدم" : "Username"}</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder={lang === "ar" ? "ادخل اسم المستخدم" : "Enter your Username"}
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form_input_auth"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="validationCustom02" className="input_group_auth">
              <Form.Label>{lang === "ar" ? "البريد الالكتروني" : "Email"}</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="name@gmail.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form_input_auth"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="validationCustomUsername" className="input_group_auth">
              <Form.Label>{lang === "ar" ? "رقم الهاتف" : "Phone No"}</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="0799999999"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="form_input_auth"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Phone No.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="validationCustom04" className="input_group_auth">
              <Form.Label>{lang === "ar" ? "كلمة السر" : "Password"}</Form.Label>
              <Form.Control
                type="password"
                placeholder={lang === "ar" ? "ادخل كلمة السر" : "Enter your password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form_input_auth"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Password.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="validationCustom05" className="input_group_auth">
              <Form.Label>{lang === "ar" ? "تأكيد كلمة السر" : "Confirm Password"}</Form.Label>
              <Form.Control
                type="password"
                placeholder={lang === "ar" ? "تأكيد كلمة السر" : "Confirm Password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="form_input_auth"
              />
              <Form.Control.Feedback type="invalid">
                Please confirm your password.
              </Form.Control.Feedback>
            </Form.Group>

            <button type="submit" className="Login-button w-50 mt-3">
              {lang === "ar" ? "إنشاء مدير" : "Create Admin"}
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateAdmin;
