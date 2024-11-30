import { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../App";
function AddAdvantage() {
  const navigate = useNavigate();
  const lang = location.pathname.split("/")[1] || "en";
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    service_id: "",
    lang: "en",
  });

  const [loading, setLoading] = useState(true);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("first change", formData.service_id);
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
    axios
      .post(`${API_URL}/advantages/createadvantages`, {
        title: formData.title,
        service_id: formData.service_id,
        lang: formData.lang,
      })

      .then((response) => {
        if (response.status === 201) {
          Swal.fire(
            formData.lang === "ar" ? "نجاح" : "Success",
            formData.lang === "ar"
              ? "تمت إضافة  الخدمة بنجاح!"
              : "Advantage service added successfully!",
            "success"
          ).then(() => {
            navigate(`/${lang}/services`);
          });
        }
      })
      .catch((error) => {
        console.error("Error adding Advantage service:", error);
        Swal.fire(
          formData.lang === "ar" ? "خطأ" : "Error",
          formData.lang === "ar"
            ? "فشل في إضافة ميزة الخدمة."
            : "Failed to add advatage service.",
          "error"
        );
      });
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
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
      <h2 className="mb-4">
        {formData.lang === "ar" ? "إضافة ميزة خدمة" : "Add Advantage Service"}
      </h2>
      <Form onSubmit={handleSubmit}>
        {/* Service Selection */}
        <Form.Group className="mb-3">
          <Form.Label>
            {formData.lang === "ar" ? "الخدمة" : "Service"}
          </Form.Label>
          <Form.Select
            name="service_id"
            value={formData.service_id}
            onChange={handleChange}
            required
          >
            <option value="">
              {formData.lang === "ar" ? "اختر خدمة" : "Select a service"}
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Feature Name */}
        <Form.Group className="mb-3">
          <Form.Label>
            {formData.lang === "ar" ? "العنوان" : "Title"}
          </Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={
              formData.lang === "ar" ? "أدخل العنوان" : "Enter title"
            }
            required
          />
        </Form.Group>
        {/* Language Selection */}
        <Form.Group className="mb-3">
          <Form.Label>
            {formData.lang === "ar" ? "اللغة" : "Language"}
          </Form.Label>
          <Form.Select
            name="lang"
            value={formData.lang}
            onChange={handleChange}
            required
          >
            <option value="en">
              {formData.lang === "ar" ? "الإنجليزية" : "English"}
            </option>
            <option value="ar">
              {formData.lang === "ar" ? "العربية" : "Arabic"}
            </option>
          </Form.Select>
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="btn btn-success">
          {formData.lang === "ar"
            ? "إضافة ميزة الخدمة"
            : "Add Advantage Service"}
        </Button>
      </Form>
    </Container>
  );
}

export default AddAdvantage;
