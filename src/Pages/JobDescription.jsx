import {
  Col,
  Container,
  Row,
  FloatingLabel,
  Form,
  Button,
} from "react-bootstrap";
import apply from "../assets/apply.webp";
import { useState } from "react";
function JobDescription() {
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

  return (
    <>
      <section className="main_margin_section">
        <Container>
          <p className="title_jobdescr">Software Engineer </p>
          <Row>
            <Col xl={12} md={12} sm={12}>
              <h5 className="resp_jobdesc">
                {lang === "ar"
                  ? `الوصف الوظيفي ` // RTL text
                  : `Job Description: `}
              </h5>
              <p>
                We are looking for a skilled React & Node.js Website Developer
                to join our development team. As a full-stack developer, you
                will be responsible for building responsive, high-performance
                web applications using React for front-end development and
                Node.js for the back-end. Your role will involve collaborating
                with designers, product managers, and other developers to create
                scalable, secure, and dynamic web solutions that align with the
                company’s business objectives.
              </p>
              <h5 className="resp_jobdesc">
                {" "}
                {lang === "ar"
                  ? `المسؤوليات ` // RTL text
                  : `Responsibilities: `}
              </h5>
              <ul>
                {/* {responsabilitiesList.length > 0 ? (
                  responsabilitiesList.map((item, index) => ( */}
                <li>
                  Key Responsibilities: Full-Stack Development: Build and
                  maintain web applications using React for the front-end and
                  Node.js for the back-end. Front-End Development: Develop
                  interactive and responsive user interfaces using React
                </li>
                {/* ))
                ) : (
                  <li>
                    {lang === "ar"
                      ? `لا يوجد مسؤوليات ` // RTL text
                      : `No responsibilities listed. `}
                  </li>
                )} */}
              </ul>
              <h5 className="resp_jobdesc">
                {lang === "ar"
                  ? `المتطلبات ` // RTL text
                  : `Requirements: `}
              </h5>
              <ul>
                {/* {reqList.length > 0 ? (
                  reqList.map((item, index) =>  */}
                <li>
                  Key Responsibilities: Full-Stack Development: Build and
                  maintain web applications using React for the front-end and
                  Node.js for the back-end. Front-End Development: Develop
                  interactive and responsive user interfaces using React
                </li>
                {/* )
                ) : (
                  <li>
                    {lang === "ar"
                      ? `لا يوجد متطلبات ` // RTL text
                      : `No Requirements listed. `}
                  </li>
                )} */}
              </ul>
              <h5 className="resp_jobdesc">
                {lang === "ar"
                  ? `الفوائد ` // RTL text
                  : `Benefits `}
              </h5>
              <ul>
                {/* {benefitList.length > 0 ? (
                  benefitList.map((item, index) =>  */}
                <li>
                  Key Responsibilities: Full-Stack Development: Build and
                  maintain web applications using React for the front-end and
                  Node.js for the back-end. Front-End Development: Develop
                  interactive and responsive user interfaces using React
                </li>
                {/* )
                ) : (
                  <li>
                    {lang === "ar"
                      ? `لا يوجد فوائد ` // RTL text
                      : `No benefits listed. `}
                  </li>
                )} */}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* APPLY FORM POSITION */}
      <section className="main_marign_section">
        <Container className="cont_form_apply ">
          <Row >
            <Col xl={5} md={12} sm={12} className="cont_backg_apply">
              <h5 className="text-center mb-5">{lang=== 'ar' ? "تقدم الآن لهذا الوظيفة":"Apply Now For this Posistion"}</h5>
              <img
                src={apply}
                alt="apply"
                height={"320px"}
                width={"100%"}
                className="rounded"
              />
            </Col>
            <Col xl={7} md={12} sm={12}>
              <Form noValidate validated={validated} onSubmit={handleSubmit} className="form_data">
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    xl="6"
                    md="12"
                    sm="12"
                    controlId="validationCustom01"
                  >
                    <Form.Label className="input_form" >{lang === 'ar' ? "الاسم الاول":"First name"}</Form.Label>
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
                    <Form.Label className="input_form">{lang === 'ar' ? "الاسم الاخير":"Last name"}</Form.Label>
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
                    <Form.Label className="input_form">{lang === 'ar' ?"البريد الالكتروني":"Email"}</Form.Label>
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
                    <Form.Label className="input_form">{lang === 'ar' ?"رقم الهاتف":"Phone Number"}</Form.Label>
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
                    <Form.Label className="input_form"> {lang === 'ar' ?"سنوات الخبرة":"Years Of Experience"}</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Years Of Experience"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    xl="6"
                    md="12"
                    sm="12"
                    controlId="formFile"
                    className="mb-3  cv_file"
                  >
                    <Form.Label className="input_form">{lang === 'ar' ?"السيرة الذاتية":"Upload CV"}</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                  <Form.Label className="input_form">{lang === 'ar' ?"المهارات":"Skills"}</Form.Label>

                  <FloatingLabel controlId="floatingTextarea2" >
                    <Form.Control
                      as="textarea"
                      style={{ height: "100px" }}
                    />
                  </FloatingLabel>
                </Row>
             <div className="div_btn_applynow">

                <Button type="submit" className="btn_apply_now">{lang === 'ar' ?"قدم الان":"Apply Now"}</Button>
             </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default JobDescription;
