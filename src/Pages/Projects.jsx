import { Container, Row, Col, Dropdown } from "react-bootstrap";
import pro1 from "../assets/pro1.png";
import pro2 from "../assets/pro2.png";
import service2 from "../assets/servcie2.png";
import service1 from "../assets/service1.jpg";

function Projects() {
  const lang = location.pathname.split("/")[1] || "en";
  const projectCard = [
    {
      id: 1,
      title: "Design and installation of canopies",
      image: pro1,
      description:
"Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim. Venenatis eget adipiscing luctus lorem.Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim. Venenatis eget adipiscing luctus lorem.Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim. Venenatis eget adipiscing luctus lorem.Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim. Venenatis eget adipiscing luctus lorem.Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim. Venenatis eget adipiscing luctus lorem.Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim. Venenatis eget adipiscing luctus lorem.Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim. Venenatis eget adipiscing luctus lorem.Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim. Venenatis eget adipiscing luctus lorem.We at Jordan Gardens Company provide the service of designing and installing waterfalls in innovative and attractive ways that suit the customer's requirements and the nature of the available space. The designs of the waterfalls are carefully selected to suit the surrounding environment and be consistent with the overall design of the garden."    },
    {
      id: 1,
      title: lang === "ar" ? "مشروع 1" : "Project 1",
      image: pro2,
      description:
       "We at Jordan Gardens Company provide the service of designing and installing waterfalls in innovative and attractive ways that suit the customer's requirements and the nature of the available space. The designs of the waterfalls are carefully selected to suit the surrounding environment and be consistent with the overall design of the garden."
    },
    {
      id: 1,
      title: lang === "ar" ? "مشروع 1" : "Project 2",
      image: service1,
      description:
        "We at Jordan Gardens Company provide the service of designing and installing waterfalls in innovative and attractive ways that suit the customer's requirements and the nature of the available space. The designs of the waterfalls are carefully selected to suit the surrounding environment and be consistent with the overall design of the garden."
    },
  ];
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
              <Dropdown>
                <Dropdown.Toggle
                  variant="white"
                  id="dropdown-basic"
                  className="border-warning"
                >
                  {lang === "ar" ? "نوع الخدمة" : " service type:  "}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xl={2} md={6} sm={12}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="white"
                  id="dropdown-basic"
                  className="border-warning"
                >
                  {lang === "ar" ? "الموقع" : " Location:  "}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            {projectCard.map((proj) => (
              <>
                <div className="card mb-3 card_project">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={proj.image}
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
                  </div>
                </div>
              </>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Projects;
