import { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "../Css/Careers.css";
import { useLocation, useNavigate } from "react-router-dom";
import work from "../assets/work.png";
import Swal from "sweetalert2";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function Careers() {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = location.pathname.split("/")[1] || "en";

  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/careers/getallcareers/${lang}`)
      .then((response) => response.json())
      .then((data) => {
        setCareers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching careers:", error);
        setLoading(false);
      });
  }, [lang]);

  const handleDelete = (career_id) => {
    Swal.fire({
      title:
        lang === "ar"
          ? "هل أنت متأكد من الحذف؟"
          : "Are you sure to delete this job description?",
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
            `http://localhost:3000/careers/deletecareer/${career_id}/${lang}`
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
              setCareers(careers.filter((career) => career.id !== career_id));
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
  

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">
            {lang === "ar" ? "جاري التحميل..." : "Loading..."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="main_margin_section">
        <Container>
          <div className="d-flex  align-items-center mb-4">
            <h3 className="title_team_careers">
              {lang === "ar" ? "فريقنا المذهل" : "Our Amazing Team"}
            </h3>
            <Button
              variant="primary"
              onClick={() => navigate(`/${lang}/addjobdescription`)}
            >
              {lang === "ar" ? "إضافة وصف وظيفة" : "Add Job Description"}
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate(`/${lang}/addcareer`)}
            >
              {lang === "ar" ? "إضافة وصف وظيفة" : "Add Career"}
            </Button>
          </div>
          <h1 className="title_team_careers">
            {lang === "ar" ? "أعضاء الفريق" : "Team Members"}
          </h1>
          <h6 className="desc_team_carerrs">
            {lang === "ar"
              ? "يتم تقديم جميع هذه الخدمات بواسطة فريق متكامل ومتخصص من المهندسين الزراعيين والفنيين والعاملين ذوي الخبرة التي تزيد عن 10 سنوات في هذا المجال. استمتع بجمال الطبيعة في حدائقك معنا، واتصل الآن لبدء رحلة تحويل حديقتك إلى واحة خضراء."
              : "All these services are provided by an integrated and specialized team of agricultural engineers, technicians, and workers with more than 10 years of experience in this field. Enjoy the beauty of nature in your gardens with us, and call now to start the journey of transforming your garden into a green oasis."}
          </h6>
          <Row>
            {careers.length > 0 ? (
              careers.map((career) => (
                <Col xl={6} md={12} sm={12} key={career.id} className="mt-4">
                  <div className="card p-4 cont_careers">
                    <div className="d-flex justify-content-between mt-4">
                      <div className="d-flex flex-wrap">
                        <div className="cont_bag_careers">
                          <img src={work} alt="work" height={"35px"} />
                        </div>
                        <p className="position_name_careers">
                          {career.position_name}
                        </p>
                      </div>
                      <div>
                        <p>
                          {career.open_count}{" "}
                          {lang === "ar"
                            ? `وظائف مفتوحة`
                            : `position${
                                career.open_count > 1 ? "s" : ""
                              } open`}
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <button
                        type="button"
                        className="btn btn_blogs btn_position_careers"
                      >
                        {career.position_name}
                      </button>

                      <div className="card-body">
                        <span className="card-text location_careers">
                          {lang === "ar" ? `الموقع` : `Location`} :{" "}
                        </span>
                        <span>{career.location}</span>
                        <br />
                        <span className="card-text location_careers">
                          {lang === "ar" ? `الموضع` : `Position`} :{" "}
                        </span>
                        <span>{career.position || "N/A"}</span>
                        <br />
                        <span className="card-text location_careers">
                          {lang === "ar"
                            ? `الخبرة: ${career.experience || "N/A"}`
                            : `Experience: ${career.experience || "N/A"}`}
                        </span>
                        <br />
                        <br />
                        <div className="d-flex gap-3 mt-3">
                          <Button
                            variant="primary"
                            onClick={() =>
                              navigate(`/${lang}/updatecareers/${career.id}`)
                            }
                          >
                            {lang === "ar" ? "تحديث" : "Update Careers"}
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(career.id)}
                          >
                            {lang === "ar" ? "حذف" : "Delete"}
                          </Button>
                          <div className="d-flex gap-3 mt-3">
                            <Button
                              variant="light"
                              onClick={() =>
                                navigate(
                                  `/${lang}/updatejobdescription/${career.id}`
                                )
                              } 
                            >
                              <FontAwesomeIcon icon={faPencilAlt} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <div className="text-center w-100">
                {lang === "ar"
                  ? "لا توجد وظائف متاحة حالياً"
                  : "No jobs available currently"}
              </div>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Careers;
