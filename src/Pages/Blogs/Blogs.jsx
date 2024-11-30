import { Col, Container, Row,Button } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../../App";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import DeleteModule from "../../Component/DeleteModule";

function Blogs() {
  const lang = location.pathname.split("/")[1] || "en";
  const [IdToDelete, setIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [blogsData, setblogsData] = useState([]);

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
      const response = await axios.get(`${API_URL}/blogs/getallblogs/${lang}`);
      setblogsData(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    getProject();
  }, [lang]);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/blogs/deleteblog/${id}/${lang}`);
      setblogsData(blogsData.filter((b) => b.id !== id));
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <>
      <section className="main_margin_section">
        <Container>
          <h2 className="titleof_section_home m-0">
            {lang === "ar" ? "المدونات" : "  Blogs"}

            <hr className="hr_line_home m-0 my-3" />
          </h2>
          <Link to={`/${lang}/addblog`}>
            <button className="main_btn_home">
              {lang === "ar" ? "اضافة" : "Add"}
              <FaPlusCircle className="mx-2" />
            </button>
          </Link>

          <Row>
            {blogsData.map((blog) => {
              // const images = JSON.parse(blog.images);
              return (
                <Col xl={6} md={6} sm={12} key={blog.id}>
                  <div className="card mb-3 blog_card">
                    <div className="row g-0">
                      {/* {images.map((image, index) => ( */}
                        <div className="col-md-4" >
                          <img
                            src={`${API_URL}/uploads/${blog.image}`}
                            className="rounded"
                            height={"100%"}
                            width={"100%"}
                            alt={`blog-image`}
                          />
                        </div>
                      {/* ))} */}
                      <div className="col-md-8">
                        <div className="card-body">
                          <h4 className="card-title title_blog">
                            {blog.title}
                           
                          </h4>
                          <p className="card-text desc_blogs">
                            {blog.description}
                          </p>
                        </div>
                      </div>
                  <div className="d-flex mb-2">
                      <Link to={`/${lang}/updateblog/${blog.id}`}>
                        <Button variant="success" className="mt-2 mx-2">
                          {lang === "ar" ? "تعديل" : "Update"}
                          <MdEdit />
                        </Button>
                      </Link>

                      <Button
                        variant="danger"
                        className=" mt-2"
                        onClick={() => handleShow(blog.id)}
                      >
                        {lang === "ar" ? "حذف" : "Delete"}
                        <MdDelete />
                      </Button>
                    </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
      <DeleteModule
          show={showModal}
          handleClose={handleClose}
          handleDelete={handleDelete}
          id={IdToDelete} // Pass the Blogs ID to DeleteModule
        />
    </>
  );
}

export default Blogs;
