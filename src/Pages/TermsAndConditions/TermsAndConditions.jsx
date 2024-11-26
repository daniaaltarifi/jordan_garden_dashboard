import { Container, Row, Col } from "react-bootstrap";
import { API_URL } from "../../App";
import axios from "axios";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import DeleteModule from "../../Component/DeleteModule";
import { FaPlusCircle } from "react-icons/fa";

function TermsAndConditions() {
  const lang = location.pathname.split("/")[1] || "en";
  const [IdToDelete, setIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [termsandconditions, settermsandconditions] = useState([]);
  const handleShow = (id) => {
    setIdToDelete(id); 
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setIdToDelete(null); 
  };
  useEffect(() => {
    const termsandconditions = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/termsandconditions/getalltermsAndConditions/${lang}`
        );
        settermsandconditions(response.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    termsandconditions();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/termsandconditions/deletetermsAndConditions/${id}/${lang}`
      );
      settermsandconditions(
        termsandconditions.filter((terms) => terms.id !== id)
      );
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <>
      <section className="main_margin_section">
        <Container>
        <Link to={`/${lang}/addtermsandcondition`}>
            <button className="main_btn_home">
              {lang === "ar" ? "اضافة" : "Add"}
              <FaPlusCircle className="mx-2" />
            </button>
          </Link>
          <Row>
            <Col xl={12} md={12} sm={12}>
              <h1 className="mb-3">
                {lang === "ar" ? "الشروط والاحكام" : "Terms And Conditions"}
              </h1>

              {termsandconditions.map((terms) => (
                <>
                  <h6>
                    {terms.description}
                    <Link to={`/${lang}/updatetermsandcondition/${terms.id}`}>
                      <MdEdit className=" mx-2" />
                    </Link>
                    <MdDelete
                      className="mx-2"
                      style={{ color: "red" }}
                      onClick={() => handleShow(terms.id)}
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
          id={IdToDelete} 
        />
      </section>
    </>
  );
}

export default TermsAndConditions;
