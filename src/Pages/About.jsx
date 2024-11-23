import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import about2 from "../assets/about2.png";
import { FaPhoneAlt } from "react-icons/fa";
import cert from "../assets/cert.png";
import why from "../assets/why.png";
import logo from "../assets/logo.png";
import serv1 from "../assets/serv1.png";
import serv2 from "../assets/serv2.png";

import "../Css/About.css";
function About() {
  const lang = location.pathname.split("/")[1] || "en";

  const servicesAbout = [
    {
      title: "Garden design and coordination",
      icon: serv1,
    },
    {
      title:
        "Artificial grass installation for gardens and playgroundsArtificial grass installation for gardens and playgrounds",
      icon: serv2,
    },
    {
      title: "Planting natural grass, trees, flowers and palm trees",
      icon: serv1,
    },
    {
      title: "Garden design and coordination",
      icon: serv1,
    },
    {
      title: "Artificial grass installation for gardens and playgrounds",
      icon: serv2,
    },
    {
      title: "Planting natural grass, trees, flowers and palm trees",
      icon: serv1,
    },

    {
      title: "Artificial grass installation for gardens and playgrounds",
      icon: serv2,
    },
    {
      title: "Planting natural grass, trees, flowers and palm trees",
      icon: serv1,
    },
  ];
  return (
    <>
      <section className="main_margin_section">
        <Container>
          <Row>
            <Col xl={6} md={6} sm={12}>
              <h6 className="title_about_home">ABOUT US</h6>
              <h2>Introduction</h2>
              <p>
                Jordan Gardens Company is the best landscaping company in
                Jordan, where we design and landscape home and public gardens,
                supply and install artificial grass for gardens and playgrounds,
                as well as planting natural grass, trees, roses and palms,
                installing waterfalls and home fountains, and making various
                agricultural decorations, in addition to designing and
                installing canopies and pergolas at the highest level. We also
                provide agricultural land reclamation services, installation and
                operation of irrigation systems for agricultural projects and
                their maintenance, planting forests and forestry activities,
                collecting non-timber forest products, in addition to providing
                support services for forestry. All these services are provided
                by an integrated and specialized team of agricultural engineers,
                technicians and workers with more than 10 years of experience in
                this field. Enjoy the beauty of nature in your gardens with us,
                and call now
              </p>
              <Link to={`/${lang}/contact`}>
                <button className="main_btn_home">
                  {lang === "ar" ? "تواصل معنا" : " Contact Us "}
                  <FaPhoneAlt />
                </button>
              </Link>
            </Col>
            <Col xl={6} md={6} sm={12}>
              <img src={about2} alt="about" height={"400px"} width={"100%"} />
            </Col>
          </Row>
        </Container>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="main_margin_section">
        <Container fluid className=" py-5 cont_why_choose text-center">
          <h3 className="title_why_choose_about">
            {lang === "ar"
              ? "لماذا تختار شركة حدائق الأردن لتنسيق الحدائق؟"
              : " Why choose Jordan Gardens Company for landscaping?"}
          </h3>
          <Row>
            <Col xl={4} md={4} sm={12}>
              <img
                src={cert}
                alt="cert"
                height={"50px"}
                width={"50px"}
                className="rounded-circle"
              />
              <h5 className="text_why_choose_about">
                High quality landscaping services
              </h5>
              <img
                src={why}
                alt="cert"
                height={"50px"}
                width={"50px"}
                className="rounded-circle"
              />
              <h5 className="text_why_choose_about">
                Completion of huge projects
              </h5>
            </Col>
            <Col xl={4} md={4} sm={12}>
              <img src={logo} alt="" height={"220px"} width={"150px"} />
            </Col>
            <Col xl={4} md={4} sm={12}>
              <img
                src={cert}
                alt="cert"
                height={"50px"}
                width={"50px"}
                className="rounded-circle"
              />
              <h5 className="text_why_choose_about">
                High quality landscaping services
              </h5>
              <img
                src={why}
                alt="cert"
                height={"50px"}
                width={"50px"}
                className="rounded-circle"
              />
              <h5 className="text_why_choose_about">
                Completion of huge projects
              </h5>
            </Col>
          </Row>
        </Container>
      </section>
      {/* OUR SERVICES SECTION */}
      <section className="main_margin_section">
        <Container fluid>
          <h2 className="titleof_section_home text-center">
            {lang === "ar" ? "خدماتنا" : " Our Services"}
            <hr className="hr_line_home" />
          </h2>
          <Row>
            {servicesAbout.map((serv) => (
              <>
                <Col xl={3} md={6} sm={12} className="mb-4">
                  <Card border="warning" className="card_service_about">
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                      <img
                        src={serv.icon}
                        height={"80px"}
                        width={"80px"}
                        className="rounded-circle"
                        alt="Service"
                      />
                      <Card.Title className="mt-2 title_serv_about">
                        {serv.title}{" "}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            ))}
            <Link
              to={`/${lang}/services`}
              className="d-flex justify-content-center align-items-center"
              style={{ textDecoration: "none" }}
            >
              <button className="main_btn_home ">
                {lang === "ar" ? "شاهد المزيد" : "Show More  "}
              </button>
            </Link>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default About;
