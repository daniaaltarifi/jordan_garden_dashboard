import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/logo.png";
import phone from "../assets/phone.png";
import whats from "../assets/whats.png";
import email from "../assets/email.png";
import arrow from "../assets/arrow.png";
import "../Css/Footer.css";
function Footer() {
  const lang = location.pathname.split("/")[1] || "en";

  return (
    <>
      <section className="main_margin_section">
        <Container fluid className="cont_footer">
          <Row>
            <Col xl={3} md={6} sm={12}>
              <img src={logo} alt="" height={"150px"} width={"150px"} />
              <h6 className="desc_footer">
                Jordan Gardens Company is the best landscaping company in
                Jordan, where we design and landscape home and public gardens,
                supply and install artificial grass f
              </h6>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <h4 className="desc_footer">{lang === 'ar' ? "تواصل معنا":"Contact-US"}</h4>
              <hr className="hr_footer" />
              <div className="col_contact_footer">
                <div>
                  <img src={phone} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">05-6958712</span>
                </div>
                <div>
                  <img src={whats} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">05-6958712</span>
                </div>
                <div>
                  <img src={email} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">05-6958712</span>
                </div>
              </div>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <h4 className="desc_footer">{lang === 'ar' ? "المحتوى":"All Content"}</h4>
              <hr className="hr_footer" />
              <div className="col_contact_footer">
                <div>
                  <img src={arrow} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">Home</span>
                </div>
                <div>
                  <img src={arrow} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">About</span>
                </div>
                <div>
                  <img src={arrow} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">Services</span>
                </div>
                <div>
                  <img src={arrow} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">Projects</span>
                </div>
                <div>
                  <img src={arrow} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">Blogs</span>
                </div>
                <div>
                  <img src={arrow} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">Careers</span>
                </div>
                <div>
                  <img src={arrow} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">Contact</span>
                </div>
              </div>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <h4 className="desc_footer">{lang === 'ar' ? "السياسة والخصوصية":"Privacy And Policy"}</h4>
              <hr className="hr_footer" />
              <h6 className="desc_footer">
                Lorem ipsum dolor sit amet, consectetur adipisci ng elit.
                Vivamus hendrerit suscipit egestas. Nun eget congue ante.
                Vivamus ut sapien et ex vol utpat tincidunt eget at felis...
                Lorem ipsum dolor sit amet, consectetur adipisci ng elit.
                Vivamus hendrerit suscipit egestas. Nun eget congue ante.
                Vivamus ut sapien et ex vol utpat tincidunt eget at felis...
              </h6>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Footer;
