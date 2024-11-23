import { Container, Row, Col, Card } from "react-bootstrap";
import service1 from "../assets/service1.jpg";
import service2 from "../assets/servcie2.png";
import service3 from "../assets/service3.png";
import pro1 from "../assets/pro1.png";
import pro2 from "../assets/pro2.png";
import "../Css/Landing.css";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { useLocation } from "react-router-dom";
function Landing() {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  let linkToServices;
  if (location.pathname === "/") {
    linkToServices = `/${lang}/services`;
  } else if (location.pathname === "/en" || location.pathname === "/ar") {
    linkToServices = "services";
  }
  let linkToContact;
  if (location.pathname === "/") {
    linkToContact = `/${lang}/contact`;
  } else if (location.pathname === "/en" || location.pathname === "/ar") {
    linkToContact = "contact";
  }
  return (
    <>
      {/* SERVICES */}
      <section className="main_margin_section">
        <Container fluid className=" px-5 pt-1 cont_service_home">
          <h2 className="titleof_section_home text-center ">
            {lang === "ar" ? "الخدمات" : "Services"}{" "}
            <hr className="hr_line_home" />
          </h2>
          <Row>
            <Col xl={3} md={6} sm={12}>
              <Card className="card_service_home ">
                <Card.Img
                  src={service1}
                  alt="Card image"
                  className="service_home_img"
                />
                <Card.ImgOverlay className="card_overlay_home">
                  <Card.Title className="title_card_service_home">
                    Natural grass cultivation
                  </Card.Title>
                  <div className="d-flex justify-content-center">
                    <Link to={linkToServices} className="browse_service_home">
                      {lang === "ar" ? "تصفح الخدمة" : "Browse the service"}
                      <CiSettings />
                    </Link>
                    <Card.Text>
                      <Link to={linkToContact}>
                        <button className="main_btn_home btn_service_home">
                          {lang === "ar" ? "تواصل معنا" : "Contact Us"}{" "}
                          <FaPhoneAlt lassName="ms-2" />
                        </button>
                      </Link>{" "}
                    </Card.Text>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <Card className="card_service_home ">
                <Card.Img
                  src={service2}
                  alt="Card image"
                  className="service_home_img"
                />
                <Card.ImgOverlay className="card_overlay_home">
                  <Card.Title className="title_card_service_home">
                    Natural grass cultivation
                  </Card.Title>
                  <div className="d-flex justify-content-center">
                    <Link to="" className="browse_service_home">
                      Browse the service
                      <CiSettings />
                    </Link>
                    <Card.Text>
                      <Link to="/login">
                        <button className="main_btn_home btn_service_home">
                          Contact Us <FaPhoneAlt lassName="ms-2" />
                        </button>
                      </Link>{" "}
                    </Card.Text>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <Card className="card_service_home ">
                <Card.Img
                  src={service3}
                  alt="Card image"
                  className="service_home_img"
                />
                <Card.ImgOverlay className="card_overlay_home">
                  <Card.Title className="title_card_service_home">
                    Natural grass cultivation
                  </Card.Title>
                  <div className="d-flex justify-content-center">
                    <Link to="" className="browse_service_home">
                      Browse the service
                      <CiSettings />
                    </Link>
                    <Card.Text>
                      <Link to="/login">
                        <button className="main_btn_home btn_service_home">
                          Contact Us <FaPhoneAlt lassName="ms-2" />
                        </button>
                      </Link>{" "}
                    </Card.Text>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <Card className="card_service_home ">
                <Card.Img
                  src={service1}
                  alt="Card image"
                  className="service_home_img"
                />
                <Card.ImgOverlay className="card_overlay_home">
                  <Card.Title className="title_card_service_home">
                    Natural grass cultivation
                  </Card.Title>
                  <div className="d-flex justify-content-center">
                    <Link to="" className="browse_service_home">
                      Browse the service
                      <CiSettings />
                    </Link>
                    <Card.Text>
                      <Link to="/login">
                        <button className="main_btn_home btn_service_home">
                          Contact Us <FaPhoneAlt lassName="ms-2" />
                        </button>
                      </Link>{" "}
                    </Card.Text>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <Card className="card_service_home ">
                <Card.Img
                  src={service2}
                  alt="Card image"
                  className="service_home_img"
                />
                <Card.ImgOverlay className="card_overlay_home">
                  <Card.Title className="title_card_service_home">
                    Natural grass cultivation
                  </Card.Title>
                  <div className="d-flex justify-content-center">
                    <Link to="" className="browse_service_home">
                      Browse the service
                      <CiSettings />
                    </Link>
                    <Card.Text>
                      <Link to="/login">
                        <button className="main_btn_home btn_service_home">
                          Contact Us <FaPhoneAlt lassName="ms-2" />
                        </button>
                      </Link>{" "}
                    </Card.Text>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <Card className="card_service_home ">
                <Card.Img
                  src={service3}
                  alt="Card image"
                  className="service_home_img"
                />
                <Card.ImgOverlay className="card_overlay_home">
                  <Card.Title className="title_card_service_home">
                    Natural grass cultivation
                  </Card.Title>
                  <div className="d-flex justify-content-center">
                    <Link to="" className="browse_service_home">
                      Browse the service
                      <CiSettings />
                    </Link>
                    <Card.Text>
                      <Link to="/login">
                        <button className="main_btn_home btn_service_home">
                          Contact Us <FaPhoneAlt lassName="ms-2" />
                        </button>
                      </Link>{" "}
                    </Card.Text>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <Card className="card_service_home ">
                <Card.Img
                  src={service3}
                  alt="Card image"
                  className="service_home_img"
                />
                <Card.ImgOverlay className="card_overlay_home">
                  <Card.Title className="title_card_service_home">
                    Natural grass cultivation
                  </Card.Title>
                  <div className="d-flex justify-content-center">
                    <Link to="" className="browse_service_home">
                      Browse the service
                      <CiSettings />
                    </Link>
                    <Card.Text>
                      <Link to="/login">
                        <button className="main_btn_home btn_service_home">
                          Contact Us <FaPhoneAlt lassName="ms-2" />
                        </button>
                      </Link>{" "}
                    </Card.Text>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <Card className="card_service_home ">
                <Card.Img
                  src={service3}
                  alt="Card image"
                  className="service_home_img"
                />
                <Card.ImgOverlay className="card_overlay_home">
                  <Card.Title className="title_card_service_home">
                    Natural grass cultivation
                  </Card.Title>
                  <div className="d-flex justify-content-center">
                    <Link to="" className="browse_service_home">
                      Browse the service
                      <CiSettings />
                    </Link>
                    <Card.Text>
                      <Link to="/login">
                        <button className="main_btn_home btn_service_home">
                          Contact Us <FaPhoneAlt lassName="ms-2" />
                        </button>
                      </Link>{" "}
                    </Card.Text>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* PROJECTS */}
      <section className="main_margin_section">
        <Container className="">
          <h2 className="titleof_section_home text-center ">
            {lang === "ar" ? "المشاريع" : " Projects "}
            <hr className="hr_line_home" />
          </h2>
          <Row className="gallery-row">
            <div className="list">
              <img
                src={service1}
                alt=""
                height={"235px"}
                className="img_project_home"
              />
              <img
                src={pro1}
                alt=""
                height={"480px"}
                className="img_project_home"
              />
              <img
                src={pro1}
                alt=""
                height={"490px"}
                className="img_project_home"
              />
              <img
                src={pro2}
                alt=""
                height={"230px"}
                className="img_project_home"
              />
              <img
                src={service2}
                height={"490px"}
                alt=""
                className="img_project_home"
              />
              <img
                src={service1}
                alt=""
                height={"230px"}
                className="img_project_home"
              />
              <img
                src={service2}
                alt=""
                height={"235px"}
                className="img_project_home"
              />
              <img
                src={pro1}
                alt=""
                height={"480px"}
                className="img_project_home"
              />
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Landing;
