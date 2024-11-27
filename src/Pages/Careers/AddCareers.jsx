import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Form, Container } from "react-bootstrap";
import { API_URL } from "../../App";

function AddCareers() {
  const navigate = useNavigate();
  const [career, setCareer] = useState({
    position: "",
    numberOfPositions: 0,
    location: "",
    experience: "",
    language: "en",
  });
  const [loading, setLoading] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

   
    const newCareerData = {
      position: career.position,
      numberOfPositions: career.numberOfPositions,
      location: career.location,
      experience: career.experience,
      lang: career.language,
    };

    setLoading(true);

    axios
      .post(`${API_URL}/careers/createcareer`, newCareerData)
      .then(() => {
        Swal.fire({
          title: career.language === "ar" ? "تم إضافة الوظيفة بنجاح" : "Career Added Successfully",
          icon: "success",
          confirmButtonText: career.language === "ar" ? "موافق" : "OK",
        }).then(() => {
          navigate(`/${career.language}/careers`); 
        });
      })
      .catch((error) => {
        console.error("Error adding career:", error);
        Swal.fire(
          career.language === "ar" ? "فشل الإضافة" : "Add Failed",
          career.language === "ar" ? "حدث خطأ أثناء إضافة الوظيفة." : "An error occurred while adding.",
          "error"
        );
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <Container>
      <h2>{career.language === "ar" ? "إضافة وظيفة جديدة" : "Add New Job"}</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="position">
          <Form.Label>{career.language === "ar" ? "اسم الوظيفة" : "Position Name"}</Form.Label>
          <Form.Control
            type="text"
            value={career.position}
            onChange={(e) => setCareer({ ...career, position: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="numberOfPositions">
          <Form.Label>{career.language === "ar" ? "عدد الوظائف المفتوحة" : "Number of Positions"}</Form.Label>
          <Form.Control
            type="number"
            value={career.numberOfPositions}
            onChange={(e) => setCareer({ ...career, numberOfPositions: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>{career.language === "ar" ? "الموقع" : "Location"}</Form.Label>
          <Form.Control
            type="text"
            value={career.location}
            onChange={(e) => setCareer({ ...career, location: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="experience">
          <Form.Label>{career.language === "ar" ? "الخبرة" : "Experience"}</Form.Label>
          <Form.Control
            type="text"
            value={career.experience}
            onChange={(e) => setCareer({ ...career, experience: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="language">
          <Form.Label>{career.language === "ar" ? "اللغة" : "Language"}</Form.Label>
          <Form.Control
            as="select"
            value={career.language}
            onChange={(e) => setCareer({ ...career, language: e.target.value })}
            required
          >
            <option value="en">{career.language === "ar" ? "إنجليزي" : "English"}</option>
            <option value="ar">{career.language === "ar" ? "عربي" : "Arabic"}</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading} className="mt-3">
          {loading ? (career.language === "ar" ? "جاري الإضافة..." : "Adding...") : career.language === "ar" ? "إضافة" : "Add"}
        </Button>
      </Form>
    </Container>
  );
}

export default AddCareers;
