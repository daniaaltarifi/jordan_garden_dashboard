import { Col, Container, Row } from "react-bootstrap";
import pro2 from "../assets/pro2.png";
import service1 from "../assets/service1.jpg";
import slide1 from "../assets/slide2.jpg";
import { FaSearch } from "react-icons/fa";
function Blogs() {
  const lang = location.pathname.split("/")[1] || "en";

  const blogsData = [
    {
      title: "Photography, the best hobby to have",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor vel ligula non tristique. Sed euismod, arcu in iaculis pellentesque, justo mi suscipit sapien, vitae rutrum dolor justo at ligula. Sed viverra arcu sed ipsum lobortis, vel convallis nunc gravida. Sed vitae facilisis ipsum. Sed et tellus non erat facilisis lobortis. Sed vel felis vel eros viverra iaculis vel a felis.",
      image: slide1,
    },
    {
      title: "Photography, the best hobby to have",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor vel ligula non tristique. Sed euismod, arcu in iaculis pellentesque, justo mi suscipit sapien, vitae rutrum dolor justo at ligula. Sed viverra arcu sed ipsum lobortis, vel convallis nunc gravida. Sed vitae facilisis ipsum. Sed et tellus non erat facilisis lobortis. Sed vel felis vel eros viverra iaculis vel a felis.",
      image: pro2,
    },
    {
      title: "Photography, the best hobby to have   ",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor vel ligula non tristique. Sed euismod, arcu in iaculis pellentesque, justo mi suscipit sapien, vitae rutrum dolor justo at ligula. Sed viverra arcu sed ipsum lobortis, vel convallis nunc gravida. Sed vitae facilisis ipsum. Sed et tellus non erat facilisis lobortis. Sed vel felis vel eros viverra iaculis vel a felis.",
      image: service1,
    },
    {
      title: "Photography, the best hobby to have",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor vel ligula non tristique. Sed euismod, arcu in iaculis pellentesque, justo mi suscipit sapien, vitae rutrum dolor justo at ligula. Sed viverra arcu sed ipsum lobortis, vel convallis nunc gravida. Sed vitae facilisis ipsum. Sed et tellus non erat facilisis lobortis. Sed vel felis vel eros viverra iaculis vel a felis.",
      image: pro2,
    },
  ];
  return (
    <>
      <section className="main_margin_section">
        <Container>
          <h2 className="titleof_section_home m-0">
            {lang === "ar" ? "المدونات" : "  Blogs"}
            <hr className="hr_line_home m-0 my-3" />
          </h2>
            <form className="container-fluid">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control "
                  placeholder=         {lang==='ar'? "بحث عن":" Search ..."}

                  aria-label="search"
                  aria-describedby="basic-addon1"
                />
              </div>
            </form>
          <Row>
            {blogsData.map((blog) => (
              <>
                <Col xl={6} md={6} sm={12}>
                  <div className="card mb-3 blog_card">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={blog.image}
                          className="rounded "
                          height={"100%"}
                          width={"100%"}
                          alt="blog"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h4 className="card-title title_blog">
                            {blog.title}
                          </h4>
                          <p className="card-text desc_blogs">{blog.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Blogs;
