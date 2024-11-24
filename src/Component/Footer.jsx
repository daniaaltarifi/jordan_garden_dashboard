import { Container, Row, Col, Button } from "react-bootstrap";
import arrow from "../assets/arrow.png";
import "../Css/Footer.css";
import { API_URL } from "../App";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import DeleteModule from "./DeleteModule";
import { useLocation } from "react-router-dom";
import terms from "../assets/terms.png";
import privacy from "../assets/privacy.png";
function Footer() {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const [logo, setLogo] = useState([]);
  const [social, setSocial] = useState([]);
  const [content, setContent] = useState([]);
  const [IdToDelete, setIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteCollection, setDeleteCollection] = useState(false);

  const handleShow = (id,collection) => {
    setIdToDelete(id); // Set the Blogs ID to delete
    setDeleteCollection(collection);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setIdToDelete(null); // Reset the ID when closing
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const [logoRes, socialRes, contentRes] = await Promise.all([
          axios.get(`${API_URL}/logoes/getalllogos/${lang}`),
          axios.get(`${API_URL}/contacts/getallcontacts/${lang}`),
          axios.get(`${API_URL}/allcontents/getallcontents/${lang}`),
        ]);
        setLogo(logoRes.data);
        setSocial(socialRes.data);
        setContent(contentRes.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getData();
  }, [lang]);

  const handleDelete = async (id) => {
    try {
      if (deleteCollection === "social") {
        // Delete from the social collection
        await axios.delete(`${API_URL}/contacts/deletecontact/${id}/${lang}`);
        setSocial(social.filter((item) => item.id !== id));  // Update the state
      } else if (deleteCollection === "content") {
        // Delete from the content collection
        await axios.delete(`${API_URL}/allcontents/deletecontents/${id}/${lang}`);
        setContent(content.filter((item) => item.id !== id));  // Update the state
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  let linkToPrivacy;
  if (location.pathname === "/" || location.pathname.split("/")[1] === "en" || location.pathname.split("/")[1] === "ar") {
  linkToPrivacy = `/${lang}/privacypolicy`; 
} else {
  linkToPrivacy = `/${lang}/privacypolicy`; 
}
let linkToTerms;
if (location.pathname === "/" || location.pathname.split("/")[1] === "en" || location.pathname.split("/")[1] === "ar") {
  linkToTerms = `/${lang}/termsandconditions`; 
} else {
linkToTerms = `/${lang}/termsandconditions`; 
}
  return (
    <>
      <section className="main_margin_section">
        <Container fluid className="cont_footer">
          <Row>
            {logo.map((log) => (
              <>
                <Col xl={3} md={6} sm={12}>
                  <img
                    src={`${API_URL}/uploads/${log.image}`}
                    alt=""
                    height={"150px"}
                    width={"150px"}
                  />
                  <h6 className="desc_footer">{log.description}</h6>
                  <div className="d-flex mb-2">
                    <Link to={`/${lang}/updatelogo/${log.id}`}>
                      <Button variant="success" className="mt-2 mx-2">
                        <MdEdit />
                      </Button>
                    </Link>
                  </div>
                </Col>
              </>
            ))}
            <Col xl={3} md={6} sm={12}>
              <h4 className="desc_footer">
                {lang === "ar" ? "تواصل معنا" : "Contact-US"}
              </h4>
              <hr className="hr_footer" />
              <div className="col_contact_footer">
                {social.map((soc) => (
                  <>
                    <div>
                      <img
                        src={`${API_URL}/uploads/${soc.icon}`}
                        alt="phone"
                        height={"25px"}
                        width={"25px"}
                      />{" "}
                      <span className="contact_footer">{soc.content}</span>
                      <Link to={`/${lang}/updatesocial/${soc.id}`}>
                        <MdEdit className="mx-2" />
                      </Link>
                      <MdDelete
                        className="mx-2"
                        style={{ color: "red" }}
                        onClick={() => handleShow(soc.id,"social")}
                      />
                    </div>
                  </>
                ))}
              </div>
              <div className="d-flex mb-2">
                <Link to={`/${lang}/addsocial`}>
                  <Button variant="primary" className="mt-2 mx-2">
                    <FaPlusCircle />
                  </Button>
                </Link>
              </div>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <h4 className="desc_footer">
                {lang === "ar" ? "المحتوى" : "All Content"}
              </h4>
              <hr className="hr_footer" />
              <div className="col_contact_footer">
                {content.map((cont) => (
                  <>
                  <Link to={`${lang}/${cont.link}`} style={{textDecoration:"none"}}>
                    <div>
                      <img
                        src={arrow}
                        alt="phone"
                        height={"25px"}
                        width={"25px"}
                      />{" "}
                      <span className="contact_footer">{cont.title}</span>
                      <Link to={`/${lang}/updatecontent/${cont.id}`}>
                        <MdEdit className="mx-2" />
                      </Link>
                      <MdDelete
                        className="mx-2"
                        style={{ color: "red" }}
                        onClick={() => handleShow(cont.id,"content")}
                      />
                    </div>
                  </Link>
                  </>
                ))}
              </div>
              <div className="d-flex mb-2">
                <Link to={`/${lang}/addcontent`}>
                  <Button variant="primary" className="mt-2 mx-2">
                    <FaPlusCircle />
                  </Button>
                </Link>
              </div>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <h4 className="desc_footer">
                {lang === "ar" ? "السياسة والخصوصية" : "Legal Information"}
              </h4>
              <hr className="hr_footer" />
              <div className="col_contact_footer">
                <Link to={linkToPrivacy}className="footer_link">
                <div>
                  <img
                    src={privacy}
                    alt="phone"
                    height={"25px"}
                    width={"25px"}
                    className=""
                  />{" "}
                  <span className="contact_footer">Privacy Policy </span>
                </div>
                </Link>
                <Link to={linkToTerms}className="footer_link">
                <div>
                  <img src={terms} alt="phone" height={"20px"} width={"20px"} />{" "}
                  <span className="contact_footer">Terms & Conditions</span>
                </div>
                </Link>
              </div>
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
    </>
  );
}

export default Footer;
