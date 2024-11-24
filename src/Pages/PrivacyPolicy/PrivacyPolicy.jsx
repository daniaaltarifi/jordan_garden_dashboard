import { Container, Row, Col } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { API_URL } from "../../App";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import DeleteModule from "../../Component/DeleteModule";

function PrivacyPolicy() {
  const lang = location.pathname.split("/")[1] || "en";
  const [IdToDelete, setIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [privacypolicies, setPrivacypolicies] = useState([]);
  const handleShow = (id) => {
    setIdToDelete(id); // Set the Blogs ID to delete
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setIdToDelete(null); // Reset the ID when closing
  };
  useEffect(() => {
    const getPrivacypolicy = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/privacypolicy/getallprivacypolicy/${lang}`
        );
        setPrivacypolicies(response.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getPrivacypolicy();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/privacypolicy/deleteprivacypolicy/${id}/${lang}`
      );
      setPrivacypolicies(
        privacypolicies.filter((privacy) => privacy.id !== id)
      );
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <>
      <section className="main_margin_section">
        <Container>
          <Link to={`/${lang}/addprivacypolicy`}>
            <button className="main_btn_home">
              {lang === "ar" ? "اضافة" : "Add"}
              <FaPlusCircle className="mx-2" />
            </button>
          </Link>
          <Row>
            <Col xl={12} md={12} sm={12}>
              <h1 className="mb-3">
                {lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
              </h1>
              {privacypolicies.map((privacy) => (
                <>
                  <h6>
                    {privacy.description}{" "}
                    <Link to={`/${lang}/updateprivacypolicy/${privacy.id}`}>
                      <MdEdit className=" mx-2" />
                    </Link>
                    <MdDelete
                      className="mx-2"
                      style={{ color: "red" }}
                      onClick={() => handleShow(privacy.id)}
                    />
                  </h6>
                </>
              ))}
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

export default PrivacyPolicy;
