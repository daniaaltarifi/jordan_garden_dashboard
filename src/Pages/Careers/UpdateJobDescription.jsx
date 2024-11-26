import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; 
import { API_URL } from "../../App";
function UpdateJobDescription() {
  const { careerId, lang } = useParams(); 
  const navigate = useNavigate(); 
  const [jobDetails, setJobDetails] = useState({
    position_name: '',
    job_description: '',
    responsibilities: '',
    requirements: '',
    benefits: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!careerId || !lang) {
      setError("Missing career ID or language");
      setLoading(false);
      return; 
    }

    setLoading(true);
    axios
      .get(`${API_URL}/careersdescription/getcareerdescriptionbycareer_id/${careerId}/${lang}`)
      .then((response) => {
        if (response.data) {
          setJobDetails(response.data);
        } else {
          setError("No data found for the given career ID");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
        setError("Error loading job data");
        setLoading(false);
      });
  }, [careerId, lang]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios
      .put(`${API_URL}/careersdescription/careerdescriptionupdatebycareerid/${careerId}/${lang}`, jobDetails)
      .then((response) => {
        if (response.status === 200) {
     
          Swal.fire({
            title: lang === "ar" ? "تم تحديث وصف الوظيفة بنجاح" : "The Careers Description Updated Successfully",
            icon: "success",
            confirmButtonText: lang === "ar" ? "موافق" : "OK",
          }).then(() => {
         
            navigate(`/${lang}/careers`);
          });
        }
      })
      .catch((error) => {
        console.error("Error updating job:", error);
        setError(lang === "ar" ? "فشل في تحديث الوظيفة" : "Failed to update the job");
      
        Swal.fire({
          title: lang === "ar" ? "فشل التحديث" : "Update Failed",
          text: lang === "ar" ? "حدث خطأ أثناء تحديث وصف الوظيفة." : "An error occurred while updating the job description.",
          icon: "error",
          confirmButtonText: lang === "ar" ? "موافق" : "OK",
        });
      });
  };
  

  const handleDelete = () => {
    Swal.fire({
      title: lang === "ar" ? "هل أنت متأكد من الحذف؟" : "Are you sure to delete this job description?",
      text: lang === "ar" ? "لن تتمكن من التراجع عن هذا!" : "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: lang === "ar" ? "نعم، احذف" : "Yes, delete it",
      cancelButtonText: lang === "ar" ? "إلغاء" : "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
    
        axios
          .delete(`${API_URL}/careersdescription/deletecareerdescriptionbycareerid/${careerId}/${lang}`)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire(
                lang === "ar" ? "تم الحذف!" : "Deleted!",
                lang === "ar" ? "تم حذف الوظيفة بنجاح." : "The job has been deleted successfully.",
                "success"
              );
              navigate(`/${lang}/careers`); 
            }
          })
          .catch((error) => {
            console.error("Error deleting job:", error);
            Swal.fire(
              lang === "ar" ? "فشل الحذف" : "Delete Failed",
              lang === "ar" ? "حدث خطأ أثناء الحذف." : "An error occurred while deleting.",
              "error"
            );
          });
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="main_margin_section">
      <Container>
        <Row>
          <Col xl={6} md={8} sm={12}>
            <h2>{lang === "ar" ? "تحديث الوصف الوظيفي" : "Update Job Description"}</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="jobDescription">
                <Form.Label>{lang === "ar" ? "وصف الوظيفة" : "Job Description"}</Form.Label>
                <Form.Control
                  as="textarea"
                  name="job_description"
                  value={jobDetails.job_description || ''}  
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="responsibilities">
                <Form.Label>{lang === "ar" ? "المسؤوليات" : "Responsibilities"}</Form.Label>
                <Form.Control
                  as="textarea"
                  name="responsibilities"
                  value={jobDetails.responsibilities || ''} 
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="requirements">
                <Form.Label>{lang === "ar" ? "المتطلبات" : "Requirements"}</Form.Label>
                <Form.Control
                  as="textarea"
                  name="requirements"
                  value={jobDetails.requirements || ''}  
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="benefits">
                <Form.Label>{lang === "ar" ? "الفوائد" : "Benefits"}</Form.Label>
                <Form.Control
                  as="textarea"
                  name="benefits"
                  value={jobDetails.benefits || ''} 
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3 btn btn-success">
                {lang === "ar" ? "تحديث" : "Update"}
              </Button>
              <Button variant="danger" onClick={handleDelete} className="mt-3">
              {lang === "ar" ? "حذف" : "Delete"}
            </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default UpdateJobDescription;
