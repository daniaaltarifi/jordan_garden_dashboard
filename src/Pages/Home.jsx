import Carousel from "react-bootstrap/Carousel";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import about from "../assets/about.jpg";
import { FaLongArrowAltRight } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import "../Css/Home.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Landing from "./Landing";
import HomeSection from "./HomeSection";
function Home() {
  const lang = location.pathname.split("/")[1] || "en";
  let linkTo;

  if (location.pathname === "/") {
    linkTo = `/${lang}/about`;
  } else if (location.pathname === "/en" || location.pathname === "/ar") {
    linkTo = "about";
  }
  return (
    <>
      <section className="margin_section">
        <Carousel fade>
          <Carousel.Item className="cont_slider">
            <img src={slide1} alt="slider" className="slider_img" />
            <div className="textof_slider_home">
              <h4 className="titleof_slide_home">
                Discover why Jordan Gardens is the perfect choice
              </h4>
              <h6 className="descof_slide_home">
                Enjoy creativity with Jordan Gardens, where we combine
                experience and creativity to where we combine experience and
                creativity to turn your dreams into reality Our services include
                landscaping, installing artificial grass.
              </h6>
            </div>
            <Carousel.Caption>
              <Link to="/login">
                <button className="main_btn_home">
                  Learn More
                  <CgMoreO className="ms-2" />
                </button>
              </Link>
              <Link to="/login">
                <button className="main_btn_home">
                  Contact Us <FaPhoneAlt className="ms-2" />
                </button>
              </Link>{" "}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="cont_slider">
            <img src={slide2} alt="slider" className="slider_img" />
            <div className="textof_slider_home">
              <h4 className="titleof_slide_home">
                Discover why Jordan Gardens is the perfect choice
              </h4>
              <h6 className="descof_slide_home">
                Enjoy creativity with Jordan Gardens, where we combine
                experience and creativity to where we combine experience and
                creativity to turn your dreams into reality Our services include
                landscaping, installing artificial grass.
              </h6>
            </div>
            <Carousel.Caption>
              <Link to="/login">
                <button className="main_btn_home">
                  Learn More <CgMoreO className="ms-2" />
                </button>
              </Link>
              <Link to="/login">
                <button className="main_btn_home">
                  Contact Us <FaPhoneAlt lassName="ms-2" />
                </button>
              </Link>{" "}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="cont_slider">
            <img src={slide3} alt="slider" className="slider_img" />
            <div className="textof_slider_home">
              <h4 className="titleof_slide_home">
                Discover why Jordan Gardens is the perfect choice
              </h4>
              <h6 className="descof_slide_home">
                Enjoy creativity with Jordan Gardens, where we combine
                experience and creativity to where we combine experience and
                creativity to turn your dreams into reality Our services include
                landscaping, installing artificial grass.
              </h6>
            </div>
            <Carousel.Caption>
              <Link to="/login">
                <button className="main_btn_home">
                  Learn More
                  <CgMoreO className="ms-2" />
                </button>
              </Link>
              <Link to="/login">
                <button className="main_btn_home">
                  Contact Us <FaPhoneAlt lassName="ms-2" />
                </button>
              </Link>{" "}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {/* ABOUT SECTION */}
      </section>
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
              <Link to={linkTo}>
                <button className="main_btn_home">
                  {lang ==='ar' ? "اقرأ المزيد":"Read More"}
                  <FaLongArrowAltRight />
                </button>
              </Link>
            </Col>
            <Col xl={6} md={6} sm={12}>
              <img
                src={about}
                alt="about"
                height={"400px"}
                width={"100%"}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <Landing/>
      <HomeSection/>
    </>
  );
}

export default Home;
