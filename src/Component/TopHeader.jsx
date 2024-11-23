import { Container, Row, Col } from "react-bootstrap";
import { MdEmail } from "react-icons/md";
import { Ri24HoursFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
function TopHeader() {
  const lang = location.pathname.split("/")[1] || "en";

  return (
    <Container fluid className="cont_topheader">
      <Row>
        <Col xl={6} md={6} sm={12} className="mt-2">
          Gardens Coordinating in Amman
        </Col>
        <Col xl={6} md={6} sm={12} className="d-flex mt-2">
          <div className="d-flex">
            <MdEmail className="mt-1" />
            <p className="mx-3">
              {" "}
              {lang === "ar"
                ? "تواصل معنا على الايميل"
                : "Contact Us With Email  "}
            </p>
            |
          </div>

          <div className="d-flex ms-2">
            <Ri24HoursFill className="mt-1" />
            <p className="mx-3"> 8:00-23:00</p>|
          </div>
          <div className="d-flex ms-2">
            <FaPhoneAlt className="mt-1" />
            <p className="mx-3"> 05563999</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default TopHeader;
