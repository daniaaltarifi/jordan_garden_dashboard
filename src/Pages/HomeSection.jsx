import { Carousel } from "react-bootstrap";
import customer from "../assets/customer.jpg";
import comment from "../assets/comment.png";
import axios from "axios";
import { API_URL } from "../App";
import { useEffect, useState } from "react";






function HomeSection() {
  const lang = location.pathname.split("/")[1] || "en";
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    const getFeedback = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/feedbacks/getallfeedbacks/${lang}`
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.log("error:", error);
      }
    };
    getFeedback();
  }, []);
  return (
    <>
      {/* WHY OUR CUSTOMER SAY */}
      <section className="main_margin_section">
      {feedbacks.length > 0 ? (
  <Carousel fade>
    {feedbacks.map((feedback) => (
      <Carousel.Item key={feedback.id} className="cont_slider">
        <img src={customer} alt="slider" className="slider_img" />
        <div className="textof_slider_home">
          <h4 className="titleof_slide_home">
            {lang === "ar"
              ? "ماذا يقول عملائنا عنا؟"
              : " What our customers say about us ?"}
          </h4>
          <div className="cont_customer_home">
            <img src={comment} alt="" />
            <h6 className="descof_slide_home">{feedback.description}</h6>
          </div>
        </div>
      </Carousel.Item>
    ))}
  </Carousel>
) : (
  <p>No feedback</p>
)}

      </section>
    </>
  );
}

export default HomeSection;
