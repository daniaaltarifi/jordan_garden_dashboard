import { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../App";

function UpdateTermsAndCondition() {
  const { id } = useParams();
  const lang = location.pathname.split("/")[1] || "en";
  const [formData, setFormData] = useState({
    description: "",
    lang: "en",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const getPrivacyById = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/termsandconditions/gettermsAndConditionsbyid/${id}/${lang}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Connection error!",
          text: "We could not connect to the server, please try again later.",
        });
      }
    };
    getPrivacyById();
  }, [lang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.put(
        `${API_URL}/termsandconditions/updatetermsAndConditions/${id}/${lang}`,
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Updated Successfully!",
        text: "Updated Successfully.",
      }).then(() => {
        navigate(`/${lang}`);
      });
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Connection error!",
        text: "We could not connect to the server, please try again later.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className=" mb-4">
        {lang === "ar" ? "تعديل  الشروط والاحكام" : "Update Terms And Condition"}
      </h2>
      <Form onSubmit={handleSubmit}>

        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formDescription">
              <Form.Label>{lang === "ar" ? "الوصف" : "Description"}</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formLang">
              <Form.Label>{lang === "ar" ? "اللغة" : "Language"}</Form.Label>
              <Form.Control
                as="select"
                name="lang"
                value={formData.lang}
                onChange={handleChange}
              >
                <option value="en">
                  {lang === "ar" ? "انجليزي" : "English"}
                </option>
                <option value="ar">{lang === "ar" ? "عربي" : "Arabic"}</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" type="submit" className="w-50">
          {lang === "ar" ? "تعديل" : "Submit"}
        </Button>
      </Form>
    </div>
  );
}
export default UpdateTermsAndCondition;
