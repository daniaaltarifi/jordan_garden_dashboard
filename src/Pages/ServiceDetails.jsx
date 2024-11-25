import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom"; 
function ServiceDetails() {
  const { id } = useParams(); 
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featureData, setFeatureData] = useState(null); 
  const lang = location.pathname.split("/")[1] || "en"; 
  const navigate = useNavigate();

  useEffect(() => {
 
    axios
      .get(`http://localhost:3000/services/getservicebyid/${id}/${lang}`)
      .then((response) => {
        setServiceData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    
    axios
      .get(
        `http://localhost:3000/featureservices/featureservicesbyservice_Id/${id}/${lang}`
      )
      .then((response) => {
        setFeatureData(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching feature data:", error);
      });
  }, [id, lang]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading service: {error.message}</div>;
  }

  const handleUpdateClick = () => {
    navigate(`/update-feature/${id}/${lang}`); 
  };


  const handleDelete = () => {
    Swal.fire({
      title: lang === "ar" ? "هل أنت متأكد من الحذف؟" : "Are you sure to delete this Feature Service?",
      text: lang === "ar" ? "لن تتمكن من التراجع عن هذا!" : "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: lang === "ar" ? "نعم، احذف" : "Yes, delete it",
      cancelButtonText: lang === "ar" ? "إلغاء" : "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
    
        axios
          .delete(`http://localhost:3000/featureservices/deletefeatureservicesbyserviceid/${id}/${lang}`)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire(
                lang === "ar" ? "تم الحذف!" : "Deleted!",
                lang === "ar" ? "تم حذف الوظيفة بنجاح." : "The job has been deleted successfully.",
                "success"
              );
              navigate(`/${lang}/servicedetails/${id}`);
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
  return (
    <section className="main_margin_section">
      <Container>
        <Row>
          <Col xl={3} md={6} sm={12} className="cont_img_servicedetaile">
            <img
              src={`http://localhost:3000/uploads/${serviceData.image}`}
              alt="Service Details"
              className="img_servicedetails rounded-circle"
              style={{ width: "100%", height: "auto" }}
            />
            <button className="btn_servicedetails">
              Request/inquire about the service
              <FaPhoneAlt className="ms-2" />
            </button>
          </Col>

          <Col xl={6} md={6} sm={12}>
            <h2 className="title_servicedetails">{serviceData.title}</h2>
            <h6 className="desc_servicedetails">{serviceData.description}</h6>
          </Col>

          <Col xl={3} md={6} sm={12} className="cont_features_dervicedetails">
            <div className="mb-3 d-flex justify-content-between">
              <button
                className="btn btn-primary me-2"
                onClick={handleUpdateClick} 
              >
                Update Feature
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete Feature
              </button>
            </div>

            <div>
              <div className="d-flex align-items-center mb-3 mt-6">
                <label className="me-2">The title is:</label>
                <h3 className="features_title mb-0">
                  {featureData?.title || "No Title"}
                </h3>
              </div>
              {featureData ? (
                <div className="d-flex align-items-center mb-3 mt-3">
                  <label className="me-2">
                    The Image of the service feature:
                  </label>
                  <img
                    src={`http://localhost:3000/uploads/${featureData.image}`}
                    alt={featureData.title}
                    height={"50px"}
                    width={"50px"}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : (
                <p>No feature available.</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ServiceDetails;
