import { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function AddDescriptionJob() {
  const [careers, setCareers] = useState([]);
  const [formData, setFormData] = useState({
    job_description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    career_id: "",
    lang: "en", 
  });

  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/careers/getallcareers/${formData.lang}`)
      .then((response) => {
        setCareers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching careers:", error);
        setLoading(false);
      });
  }, [formData.lang]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.career_id) {
      Swal.fire(
        formData.lang === "ar" ? "خطأ" : "Error",
        formData.lang === "ar" ? "يرجى اختيار الوظيفة." : "Please select a position.",
        "error"
      );
      return;
    }

    axios
      .post("http://localhost:3000/careersdescription/createcareerdescription", formData)
      .then((response) => {
        if (response.status === 201) {
          Swal.fire(
            formData.lang === "ar" ? "نجاح" : "Success",
            formData.lang === "ar"
              ? "تمت إضافة وصف الوظيفة بنجاح!"
              : "Job description added successfully!",
            "success"
          );
          setFormData({
            job_description: "",
            responsibilities: "",
            requirements: "",
            benefits: "",
            career_id: "",
            lang: formData.lang, 
          });
        }
      })
      .catch((error) => {
        console.error("Error adding job description:", error);
        Swal.fire(
          formData.lang === "ar" ? "خطأ" : "Error",
          formData.lang === "ar"
            ? "فشل في إضافة وصف الوظيفة."
            : "Failed to add job description.",
          "error"
        );
      });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">{formData.lang === "ar" ? "جاري التحميل..." : "Loading..."}</span>
        </div>
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">{formData.lang === "ar" ? "إضافة وصف الوظيفة" : "Add Job Description"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>{formData.lang === "ar" ? "الوظيفة" : "Position"}</Form.Label>
          <Form.Select
            name="career_id"
            value={formData.career_id}
            onChange={handleChange}
            required
          >
            <option value="">{formData.lang === "ar" ? "اختر وظيفة" : "Select a position"}</option>
            {careers.map((career) => (
              <option key={career.id} value={career.id}>
                {career.position}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{formData.lang === "ar" ? "وصف الوظيفة" : "Job Description"}</Form.Label>
          <Form.Control
            type="text"
            name="job_description"
            value={formData.job_description}
            onChange={handleChange}
            placeholder={formData.lang === "ar" ? "أدخل وصف الوظيفة" : "Enter job description"}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{formData.lang === "ar" ? "المسؤوليات" : "Responsibilities"}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            placeholder={formData.lang === "ar" ? "أدخل المسؤوليات" : "Enter responsibilities"}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{formData.lang === "ar" ? "المتطلبات" : "Requirements"}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder={formData.lang === "ar" ? "أدخل المتطلبات" : "Enter requirements"}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{formData.lang === "ar" ? "الفوائد" : "Benefits"}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            placeholder={formData.lang === "ar" ? "أدخل الفوائد" : "Enter benefits"}
            required
          />
        </Form.Group>

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

        <Button variant="primary" type="submit">
          {formData.lang === "ar" ? "إضافة وصف الوظيفة" : "Add Job Description"}
        </Button>
      </Form>
    </Container>
  );
}

export default AddDescriptionJob;
