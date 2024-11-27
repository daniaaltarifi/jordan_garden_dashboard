import { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../App";
const lang = location.pathname.split("/")[1] || "en";
function AddFeatureServices() {
  const navigate = useNavigate(); 
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    feature_name: "",
    description: "",
    service_id: "",
    lang: "en",
    image: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/services/allservices/${formData.lang}`)
      .then((response) => {
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, [formData.lang]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], 
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.service_id) {
      Swal.fire(
        formData.lang === "ar" ? "خطأ" : "Error",
        formData.lang === "ar"
          ? "يرجى اختيار الخدمة."
          : "Please select a service.",
        "error"
      );
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.feature_name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("service_id", formData.service_id);
    formDataToSend.append("lang", formData.lang);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    axios
      .post(`${API_URL}/featureservices/createservicefeature`, formDataToSend)
      .then((response) => {
        if (response.status === 201) {
          Swal.fire(
            formData.lang === "ar" ? "نجاح" : "Success",
            formData.lang === "ar"
              ? "تمت إضافة ميزة الخدمة بنجاح!"
              : "Feature service added successfully!",
            "success"
          ).then(() => {
            navigate(`/${lang}/services`); 
          });
        }
      })
      .catch((error) => {
        console.error("Error adding feature service:", error);
        Swal.fire(
          formData.lang === "ar" ? "خطأ" : "Error",
          formData.lang === "ar"
            ? "فشل في إضافة ميزة الخدمة."
            : "Failed to add feature service.",
          "error"
        );
      });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">
            {formData.lang === "ar" ? "جاري التحميل..." : "Loading..."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">{formData.lang === "ar" ? "إضافة ميزة خدمة" : "Add Feature Service"}</h2>
      <Form onSubmit={handleSubmit}>
        {/* Service Selection */}
        <Form.Group className="mb-3">
          <Form.Label>{formData.lang === "ar" ? "الخدمة" : "Service"}</Form.Label>
          <Form.Select
            name="service_id"
            value={formData.service_id}
            onChange={handleChange}
            required
          >
            <option value="">{formData.lang === "ar" ? "اختر خدمة" : "Select a service"}</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Feature Name */}
        <Form.Group className="mb-3">
          <Form.Label>{formData.lang === "ar" ? "اسم الميزة" : "Feature Name"}</Form.Label>
          <Form.Control
            type="text"
            name="feature_name"
            value={formData.feature_name}
            onChange={handleChange}
            placeholder={formData.lang === "ar" ? "أدخل اسم الميزة" : "Enter feature name"}
            required
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>{formData.lang === "ar" ? "الوصف" : "Description"}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder={formData.lang === "ar" ? "أدخل الوصف" : "Enter description"}
            required
          />
        </Form.Group>

        {/* Image Upload */}
        <Form.Group className="mb-3">
          <Form.Label>{formData.lang === "ar" ? "الصورة" : "Image"}</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </Form.Group>

        {/* Language Selection */}
        <Form.Group className="mb-3">
          <Form.Label>{formData.lang === "ar" ? "اللغة" : "Language"}</Form.Label>
          <Form.Select
            name="lang"
            value={formData.lang}
            onChange={handleChange}
            required
          >
            <option value="en">{formData.lang === "ar" ? "الإنجليزية" : "English"}</option>
            <option value="ar">{formData.lang === "ar" ? "العربية" : "Arabic"}</option>
          </Form.Select>
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="btn btn-success">
          {formData.lang === "ar" ? "إضافة ميزة الخدمة" : "Add Feature Service"}
        </Button>
      </Form>
    </Container>
  );
}

export default AddFeatureServices;
