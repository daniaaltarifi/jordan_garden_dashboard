import axios from "axios";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { API_URL } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function UpdateSocial() {
  const { id } = useParams();
  const lang = location.pathname.split("/")[1] || "en";
  const navigate = useNavigate();

  const [socialData, setsocialData] = useState({
    content: "",
    icon: null,   
    currentIcon: "",  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsocialData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setsocialData((prevData) => ({
      ...prevData,
      icon: file, 
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const getLogoById = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/contacts/getcontactbyid/${id}/${lang}`
        );
        setsocialData({
          content: response.data.content,
          icon: null,  
          currentIcon: response.data.icon ? response.data.icon : "",  
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
    getLogoById();
  }, [id, lang]);

  const updateSocial = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", socialData.content);
    if (socialData.icon) {
      formData.append("icon", socialData.icon);  
    }

    try {
      await axios.put(`${API_URL}/contacts/updatecontact/${id}/${lang}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      Swal.fire({
        icon: "success",
        title: "Updated Successfully!",
        text: "Updated Successfully.",
      }).then(() => {
        navigate(`/${lang}`);
      });
    } catch (error) {
      console.log("error: ", error);
      Swal.fire({
        icon: "error",
        title: "Connection error!",
        text: "We could not connect to the server, please try again later.",
      });
    }
  };

  return (
    <section className="main_margin_section">
      <Container>
        <Form onSubmit={updateSocial}>
          <Row className="mb-3">
            <Col xl={6} md={6} sm={12}>
              <Form.Group controlId="formTitle">
                <Form.Label>{lang === "ar" ? "المحتوى" : "Content"}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="content"
                  value={socialData.content}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xl={6} md={6} sm={12}>
              <Form.Group controlId="formImage" className="mb-3">
                <Form.Label>
                  {lang === "ar" ? "تحميل الصورة" : "Upload Icon"}
                </Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>
            </Col>
          </Row>

          {socialData.currentIcon && (
            <Row className="mb-3">
              <Col xl={6} md={6} sm={12}>
                <Form.Label>
                  {lang === "ar" ? "الصورة الحالية" : "Current Icon"}
                </Form.Label>
                <img
                  src={`${API_URL}/uploads/${socialData.currentIcon}`}
                  alt="current-social-icon"
                  className="img-fluid mb-3"
                />
              </Col>
            </Row>
          )}

          <Button variant="success" type="submit" className="w-50">
            {lang === "ar" ? "تعديل" : "Submit"}
          </Button>
        </Form>
      </Container>
    </section>
  );
}

export default UpdateSocial;
