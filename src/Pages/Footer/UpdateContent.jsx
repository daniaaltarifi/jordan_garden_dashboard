import axios from "axios";
import { Container,Form, Button, Col, Row } from "react-bootstrap";
import { API_URL } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function UpdateContent() {
  const { id } = useParams();
  const lang = location.pathname.split("/")[1] || "en";
const navigate=useNavigate()
  const [contentData, setcontentData] = useState({
      title: "",
    link: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setcontentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    window.scrollTo(0,0)
    const getcontentById = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/allcontents/getcontentbyid/${id}/${lang}`
        );
        setcontentData(response.data);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Connection error!",
          text: "We could not connect to the server, please try again later.",
        });
      }
    };
    getcontentById();
  }, [lang]);
    const updateContUpdateContent= async (e) => {
        e.preventDefault()
    //   const formData=new FormData()
    //   formData.append('title', contentData.title);
    //   if (contentData.link) {
    //     formData.append('icon', contentData.link); // Only append link if it exists
    //   }
      try {
       await axios.put(`${API_URL}/allcontents/updatecontents/${id}/${lang}`, contentData);
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
    }
  return (
    <section className="main_margin_section">

    <Container>
      <Form onSubmit={updateContUpdateContent}>
        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formTitle">
              <Form.Label>{lang === "ar" ? "العنوان" : "title"}</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={contentData.title}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formTitle">
              <Form.Label>{lang === "ar" ? "الرابط" : "Link"}</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={contentData.link}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
      
        <Button variant="success" type="submit" className="w-50">
          {lang === "ar" ? "تعديل" : "Submit"}
        </Button>
      </Form>
    </Container>
    </section>

  );
}

export default UpdateContent;
