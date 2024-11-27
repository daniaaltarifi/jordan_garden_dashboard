import { useState, useEffect } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../App";

export default function UpdateService() {
  const { id, lang } = useParams(); 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    lang: "en",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/services/getservicebyid/${id}/${lang}`)
      .then((response) => {
        setFormData({
          title: response.data.title,
          description: response.data.description,
          image: response.data.image, 
          lang: response.data.lang,
        });
      })
      .catch((error) => {
        console.error("Error fetching service data:", error);
        setMessage({ type: "error", text: "Failed to load service data." });
      });
  }, [id, lang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    dataToSend.append("lang", formData.lang);

    if (formData.image) {
      dataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.put(
        `${API_URL}/services/updateservice/${id}/${lang}`,
        dataToSend
      );
      console.log("Response:", response);

      setMessage({ type: "success", text: "Service updated successfully!" });

      Swal.fire({
        icon: "success",
        title: "Service Updated!",
        text: "The service has been successfully updated.",
      }).then(() => {
        navigate(`/services/${lang}`); 
      });

      setFormData({
        title: "",
        description: "",
        image: null,
        lang: "en",
      });
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "There was an error connecting to the server." });

      Swal.fire({
        icon: "error",
        title: "Connection error!",
        text: "We could not connect to the server, please try again later.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update Service</h2>

      {message && (
        <Alert variant={message.type === "success" ? "success" : "danger"}>
          {message.text}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formLang">
              <Form.Label>Language</Form.Label>
              <Form.Control
                as="select"
                name="lang"
                value={formData.lang}
                onChange={handleChange}
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formImage" className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
          <div className="mt-2">
            {formData.image && (
              <>
                <p>{formData.image.name}</p>
                <img
                  src={`${API_URL}/uploads/${formData.image.name}`}
                  alt="Service"
                  style={{ width: "100%", height: "auto", marginTop: "10px" }}
                />
              </>
            )}
            {formData.image && !formData.image.name && formData.image && (
              <img
                src={`${API_URL}/uploads/${formData.image}`}
                alt="Service"
                style={{ width: "190px", height:"190px", marginTop: "10px" }}
              />
            )}
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 btn btn-success">
          Submit
        </Button>
      </Form>
    </div>
  );
}
