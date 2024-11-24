import axios from "axios";
import { Container,Form, Button, Col, Row } from "react-bootstrap";
import { API_URL } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function UpdateLogo() {
  const { id } = useParams();
  const lang = location.pathname.split("/")[1] || "en";
const navigate=useNavigate()
  const [logoData, setLogoData] = useState({
      description: "",
    image: null,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setLogoData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  useEffect(() => {
    window.scrollTo(0,0)
    const getLogoById = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/logoes/getlogobyid/${id}/${lang}`
        );
        setLogoData(response.data);
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
  }, [lang]);
    const updateLogo= async (e) => {
        e.preventDefault()
      const formData=new FormData()
      formData.append('description', logoData.description);
      if (logoData.image) {
        formData.append('image', logoData.image); // Only append image if it exists
      }
      try {
        await axios.put(`${API_URL}/logoes/updatelogo/${id}/${lang}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Ensure the request is sent as multipart/form-data
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
    }
  return (
    <section className="main_margin_section">

    <Container>
      <Form onSubmit={updateLogo}>
        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formTitle">
              <Form.Label>{lang === "ar" ? "الوصف" : "Description"}</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="description"
                value={logoData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>
                {lang === "ar" ? "تحميل الصور" : "Upload Image"}
              </Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
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

export default UpdateLogo;
