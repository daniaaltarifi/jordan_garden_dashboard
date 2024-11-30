import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../App";
import { Form, Button, Col, Row } from "react-bootstrap";

function UpdateAdvantage() {
  const { id, lang } = useParams(); 
  const navigate = useNavigate(); 
  const [services, setServices] = useState([]);

  const [advData, setadvData] = useState({
    title: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/services/allservices/${lang}`)
      .then((response) => {
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, [lang]);

  useEffect(() => {
    axios
      .get(`${API_URL}/advantages/getadvantagesnbyid/${id}/${lang}`)
      .then((response) => {
        setadvData(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching feature data:", error);
        setError("Failed to load feature data");
        setLoading(false);
      });
  }, [id, lang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setadvData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    axios
      .put(`${API_URL}/advantages/updateadvantages/${id}/${lang}`, {
        title: advData.title,
        service_id: advData.service_id,
        lang: advData.lang,
      }
      )
      .then((response) => {
        if (response.status === 200) {
     
            Swal.fire({
              title: lang === "ar" ? "تم تحديث ايجابيات الخدمة بنجاح" : "The Advantage Services  Updated Successfully",
              icon: "success",
              confirmButtonText: lang === "ar" ? "موافق" : "OK",
            }).then(() => {
           
              navigate(`/${lang}/services`);
            });
          }
     
      })
      .catch((error) => {
        console.error("Error updating Advantage:", error);
        setError("Failed to update Advantage");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
  <div className="container">
      <section className="update-feature-section mt-5">
      <h2>Update Advantage Service </h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={advData.title}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
<Row>
<Form.Group className="mb-3">
          <Form.Label>
            {advData.lang === "ar" ? "الخدمة" : "Service"}
          </Form.Label>
          <Form.Select
            name="service_id"
            value={advData.service_id}
            onChange={handleChange}
            required
          >
            <option value="">
              {advData.lang === "ar" ? "اختر خدمة" : "Select a service"}
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

</Row>
        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formLang">
              <Form.Label>Language</Form.Label>
              <Form.Control
                as="select"
                name="lang"
                value={advData.lang}
                onChange={handleChange}
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

       
        <Button variant="primary" type="submit" className="w-100 btn btn-success">
          Submit
        </Button>
      </Form>
    </section>
  </div>
  );
}

export default UpdateAdvantage;
