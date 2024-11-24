import { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../App";

function AddProject() {
  const lang = location.pathname.split("/")[1] || "en";
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    location: "",
    service_id: "",
    lang: "en",
  });
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      image: files,
    }));
  };
  const getServices = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/services/allservices/${lang}`
      );
      setServices(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    getServices();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    dataToSend.append("service_id", formData.service_id);
    dataToSend.append("location", formData.location);
    dataToSend.append("lang", formData.lang);

    if (formData.image && formData.image.length > 0) {
      formData.image.forEach((file) => {
        dataToSend.append("image", file);
      });
    }

    try {
      const response = await axios.post(
        `${API_URL}/projects/createproject`,
        dataToSend
      );
      console.log("Response:", response);


      Swal.fire({
        icon: "success",
        title: lang ==='ar' ?"تمت الاضافة بنجاح":"Added Successfully!",
        text: lang ==='ar' ?"تمت الاضافة بنجاح":"Added Successfully!",
      }).then(() => {
        navigate(`/${lang}/projects`);
      });
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: lang ==='ar' ?"حدث خطأ ما":"Connection error!",
        text: lang ==='ar' ?"لم نتمكن من الاتصال بالخادم، يرجى المحاولة مرة أخرى لاحقًا.":"We could not connect to the server, please try again later.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{lang ==='ar' ?"اضافة مشروع":"Add Project"}</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formTitle">
              <Form.Label>{lang ==='ar' ?"العنوان":"Title"}</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formlocation">
              <Form.Label>{lang ==='ar' ?"الموقع":"location"}</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formdescription">
              <Form.Label>{lang ==='ar' ?"الوصف":"description"}</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formLang">
              <Form.Label>{lang ==='ar' ?"الخدمة":"service"}</Form.Label>
              <Form.Control
                as="select"
                name="service_id"
                value={formData.service_id}
                onChange={handleChange}
              >
                {services.map((service) => (
                  <>
                    <option value="">{lang ==='ar' ?"اختر الخدمة":"Select service"}</option>
                    <option key={service._id} value={service.id}>
                      {service.title}
                    </option>
                  </>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formLang">
              <Form.Label>{lang ==='ar' ?"اللغة":"Language"}</Form.Label>
              <Form.Control
                as="select"
                name="lang"
                value={formData.lang}
                onChange={handleChange}
              >
                <option value="en"> {lang ==='ar' ?"انجليزي":"English"}</option>
                <option value="ar">{lang ==='ar' ?"عربي":"Arabic"}</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formImage" className="mb-3">
          <Form.Label>{lang ==='ar' ?"تحميل الصور":"Upload Images"}</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} multiple />
          <div className="mt-2">
            {formData.image && formData.image.length > 0 && (
              <ul>
                {formData.image.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          {lang ==='ar' ?"اضافة":"Submit"}
        </Button>
      </Form>
    </div>
  );
}
export default AddProject;
