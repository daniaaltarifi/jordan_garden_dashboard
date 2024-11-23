import { Carousel, Container, Row, Col, Card } from "react-bootstrap";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import "../Css/Services.css";
function Services() {
  const lang = location.pathname.split("/")[1] || "en";

  const servicesCarousel = [
    {
      id: 1,
      title: "Landscaping",
      img: slide1,
      des: "We also provide agricultural land reclamation services, installation, operation and maintenance of irrigation systems for agricultural projects, afforestation and forestry activities, collection of non-timber forest products, as well as providing support services for forestry.",
    },

    {
      id: 1,
      title: "Landscaping Services",
      img: slide2,
      des: "Landscaping is the process of creating a beautiful, harmonious, and natural environment for your plants and animals.",
    },
  ];
  const cardServices = [
    {
      id: 1,
      title: "Garden design and coordination",
      img: slide1,
      description:
        "We also provide agricultural land reclamation services, installation, operation and maintenance of irrigation systems for agricultural projects, afforestation and forestry activities, collection of non-timber forest products, as well as providing support services for forestry.",
    },
    {
      id: 2,
      title: "Garden design and coordination",
      img: slide2,
      description:
        "Designing and installing fountains is considered one of the most important aesthetic elements in the environmental design of gardens and outdoor spaces, as it adds a touch of beauty and elegance to the place. We at Jordan Gardens Company provide fountain design and installation services using the latest technologies and high-quality materials. Fountains are designed in innovative and unique ways that meet the",
    },
    {
      id: 3,
      title: "Garden design and coordination",
      img: slide2,
      description:
        "Designing and installing fountains is considered one of the most important aesthetic elements in the environmental design of gardens and outdoor spaces, as it adds a touch of beauty and elegance to the place. We at Jordan Gardens Company provide fountain design and installation services using the latest technologies and high-quality materials. Fountains are designed in innovative and unique ways that meet the needs and desires of the client, taking into account the aesthetics of the place and the optimal use of spaces..",
    },
    {
      id: 4,
      title: "Garden design and coordination",
      img: slide1,
      description:
        "We also provide agricultural land reclamation services, installation, operation and maintenance of irrigation systems for agricultural projects, afforestation and forestry activities, collection of non-timber forest products, as well as providing support services for forestry.",
    },
    {
      id: 5,
      title: "Garden design and coordination",
      img: slide2,
      description:
        "Designing and installing fountains is considered one of the most important aesthetic elements in the environmental design of gardens and outdoor spaces, as it adds a touch of beauty and elegance to the place. We at Jordan Gardens Company provide fountain design and installation services using the latest technologies and high-quality materials. Fountains are designed in innovative and unique ways that meet the needs and desires of the client, taking into account the aesthetics of the place and the optimal use of spaces..",
    },

    {
      id: 6,
      title: "Garden design and coordination",
      img: slide1,
      description:
        "We also provide agricultural land reclamation services, installation, operation and maintenance of irrigation systems for agricultural projects, afforestation and forestry activities, collection of non-timber forest products, as well as providing support services for forestry.",
    },
  ];
  return (
    <div className="cont_services">
      <section className="margin_section ">
        <Carousel fade>
          {servicesCarousel.map((servicesCarouselItem) => (
            <Carousel.Item
              className="cont_slider"
              key={servicesCarouselItem.id}
            >
              <img
                src={servicesCarouselItem.img}
                alt="slider"
                className="slider_img"
              />
              <div className="textof_slider_home">
                <h4 className="titleof_slide_home">
                  {servicesCarouselItem.title}{" "}
                </h4>
                <h6 className="descof_slide_home">
                  {servicesCarouselItem.des}
                </h6>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* SERVICES SECTION */}
      <section className="main_margin_section ">
        <Container>
          <Row>
            {cardServices.map((services) => (
              <>
                <Col xl={4} md={6} sm={12} key={services.id}>
                  <Link to={`/${lang}/servicedetails/${services.id}`} style={{textDecoration:"none"}}>
                    <Card className="card_services">
                      <Card.Img
                        variant="top"
                        src={services.img}
                        height={"250px"}
                      />
                      <Card.Body className="card_body_services">
                        <Card.Title className="title_services">
                          {services.title}
                        </Card.Title>
                        <Card.Text className="desc_services">
                          {services.description}
                        </Card.Text>
                        <div className="d-flex justify-content-center">
                          <Link
                            to={`/${lang}/servicedetails/${services.id}`}
                            className="browse_service_home browse_services_page"
                          >
                            {lang === "ar"
                              ? "تصفح الخدمة"
                              : "Browse the service"}
                            <CiSettings />
                          </Link>
                          <Card.Text>
                            <Link to={`/${lang}/contact`}>
                              <button className="main_btn_home btn_service_home">
                                {lang === "ar" ? "تواصل معنا" : "Contact Us"}{" "}
                                <FaPhoneAlt lassName="ms-2" />
                              </button>
                            </Link>
                          </Card.Text>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              </>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Services;
