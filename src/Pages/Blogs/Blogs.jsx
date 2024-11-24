import { Col, Container, Row } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../../App";
import axios from "axios";
import { MdEdit } from "react-icons/md";

function Blogs() {
  const lang = location.pathname.split("/")[1] || "en";

  const [blogsData, setblogsData] = useState([]);
  const getProject = async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs/getallblogs/${lang}`);
      setblogsData(response.data);
      console.log("first blog", response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    getProject();
  }, [lang]);
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
              const images = JSON.parse(blog.images);
              return (
                <Col xl={6} md={6} sm={12} key={blog.id}>
                  <div className="card mb-3 blog_card">
                    <div className="row g-0">
                      {images.map((image, index) => (
                        <div className="col-md-4" key={index}>
                          <img
                            src={`${API_URL}/uploads/${image}`}
                            className="rounded"
                            height={"100%"}
                            width={"100%"}
                            alt={`blog-image-${index}`}
                          />
                        </div>
                      ))}
                      <div className="col-md-8">
                        <div className="card-body">
                          <h4 className="card-title title_blog">
                            {blog.title}
                            <Link to={`/${lang}/updateblog/${blog.id}`}>
                              <MdEdit className=" mx-2" />
                            </Link>
                          </h4>
                          <p className="card-text desc_blogs">
                            {blog.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Blogs;
