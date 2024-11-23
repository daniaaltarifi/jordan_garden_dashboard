import { Container, Row, Col, Card, Carousel } from "react-bootstrap";
import blog1 from "../assets/blog1.png";
import customer from "../assets/customer.jpg";
import comment from "../assets/comment.png";
import { Link } from "react-router-dom";
function HomeSection() {
  const lang = location.pathname.split("/")[1] || "en";
  let linkToBlogs;
  if (location.pathname === "/") {
    linkToBlogs = `/${lang}/blogs`;
  } else if (location.pathname === "/en" || location.pathname === "/ar") {
    linkToBlogs = "blogs";
  }
  return (
    <>
      <section className="main_margin_section">
        <Container>
          <h2 className="titleof_section_home  text-center">
           {lang === 'ar' ? "المقالات و المدونات":" Blog And Articles "}<hr className="hr_line_home" />
          </h2>
          <Row>
            <Col xl={4} md={6} sm={12} className="cont_blog_home">
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={blog1}
                  height={"200px"}
                  className="blog_img_home"
                />
                <Card.Body>
                  <Card.Title className="title_blog_home">
                    Choosing the Right Plants for Your Climate Zone
                  </Card.Title>
                  <Card.Text className="blog_desc_home">
                    Lorem ipsum dolor sit amet, consectetur adipisci ng elit.
                    Vivamus hendrerit suscipit egestas. Nun eget congue ante.
                    Vivamus ut sapien et ex vol utpat tincidunt eget at felis
                  </Card.Text>
                  <Link to={linkToBlogs}>
                    <button className="main_btn_home w-100">{lang === 'ar' ? "اقرأ المزيد":"Read More"} </button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={4} md={6} sm={12} className="cont_blog_home">
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={blog1}
                  height={"200px"}
                  className="blog_img_home"
                />
                <Card.Body>
                  <Card.Title className="title_blog_home">
                    Choosing the Right Plants for Your Climate Zone
                  </Card.Title>
                  <Card.Text className="blog_desc_home">
                    Lorem ipsum dolor sit amet, consectetur adipisci ng elit.
                    Vivamus hendrerit suscipit egestas. Nun eget congue ante.
                    Vivamus ut sapien et ex vol utpat tincidunt eget at felis
                  </Card.Text>
                  <Link to="/login">
                    <button className="main_btn_home w-100">Read More </button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={4} md={6} sm={12} className="cont_blog_home">
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={blog1}
                  height={"200px"}
                  className="blog_img_home"
                />
                <Card.Body>
                  <Card.Title className="title_blog_home">
                    Choosing the Right Plants for Your Climate Zone
                  </Card.Title>
                  <Card.Text className="blog_desc_home">
                    Lorem ipsum dolor sit amet, consectetur adipisci ng elit.
                    Vivamus hendrerit suscipit egestas. Nun eget congue ante.
                    Vivamus ut sapien et ex vol utpat tincidunt eget at felis
                  </Card.Text>
                  <Link to="/login">
                    <button className="main_btn_home w-100">Read More </button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      {/* WHY OUR CUSTOMER SAY */}
      <section className="main_margin_section">
        <Carousel fade>
          <Carousel.Item className="cont_slider">
            <img src={customer} alt="slider" className="slider_img" />
            <div className="textof_slider_home">
              <h4 className="titleof_slide_home">
               {lang === 'ar' ? "ماذا يقول عملائنا عنا؟":" What our customers say about us ?"}
              </h4>
              <div className="cont_customer_home">
                <img src={comment} alt="" />
                <h6 className="descof_slide_home">
                  The most beautiful and wonderful agricultural decorations ever
                  in this company The company made agricultural decorations in
                  my home garden as well as on many of the interior walls of the
                  house, which gave my home and garden a beautiful view.
                </h6>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item className="cont_slider">
            <img src={customer} alt="slider" className="slider_img" />
            <div className="textof_slider_home">
              <h4 className="titleof_slide_home">
                What our customers say about us ?{" "}
              </h4>
              <div className="cont_customer_home">
                <img src={comment} alt="" />
                <h6 className="descof_slide_home">
                  The most beautiful and wonderful agricultural decorations
                </h6>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>{" "}
      </section>
    </>
  );
}

export default HomeSection;
