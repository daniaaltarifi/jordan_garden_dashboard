import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../App";
import { useParams, useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import DeleteModule from "../../Component/DeleteModule";
function ServiceDetails() {
  const { id } = useParams();
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featureData, setFeatureData] = useState([]);
  const [advData, setAdvData] = useState([]);
  const lang = location.pathname.split("/")[1] || "en";
  const navigate = useNavigate();
  const [IdToDelete, setIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShow = (id) => {
    setIdToDelete(id); // Set the Blogs ID to delete
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setIdToDelete(null); // Reset the ID when closing
  };
  useEffect(() => {
    axios
      .get(`${API_URL}/services/getservicebyid/${id}/${lang}`)
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
        `${API_URL}/featureservices/featureservicesbyservice_Id/${id}/${lang}`
      )
      .then((response) => {
        setFeatureData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feature data:", error);
      });
    axios
      .get(`${API_URL}/advantages/getadvantagesnbyservicesid/${id}/${lang}`)
      .then((response) => {
        setAdvData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id, lang]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading service: {error.message}</div>;
  }

  const handleUpdateClick = (featid) => {
    navigate(`/${lang}/update-feature/${featid}`);
  };

  const handleDeleteFeatures = (featid) => {
    Swal.fire({
      title:
        lang === "ar"
          ? "هل أنت متأكد من الحذف؟"
          : "Are you sure to delete this Feature Service?",
      text:
        lang === "ar"
          ? "لن تتمكن من التراجع عن هذا!"
          : "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: lang === "ar" ? "نعم، احذف" : "Yes, delete it",
      cancelButtonText: lang === "ar" ? "إلغاء" : "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${API_URL}/featureservices/deletefeatureservices/${featid}/${lang}`
          )
          .then((response) => {
            if (response.status === 200) {
              Swal.fire(
                lang === "ar" ? "تم الحذف!" : "Deleted!",
                lang === "ar"
                  ? "تم حذف الوظيفة بنجاح."
                  : "The job has been deleted successfully.",
                "success"
              );
              navigate(`/${lang}/servicedetails/${id}`);
            }
          })
          .catch((error) => {
            console.error("Error deleting job:", error);
            Swal.fire(
              lang === "ar" ? "فشل الحذف" : "Delete Failed",
              lang === "ar"
                ? "حدث خطأ أثناء الحذف."
                : "An error occurred while deleting.",
              "error"
            );
          });
      }
    });
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/advantages/deleteadvantages/${id}/${lang}`
      );
      setAdvData(advData.filter((b) => b.id !== id));
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <section className="main_margin_section">
      <Container>
        <Row>
          {serviceData.map((service)=>(
            <>
            
          <Col xl={3} md={6} sm={12} className="cont_img_servicedetaile">
            <img
              src={`${API_URL}/uploads/${service.image}`}
              alt="Service Details"
              className="img_servicedetails rounded-circle"
              style={{ width: "100%", height: "auto" }}
            />
          </Col>

          <Col xl={6} md={6} sm={12}>
            <h2 className="title_servicedetails">{service.title}</h2>
            <h6 className="desc_servicedetails">{service.description}</h6>
          </Col>
            </>
          ))}
          <Col xl={3} md={6} sm={12} className="cont_features_dervicedetails">
            {featureData.map((feat) => (
              <>
                {/* <div className="mb-3 d-flex justify-content-between">
                  <button
                    className="btn btn-success me-2"
                    onClick={handleUpdateClick}
                  >
                    Update Feature
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleDeleteFeatures}
                  >
                    Delete Feature
                  </button>
                </div> */}

                <>
                  <div className="d-flex align-items-center">
                    <img
                      src={`${API_URL}/uploads/${feat.image}`}
                      alt="features"
                      height={"50px"}
                      width={"50px"}
                    />
                    <h5>{feat.title} 
                        <MdEdit className="mx-2"onClick={()=>{handleUpdateClick(feat.id)}} />
                      <MdDelete
                        className="mx-2"
                        style={{ color: "red" }}
                        onClick={()=>{handleDeleteFeatures(feat.id)}}
                        /></h5>
                  </div>
                </>
              </>
            ))}
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xl={12} md={12} sm={12}>
            <h2 className="adv_servicedetails">
              Advantages of natural grass for gardens:
            </h2>
            {advData && advData.length > 0 ? (
              <ul>
                {advData.map((adv) => (
                  <li key={adv.id} className="listof_adv_servicedetails">
                    {adv.title}{" "}
                    <Link to={`/${lang}/updateadvantage/${adv.id}`}>
                      <MdEdit className="mx-2" />
                    </Link>
                    <MdDelete
                      className="mx-2"
                      style={{ color: "red" }}
                      onClick={() => handleShow(adv.id)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div>No Advantage Available</div>
            )}
          </Col>
        </Row>
      </Container>
      <DeleteModule
        show={showModal}
        handleClose={handleClose}
        handleDelete={handleDelete}
        id={IdToDelete} // Pass the Blogs ID to DeleteModule
      />
    </section>
  );
}

export default ServiceDetails;
