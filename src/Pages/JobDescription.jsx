import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom"; 

import axios from "axios";

function JobDescription() {
  const { careerId, lang } = useParams(); 
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({});
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
      .get(`http://localhost:3000/careersdescription/getcareerdescriptionbyid/${careerId}/${lang}`)
      .then((response) => {
        setJobDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [careerId, lang]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading job details: {error.message}</div>;
  }


  const handleUpdate = () => {
  
    navigate(`/${lang}/updatejobdescription/${careerId}`);
  };


  const handleDelete = () => {
 
    if (window.confirm("Are you sure you want to delete this job?")) {
      axios
        .delete(`http://localhost:3000/careersdescription/deletecareer/${careerId}/${lang}`)
        .then((response) => {
          if (response.status === 200) {
            console.log("Job deleted successfully");
            window.location.href = "/careers"; 
          } else {
            console.error("Failed to delete the job");
          }
        })
        .catch((error) => {
          console.error("Error deleting job:", error);
        });
    }
  };

  return (
    <section className="main_margin_section">
      <Container>
        <Row>
          <Col xl={3} md={6} sm={12}>
            <Button className="btn_job-details" onClick={handleUpdate}>
              Update Job
            </Button>
            <Button className="btn_job-details" variant="danger" onClick={handleDelete}>
              Delete Job
            </Button>
          </Col>

          <Col xl={6} md={6} sm={12}>
            <h2 className="title_job-description">
              {jobDetails.position_name}
            </h2>
            <p className="desc_job-description">
              {jobDetails.job_description}
            </p>

            <h5 className="resp_jobdesc">
              {lang === "ar" ? "المسؤوليات" : "Responsibilities:"}
            </h5>
            <ul>
              <li>{jobDetails.responsibilities}</li>
            </ul>

            <h5 className="resp_jobdesc">
              {lang === "ar" ? "المتطلبات" : "Requirements:"}
            </h5>
            <ul>
              <li>{jobDetails.requirements}</li>
            </ul>

            <h5 className="resp_jobdesc">
              {lang === "ar" ? "الفوائد" : "Benefits:"}
            </h5>
            <ul>
              <li>{jobDetails.benefits}</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default JobDescription;
