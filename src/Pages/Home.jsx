import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { FaLongArrowAltRight } from "react-icons/fa";
import "../Css/Home.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Landing from "./Landing";
import HomeSection from "./HomeSection";
import Swal from "sweetalert2";
import axios from "axios";

function Home() {
  const [heroesData, setHeroesData] = useState([]);
  const lang = location.pathname.split("/")[1] || "en";
  let linkTo;

  if (location.pathname === "/") {
    linkTo = `/${lang}/about`;
  } else if (location.pathname === "/en" || location.pathname === "/ar") {
    linkTo = "about";
  }

  useEffect(() => {
    fetch(`http://localhost:3000/heroes/allheros/${lang}`)
      .then((response) => response.json())
      .then((data) => setHeroesData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [lang]);


  const handleDelete = (heroId) => {
    Swal.fire({
      title: "Are You Sure To Delete this Hero?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/heroes/deletehero/${lang}/${heroId}`)
          .then(() => {
            setHeroesData(heroesData.filter((hero) => hero.id !== heroId));
            Swal.fire("Deleted!", "The hero has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting hero:", error);
            Swal.fire("Error", "There was an error deleting the hero.", "error");
          });
      }
    });
  };

  return (
    <>
      <section className="margin_section">
        <Carousel fade>
          {heroesData.length > 0 ? (
            heroesData.map((hero) => (
              <Carousel.Item key={hero.id} className="cont_slider">
                <img
                  src={`http://localhost:3000/uploads/${hero.image}`}
                  alt={hero.title}
                  className="slider_img"
                />
                <div className="textof_slider_home">
                  <h4 className="titleof_slide_home">
                    {hero.title || "No Title"}
                  </h4>
                  <h6 className="descof_slide_home">
                    {hero.description || "No Description"}
                  </h6>
                </div>
                <Carousel.Caption>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(hero.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/${lang}/update-hero-section/${hero.id}`}>
                    <button className="btn btn-primary">Update</button>
                  </Link>
                  <Link to="/add-hero-section">
                    <button className="btn btn-success">Add</button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          ) : (
            <p className="loading-text">Loading heroes data...</p>
          )}
        </Carousel>
      </section>

      <section className="main_margin_section">
        <Container>
          <Row>
            <Col xl={6} md={6} sm={12}>
              <h6 className="title_about_home">ABOUT US</h6>
              <h2>Introduction</h2>
              <p>
                Jordan Gardens Company is the best landscaping company in
                Jordan, where we design and landscape home and public gardens...
              </p>
              <Link to={linkTo}>
                <button className="main_btn_home">
                  {lang === "ar" ? "اقرأ المزيد" : "Read More"}
                  <FaLongArrowAltRight />
                </button>
              </Link>
            </Col>
            <Col xl={6} md={6} sm={12}>
              <img alt="about" height={"400px"} width={"100%"} />
            </Col>
          </Row>
        </Container>
      </section>

      <Landing />
      <HomeSection />
    </>
  );
}

export default Home;
