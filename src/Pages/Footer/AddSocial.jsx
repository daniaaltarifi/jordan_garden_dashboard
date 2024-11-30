import { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../App';

function AddSocial() {
  const lang = location.pathname.split("/")[1] || "en";
  const [formData, setFormData] = useState({
    content: '',
    icon: null,
    lang: 'en', 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleiconChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      icon: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataToSend = new FormData();
    dataToSend.append('content', formData.content);
    dataToSend.append('lang', formData.lang);
  
    if (formData.icon) {
      dataToSend.append('icon', formData.icon);
    }
  
    try {
       await axios.post(`${API_URL}/contacts/createcontact`, dataToSend);
        
        
        Swal.fire({
          icon: 'success',
          content: 'Added Successfully!',
          text: 'Added Successfully.',
        }).then(() => {
          navigate(`/${lang}`);
        });

      } catch (error) {
        console.error('Error:', error);        
        Swal.fire({
          icon: 'error',
          content: 'Connection error!',
          text: 'We could not connect to the server, please try again later.',
        });
      }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{lang==='ar' ? "اضافة تواصل اجتماعي":"Add Social Media"}</h2>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xl={12} md={6} sm={12}>
            <Form.Group controlId="formcontent">
              <Form.Label>{lang ==='ar' ?"المحتوى":"content"}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xl={12} md={6} sm={12}>
            <Form.Group controlId="formLang">
              <Form.Label>{lang ==='ar' ?"اللغة":"Language"}</Form.Label>
              <Form.Control
                as="select"
                name="lang"
                value={formData.lang}
                onChange={handleChange}
                required
              >
                <option value="en">{lang==='ar'?"انجليزي":"English"}</option>
                <option value="ar">{lang==='ar'?"عربي":"Arabic"}</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formicon" className="mb-3">
          <Form.Label>{lang ==='ar' ?"تحميل الصور":"Upload icons"}</Form.Label>
          <Form.Control
            type="file"
            onChange={handleiconChange}
            required
          />
          <div className="mt-2">
            {formData.icon && (
              <p>{formData.icon.name}</p>
            )}
          </div>
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
        {lang ==='ar' ?"اضافة":"Submit"}
        </Button>
      </Form>
    </div>
  );
}
export default AddSocial