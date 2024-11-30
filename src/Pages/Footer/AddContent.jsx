import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../App";

function AddContent() {
  const lang = location.pathname.split("/")[1] || "en";
  const [formData, setFormData] = useState({
    title: "",
    link: null,
    lang: "en",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Sending the formData object as the request body
       await axios.post(
        `${API_URL}/allcontents/createcontent`,
        formData,  // Send the entire formData as the body
      );
      
  
      Swal.fire({
        icon: "success",
        title: "Added Successfully!",
        text: "Content has been added successfully.",
      }).then(() => {
        navigate(`/${lang}`);
      });
  
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Connection error!",
        text: "We could not connect to the server, please try again later.",
      });
    }
  };
  
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        {lang === "ar" ? "اضافة محتوى" : "Add Content"}
      </h2>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xl={12} md={6} sm={12}>
            <Form.Group controlId="formtitle">
              <Form.Label>{lang === "ar" ? "العنوان" : "title"}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xl={12} md={6} sm={12}>
            <Form.Group controlId="formtitle">
              <Form.Label>{lang === "ar" ? "الرابط" : "Link"}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xl={12} md={6} sm={12}>
            <Form.Group controlId="formLang">
              <Form.Label>{lang === "ar" ? "اللغة" : "Language"}</Form.Label>
              <Form.Control
                as="select"
                name="lang"
                value={formData.lang}
                onChange={handleChange}
                required
              >
                <option value="en">
                  {lang === "ar" ? "انجليزي" : "English"}
                </option>
                <option value="ar">{lang === "ar" ? "عربي" : "Arabic"}</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="success" type="submit" className="w-100">
          {lang === "ar" ? "اضافة" : "Submit"}
        </Button>
      </Form>
    </div>
  );
}
export default AddContent;
