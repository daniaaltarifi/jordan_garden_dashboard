import { Container, Row, Col } from "react-bootstrap";
import slide1 from "../assets/slide1.jpg";
import cert from "../assets/cert.png";
import serv1 from "../assets/serv1.png";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import service1 from "../assets/service1.jpg";
import service2 from "../assets/servcie2.png";
import service3 from "../assets/service3.png";
function ServiceDetails() {
  const featuresServices = [
    {
      title: "Customizable Design",
      img: cert,
    },
    {
        title: "Test garden designs",
        img: serv1,
      },
      {
        title: "Best landscaping prices",
        img: cert,
      },
  ];
  return (
    <>
      <section className="main_margin_section">
        <Container>
          <Row>
            {/* IMAGE SECTION */}
            <Col xl={3} md={6} sm={12} className="cont_img_servicedetaile">
              <img
                src={slide1}
                alt="servicedetails"
                className="img_servicedetails rounded-circle"
              />
              <Link to="/login">
                <button className="btn_servicedetails">
                  Request/inquire about the service
                  <FaPhoneAlt className="ms-2" />{" "}
                </button>
              </Link>
            </Col>
            {/* DEATILS SECTION */}
            <Col xl={6} md={6} sm={12}>
              <h2 className="title_servicedetails">
                Garden design and coordination
              </h2>
              <h6 className="desc_servicedetails">
                Installing artificial grass is an ideal solution to have a green
                garden that is always beautiful without the need for constant
                maintenance. We at Jordan Gardens Company provide artificial
                grass installation services with the highest standards of
                quality and professionalism. Artificial grass is carefully
                selected to ensure its quality and durability, taking into
                account the individual needs of each customer and the
                specifications of the project. The grass is installed with
                precision and high professionalism, ensuring that it is evenly
                and cohesively distributed throughout the area designated for
                the garden. Through the artificial grass installation service,
                our customers can enjoy a green garden that is always beautiful
                without the need for constant watering and worrying about
                maintenance. Artificial grass also provides an attractive and
                natural appearance that adds a comfortable and refreshing
                atmosphere to outdoor spaces.
              </h6>
            </Col>
            {/* FEATURES SECTION */}
            <Col xl={3} md={6} sm={12} className="cont_features_dervicedetails">
              {featuresServices.map((feature) => (
                <>
                  <div className="d-flex align-items-center">
                    <img
                      src={feature.img}
                      alt="features"
                      height={"50px"}
                      width={"50px"}
                    />
                    <h5 >{feature.title}</h5>
                  </div>
                </>
              ))}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xl={12} md={12} sm={12}>
              <h2 className="adv_servicedetails">Advantages of natural grass for gardens:</h2>
              <ul>
                <li className="listof_adv_servicedetails">Natural grass has a natural and elegant appearance, making gardens and green spaces look like part of nature.</li>
                <li className="listof_adv_servicedetails">Natural grass has a soft, gentle feel to the feet, making it comfortable to walk, sit and relax on.</li>
                <li className="listof_adv_servicedetails">Natural grass has a natural and elegant appearance, making gardens and green spaces look like part of nature.</li>
              </ul>
            </Col>
          </Row>
          <Row className="mt-5">
            <h2 className="adv_servicedetails">Pictures of our work</h2>
            <Col xl={3} md={6} sm={12} className="mb-2">
            <img src={slide1} alt="our work" height={"200px"} width={"100%"} className="rounded"/>
            </Col>
            <Col xl={3} md={6} sm={12}className="mb-2">
            <img src={service1} alt="our work" height={"200px"} width={"100%"} className="rounded"/>
            </Col>
            <Col xl={3} md={6} sm={12}className="mb-2">
            <img src={service2} alt="our work" height={"200px"} width={"100%"} className="rounded"/>
            </Col>
            <Col xl={3} md={6} sm={12}className="mb-2">
            <img src={service3} alt="our work" height={"200px"} width={"100%"} className="rounded"/>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default ServiceDetails;
