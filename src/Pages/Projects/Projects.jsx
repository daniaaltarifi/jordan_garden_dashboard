import { Container, Row, Col,Button } from "react-bootstrap";
import pro2 from "../../assets/pro2.png";
import service2 from "../../assets/servcie2.png";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../App";
import { MdEdit,MdDelete } from "react-icons/md";
import DeleteModule from "../../Component/DeleteModule";
function Projects() {
  const lang = location.pathname.split("/")[1] || "en";
  const [showModal, setShowModal] = useState(false);
  const [IdToDelete, setIdToDelete] = useState(null); 
  const [projectCard, setprojectCard] = useState([]);
  const handleShow = (id) => {
    setIdToDelete(id); // Set the Blogs ID to delete
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setIdToDelete(null); // Reset the ID when closing
  };
  const getProject = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/projects/getallprojects/${lang}`
      );
      setprojectCard(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    getProject();
  }, [lang]);
const handleDelete = async (id) => {
  try {
     await axios.delete(
      `${API_URL}/projects/deleteproject/${id}/${lang}`
    );
    setprojectCard(projectCard.filter((b) => b.id !== id));
  } catch (error) {
    console.log("error: ", error);
  }
}
  return (
    <>
      <section className="main_margin_section">
        <Container>
          <Row>
            <Col xl={8} md={6} sm={12}>
              <h2 className="titleof_section_home m-0">
                {lang === "ar" ? "المشاريع" : "  Projects"}
                <hr className="hr_line_home m-0 my-3" />
              </h2>
            </Col>
            <Col xl={2} md={6} sm={12}>
              <Link to={`/${lang}/addproject`}>
                <button className="main_btn_home">
                  {lang === "ar" ? "اضافة" : "Add"}
                  <FaPlusCircle className="mx-2" />
                </button>
              </Link>
            </Col>
          </Row>
          <Row>
            {projectCard.map((proj) => (
              <>
                <div className="card mb-3 card_project">
                  <div className="row g-0">
                    {proj.ProjectImages.map((imageurl) =>(
                      <>
                    <div className="col-md-4">
                      <img
                        src={`${API_URL}/uploads/${imageurl.image}`}
                        className="rounded mb-2"
                        alt="project img"
                        height={"200px"}
                        width={"98%"}
                      />
                      <div>
                        <img
                          src={service2}
                          className=" rounded ms-1"
                          alt="project img"
                          height={"150px"}
                          width={"48%"}
                        />
                        <img
                          src={pro2}
                          className=" rounded ms-1"
                          alt="project img"
                          height={"150px"}
                          width={"48%"}
                        />
                      </div>
                    </div>
                    </>

                    ))}
                    <div className="col-md-8 cont_card_proj">
                      <div className="card-body">
                        <h3 className="card-title title_project">
                          {proj.title}{" "}
                        </h3>
                        <p className="card-text desc_project">
                          {proj.description}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex ">

                    <Link to={`/${lang}/updateproject/${proj.id}`}>
                  <Button variant="success"className="mt-2 mx-2">
                    {lang === "ar" ? "تعديل" : "Update"}
                    <MdEdit />
                  </Button>
                </Link>
               
                  <Button variant="danger" className=" mt-2" onClick={() => handleShow(proj.id)}>
                    {lang === "ar" ? "حذف" : "Delete"}
                    <MdDelete />
                  </Button>
                </div>

                  </div>
                </div>
              </>
            ))}
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

export default Projects;
