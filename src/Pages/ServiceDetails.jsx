import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";

function ServiceDetails() {
  const { id, lang } = useParams(); 
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    axios
      .get(`http://localhost:3000/services/getservicebyid/${id}/${lang}`)
      .then((response) => {
        setServiceData(response.data); 
        setLoading(false); 
      })
      .catch((error) => {
        setError(error);
        setLoading(false); 
      });
  }, [id, lang]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading service: {error.message}</div>;
  }

  return (
    <>
      <section className="main_margin_section">
        <Container>
          <Row>
            <Col xl={3} md={6} sm={12} className="cont_img_servicedetaile">
              <img
                src={`http://localhost:3000/uploads/${serviceData.image}`}
                alt="servicedetails"
                className="img_servicedetails rounded-circle"
                style={{ width: "100%", height: "auto" }} 
              />
              <Link to="/login">
                <button className="btn_servicedetails">
                  Request/inquire about the service
                  <FaPhoneAlt className="ms-2" />{" "}
                </button>
              </Link>
            </Col>
        
            <Col xl={6} md={6} sm={12}>
              <h2 className="title_servicedetails">
                {serviceData.title}
              </h2>
              <h6 className="desc_servicedetails">
                {serviceData.description}
              </h6>
            </Col>
          
            <Col xl={3} md={6} sm={12} className="cont_features_dervicedetails">
              {serviceData.features && serviceData.features.map((feature, index) => (
                <div key={index} className="d-flex align-items-center mb-3">
                  <img
                    src={`http://localhost:3000/uploads/${feature.img}`}
                    alt="features"
                    height={"50px"}
                    width={"50px"}
                    style={{ objectFit: "cover" }} 
                  />
                  <h5 className="ms-2">{feature.title}</h5>
                </div>
              ))}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xl={12} md={12} sm={12}>
              <h2 className="adv_servicedetails">
                Advantages of natural grass for gardens:
              </h2>
              <ul>
                {serviceData.advantages && serviceData.advantages.map((advantage, index) => (
                  <li key={index} className="listof_adv_servicedetails">
                    {advantage}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          <Row className="mt-5">
            <h2 className="adv_servicedetails">Pictures of our work</h2>
            {serviceData.images && serviceData.images.map((image, index) => (
              <Col key={index} xl={3} md={6} sm={12} className="mb-2">
                <img
                  src={`http://localhost:3000/uploads/${serviceData.images}`}
                  alt="our work"
                  className="rounded"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover", 
                  }}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default ServiceDetails;
