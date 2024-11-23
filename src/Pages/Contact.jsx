import {
  Col,
  Container,
  Row,
  FloatingLabel,
  Form,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Ri24HoursFill } from "react-icons/ri";
import contact from '../assets/contact.jpg'
function Contact() {
  const lang = location.pathname.split("/")[1] || "en";
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const contactData = [
    {
      id: 1,
      content: "078123456",
      icon: <FaPhoneAlt />,
    },
    {
      id: 2,
      content: "contact@example.com",
      icon: <MdEmail />,
    },
    {
      id: 3,
      content: "amman",
      icon: <Ri24HoursFill />,
    },
  ];
  return (
    <>
      <section className="main_margin_section">
        <Container className="cont_form_apply ">
          <Row>
            <Col xl={5} md={12} sm={12} className="cont_backg_apply">
              <h5 className="text-center mb-5 title_contact">
                {lang === "ar"
                  ? "تقدم الآن لهذا الوظيفة"
                  : "Contact Information"}
              </h5>
              <img
                src={contact}
                alt="apply"
                height={"320px"}
                width={"100%"}
                className="rounded"
              />
              {contactData.map((cont) => (
                <>
                  <div className="cont_social">
                    <h6 className="px-2">{cont.icon}</h6>
                    <h6 className="social_contact">{cont.content}</h6>
                  </div>
                </>
              ))}
            </Col>
            <Col xl={7} md={12} sm={12}>
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="form_data"
              >
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    xl="6"
                    md="12"
                    sm="12"
                    controlId="validationCustom01"
                  >
                    <Form.Label className="input_form">
                      {lang === "ar" ? "الاسم الاول" : "First name"}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First name"
                      defaultValue="Mark"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xl="6"
                    md="12"
                    sm="12"
                    controlId="validationCustom02"
                  >
                    <Form.Label className="input_form">
                      {lang === "ar" ? "الاسم الاخير" : "Last name"}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Last name"
                      defaultValue="Otto"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xl="6"
                    md="12"
                    sm="12"
                    controlId="validationCustom02"
                  >
                    <Form.Label className="input_form">
                      {lang === "ar" ? "البريد الالكتروني" : "Email"}
                    </Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Email address"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xl="6"
                    md="12"
                    sm="12"
                    controlId="validationCustom02"
                  >
                    <Form.Label className="input_form">
                      {lang === "ar" ? "رقم الهاتف" : "Phone Number"}
                    </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Phone Number"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xl="6"
                    md="12"
                    sm="12"
                    controlId="validationCustom02"
                  >
                    <Form.Label className="input_form">
                      {" "}
                      {lang === "ar" ? "العنوان" : "Address"}
                    </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Physical Address"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Label className="input_form">
                    {lang === "ar" ? "الرسالة" : "Message"}
                  </Form.Label>

                  <FloatingLabel controlId="floatingTextarea2">
                    <Form.Control as="textarea" style={{ height: "100px" }} />
                  </FloatingLabel>
                </Row>
                <div className="div_btn_applynow">
                  <Button type="submit" className="btn_apply_now">
                    {lang === "ar" ? "ارسال الرسالة" : "Send Message"}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Contact;
