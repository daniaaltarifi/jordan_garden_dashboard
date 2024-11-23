import { Col, Container, Row } from "react-bootstrap";
import "../Css/Careers.css";
import { Link } from "react-router-dom";
import work from "../assets/work.png";
function Careers() {
  const lang = location.pathname.split("/")[1] || "en";

  const careers = [
    {
      id: 1,
      position_name: "Senior Engineer",
      open_count: 5,
      location: "amman",
      exp: "4",
    },
    {
      id: 2,
      position_name: "Software Engineer",
      open_count: 5,
      location: "amman",
      exp: "4",
    },
    {
      id: 3,
      position_name: "Flutter Engineer",
      open_count: 5,
      location: "amman",
      exp: "4",
    },
    {
      id: 4,
      position_name: "Quality Assurance",
      open_count: 5,
      location: "amman",
      exp: "4",
    },
  ];
  return (
    <>
      <section className="main_margin_section">
        <Container>
          <h3 className="title_team_careers">Our Amazing Team</h3>
          <h1 className="title_team_careers">Team Members</h1>
          <h6 className="desc_team_carerrs">
            All these services are provided by an integrated and specialized
            team of agricultural engineers, technicians and workers with more
            than 10 years of experience in this field. Enjoy the beauty of
            nature in your gardens with us, and call now to start the journey of
            transforming your garden into a green oasis
          </h6>
          <Row>
            {careers.map((career) => (
              <Col xl={6} md={12} sm={12} key={career.id} className="mt-4 ">
                <div className="card p-4 cont_careers">
                  <div className="d-flex justify-content-between mt-4">
                    <div className="d-flex flex-wrap">
                      <div className="cont_bag_careers">
                        <img src={work} alt="work" height={"35px"} />{" "}
                      </div>
                      <p className="position_name_careers">
                        {career.position_name}
                      </p>
                    </div>
                    <div>
                      <p>
                        {career.open_count}{" "}
                        {lang === "ar"
                          ? `وظائف مفتوحة ` // RTL text
                          : `position open `}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <button
                      type="button"
                      className="btn btn_blogs btn_position_careers"
                    >
                      {career.position_name}{" "}
                    </button>

                    <div className="card-body">
                      <span className="card-text location_careers">
                        {lang === "ar"
                          ? `الموقع ` // RTL text
                          : `Location `}
                        :{" "}
                      </span>
                      <span>{career.location}</span>
                      <br />
                      <span className="card-text location_careers">
                        {lang === "ar"
                          ? `الخبرة ` // RTL text
                          : `Experience `}
                        :
                      </span>
                      <span>
                        {career.exp}
                        {lang === "ar"
                          ? `سنوات ` // RTL text
                          : `years `}
                      </span>
                      <br />
                      <br />
                      <Link
                        to={`/${lang}/jobdescription/${career.id}`}
                        className="link_job_desc_careers"
                      >
                        {lang === "ar"
                          ? `وصف الوظيفة ` // RTL text
                          : `Job Description
 `}
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Careers;
