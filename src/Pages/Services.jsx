import { useEffect, useState } from "react";
import { Carousel, Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import Swal from "sweetalert2";
import "../Css/Services.css";

function Services() {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";

  useEffect(() => {
    fetch(`http://localhost:3000/services/allservices/${lang}`)
      .then((response) => response.json())
      .then((data) => {
        setServicesData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [lang]);

  const handleDelete = (serviceId) => {
    Swal.fire({
      title: lang === "ar" ? "هل أنت متأكد من حذف الخدمة؟" : "Are you sure to delete the service?",
      text: lang === "ar" ? "لن تتمكن من استرجاع الخدمة بعد الحذف." : "You won't be able to recover this service after deletion.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: lang === "ar" ? "حذف" : "Delete",
      cancelButtonText: lang === "ar" ? "إلغاء" : "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/services/deleteservice/${serviceId}/${lang}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire(
                lang === "ar" ? "تم الحذف!" : "Deleted!",
                lang === "ar" ? "تم حذف الخدمة بنجاح." : "The service has been deleted successfully.",
                "success"
              );
             
              fetch(`http://localhost:3000/services/allservices/${lang}`)
                .then((response) => response.json())
                .then((data) => setServicesData(data))
                .catch(() =>
                  Swal.fire(
                    lang === "ar" ? "خطأ" : "Error",
                    lang === "ar" ? "فشل تحديث البيانات." : "Failed to refresh data.",
                    "error"
                  )
                );
            } else {
              Swal.fire(
                lang === "ar" ? "فشل الحذف" : "Delete failed",
                lang === "ar" ? "لم تتمكن من حذف الخدمة." : "Unable to delete the service.",
                "error"
              );
            }
          })
          .catch(() => {
            Swal.fire(
              lang === "ar" ? "حدث خطأ" : "An error occurred",
              lang === "ar" ? "لم تتمكن من الحذف." : "Unable to delete.",
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
          <span className="sr-only">{lang === "ar" ? "جاري التحميل..." : "Loading..."}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cont_services">
      {/* Carousel Section */}
      <section className="margin_section">
        {servicesData.length > 0 ? (
          <Carousel fade>
            {servicesData.map((service) => (
              <Carousel.Item className="cont_slider" key={service.id}>
                <img
                  src={`http://localhost:3000/uploads/${service.image}`}
                  alt={service.title}
                  className="slider_img"
                  height="400px"
                  style={{ objectFit: "cover", width: "100%" }}
                />
                <div className="textof_slider_home">
                  <h4 className="titleof_slide_home">{service.title}</h4>
                  <h6 className="descof_slide_home">{service.description}</h6>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div className="text-center my-5">
            {lang === "ar" ? "لا توجد خدمات لعرضها" : "No services to display"}
          </div>
        )}
      </section>

      {/* Services Section */}
      <section className="main_margin_section">
        <Container>
          <div className="d-flex justify-content-end mb-4">
            <Link to={`/${lang}/addservice`}>
              <Button variant="primary">
                {lang === "ar" ? "إضافة خدمة" : "Add Service"}
              </Button>
            </Link>
          </div>

          <Row>
            {servicesData.map((service) => (
              <Col xl={4} md={6} sm={12} key={service.id}>
                <Card className="card_services">
                  <Link
                    to={`/${lang}/servicedetails/${service.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card.Img
                      variant="top"
                      src={`http://localhost:3000/uploads/${service.image}`}
                      height={"250px"}
                      alt={service.title}
                    />
                  </Link>

                  <Card.Body className="card_body_services">
                    <Card.Title className="title_services">
                      {service.title}
                    </Card.Title>
                    <Card.Text className="desc_services">
                      {service.description}
                    </Card.Text>
                    <div className="d-flex justify-content-center">
                      <Link
                        to={`/${lang}/servicedetails/${service.id}`}
                        className="browse_service_home browse_services_page"
                      >
                        {lang === "ar"
                          ? "تصفح الخدمة"
                          : "Browse the service"}{" "}
                        <CiSettings />
                      </Link>

                      <Link to={`/${lang}/updateservice/${service.id}`}>
                        <button className="main_btn_home btn_service_home">
                          {lang === "ar"
                            ? "تعديل الخدمة"
                            : "Update Service"}{" "}
                        </button>
                      </Link>

                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => handleDelete(service.id)}
                      >
                        {lang === "ar" ? "حذف الخدمة" : "Delete Service"}
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Services;
