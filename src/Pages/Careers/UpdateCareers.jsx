import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Form, Container } from "react-bootstrap";
import { API_URL } from "../../App";
function UpdateCareers() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const lang = location.pathname.split("/")[1] || "en"; 

  const [career, setCareer] = useState({
    position: "",
    location: "",
    experience: "",
    numberOfPositions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/careers/getallcareers/${lang}`)
      .then((response) => {
        const careerData = response.data.find((career) => career.id === parseInt(id));
        if (careerData) {
          setCareer(careerData); 
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching career data:", error);
        setLoading(false);
      });
  }, [id, lang]);


  const handleSubmit = (e) => {
    e.preventDefault();

  
    const updatedCareerData = {
      position: career.position,
      numberOfPositions: career.numberOfPositions,
      location: career.location,
      experience: career.experience,
      lang: lang, 
    };

    axios
      .put(`${API_URL}/careers/updatecareer/${id}/${lang}`, updatedCareerData)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire(
            lang === "ar" ? "تم التحديث!" : "Updated!",
            lang === "ar" ? "تم تحديث الوظيفة بنجاح." : "The job has been updated successfully.",
            "success"
          );
          navigate(`/${lang}/careers`); 
        }
      })
      .catch((error) => {
        console.error("Error updating career:", error);
        Swal.fire(
          lang === "ar" ? "فشل التحديث" : "Update Failed",
          lang === "ar" ? "حدث خطأ أثناء التحديث." : "An error occurred while updating.",
          "error"
        );
      });
  };

 
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">{lang === "ar" ? "جاري التحميل..." : "Loading..."}</span>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <h2>{lang === "ar" ? "تحديث وصف الوظيفة" : "Update  Career"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="position">
          <Form.Label>{lang === "ar" ? "اسم الوظيفة" : "Position Name"}</Form.Label>
          <Form.Control
            type="text"
            value={career.position}
            onChange={(e) => setCareer({ ...career, position: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="numberOfPositions">
          <Form.Label>{lang === "ar" ? "عدد الوظائف المفتوحة" : "Number of Positions"}</Form.Label>
          <Form.Control
            type="number"
            value={career.numberOfPositions}
            onChange={(e) => setCareer({ ...career, numberOfPositions: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>{lang === "ar" ? "الموقع" : "Location"}</Form.Label>
          <Form.Control
            type="text"
            value={career.location}
            onChange={(e) => setCareer({ ...career, location: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="experience">
          <Form.Label>{lang === "ar" ? "الخبرة" : "Experience"}</Form.Label>
          <Form.Control
            type="text"
            value={career.experience}
            onChange={(e) => setCareer({ ...career, experience: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="btn btn-success mt-3">
          {lang === "ar" ? "تحديث" : "Update"}
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateCareers;
