import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
// import about2 from "../../assets/about2.png";
import { FaPhoneAlt } from "react-icons/fa";

// import logo from "../../assets/logo.png";

import { MdEdit } from "react-icons/md";
import "../../Css/About.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../App";
function About() {
  const lang = location.pathname.split("/")[1] || "en";
  const [about, setAbout] = useState([]);
  const [company, setCompany] = useState([]);
  const [logo, setLogo] = useState([]);

  // const getAbout = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/about/allaboutes/${lang}`);
  //     setAbout(response.data);
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };
  const getAbout = async () => {
    try {
      const [AboutRes, whyCompanyRes, logoRes] = await Promise.all([
        axios.get(`${API_URL}/about/allaboutes/${lang}`),
        axios.get(`${API_URL}/choose/allchoosecompanies/${lang}`),
        axios.get(`${API_URL}/logoes/getalllogos/${lang}`)
      ]);
      setAbout(AboutRes.data);
      setCompany(whyCompanyRes.data);
      setLogo(logoRes.data);


    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getAbout();
  }, [lang]);

  return (
    <>
      <section className="main_margin_section">
        <Container>
          <Row>
            {about.map((about) => (
              <>
                <Col xl={6} md={6} sm={12} key={about.id}>
                  <h6 className="title_about_home">
                    {lang === "ar" ? "عن حدائق الاردن" : "ABOUT US"}
                  </h6>
                  <h2>{about.title}</h2>
                  <p>{about.description}</p>
                  <Link to={`/${lang}/contact`}>
                    <button className="main_btn_home">
                      {about.title_btn}
                      <FaPhoneAlt />
                    </button>
                  </Link>
                </Col>
                <Col xl={6} md={6} sm={12}>
                  <img
                    src={`${API_URL}/uploads/${about.image}`}
                    alt="about"
                    height={"400px"}
                    width={"100%"}
                  />
                </Col>
                <Link to={`/${lang}/updateabout/${about.id}`}>
                  <button className="main_btn_home">
                    {lang === "ar" ? "تعديل" : "Update"}
                    <MdEdit />
                  </button>
                </Link>
              </>
            ))}
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
            {/* First Column: First two items */}
            <Col xl={4} md={4} sm={12}>
              {company.slice(0, 2).map((comp, index) => (
                <div key={comp.id || index}>
                  <img
                    src={`${API_URL}/uploads/${comp.image}`}
                    alt="cert"
                    height={"50px"}
                    width={"50px"}
                    className="rounded-circle"
                  />
                  <div className="d-flex justify-content-center">
                    <h5 className="text_why_choose_about">{comp.title}</h5>
                    <Link to={`/${lang}/updatecompany/${comp.id}`}>
                      <MdEdit className="mt-3 mx-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </Col>

            <Col xl={4} md={4} sm={12}>
              {logo.map((log) => (
                <div key={log.id}>
                  <img
                    src={`${API_URL}/uploads/${log.image}`}
                    alt="Logo"
                    height={"220px"}
                    width={"150px"}
                  />
                </div>
              ))}
            </Col>
            <Col xl={4} md={4} sm={12}>
              {company.slice(2, 4).map((comp, index) => (
                <div key={comp.id || index}>
                  <img
                    src={`${API_URL}/uploads/${comp.image}`}
                    alt="cert"
                    height={"50px"}
                    width={"50px"}
                    className="rounded-circle"
                  />
                  <div className="d-flex justify-content-center">
                    <h5 className="text_why_choose_about">{comp.title}</h5>
                    <Link to={`/${lang}/updatecompany/${comp.id}`}>
                      <MdEdit className="mt-3 mx-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default About;
