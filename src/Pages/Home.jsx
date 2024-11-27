import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../Css/Home.css";
import { Link } from "react-router-dom";
import HomeSection from "./HomeSection";
import Swal from "sweetalert2";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
// import Header from "../Component/Header";
function Home() {
  const [heroesData, setHeroesData] = useState([]);
  const lang = location.pathname.split("/")[1] || "en";

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
            Swal.fire(
              "Error",
              "There was an error deleting the hero.",
              "error"
            );
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
                    className="btn btn-danger btn-icon"
                    onClick={() => handleDelete(hero.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> 
                  </button>
                  <Link to={`/${lang}/update-hero-section/${hero.id}`}>
                    <button className="btn btn-primary btn-icon">
                      <FontAwesomeIcon icon={faPen} /> 
                    </button>
                  </Link>
                  <Link to="/add-hero-section">
                    <button className="btn btn-success btn-icon">
                      <FontAwesomeIcon icon={faPlus} /> 
                    </button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          ) : (
            <p className="loading-text">Loading heroes data...</p>
          )}
        </Carousel>
      </section>

      <HomeSection />
    </>
  );
}

export default Home;
