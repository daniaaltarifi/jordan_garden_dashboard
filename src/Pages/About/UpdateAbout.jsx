import { useEffect, useState } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../App';

function UpdateAbout() {
  const {id}=useParams()
  const lang = location.pathname.split("/")[1] || "en";
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    link: '',
    title_btn: '',
    lang: 'en', 
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
useEffect(()=>{
  const getAboutById=async()=>{
    try {
      const response = await axios.get(`${API_URL}/about/getaboutbyid/${id}/${lang}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Connection error!',
        text: 'We could not connect to the server, please try again later.',
      });
    }
  };
  getAboutById()
},[lang])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('description', formData.description);
    dataToSend.append('title_btn', formData.title_btn);
    dataToSend.append('link', formData.link);
    dataToSend.append('lang', formData.lang);
  
    if (formData.image) {
      dataToSend.append('image', formData.image);
    }
  
    try {
        await axios.put(`${API_URL}/about/updateabout/${id}/${lang}`, dataToSend);
        
        setMessage({ type: 'success', text: ' Updated Successfully!' });
        
        Swal.fire({
          icon: 'success',
          title: 'Updated Successfully!',
          text: 'Updated Successfully.',
        }).then(() => {
          navigate(`/${lang}/about`);
          // setFormData({ title: '', description: '', image: null, link: '', titleBtn: '', lang: 'en' });
        });

      } catch (error) {
        console.error('Error:', error);
        setMessage({ type: 'error', text: 'There was an error connecting to the server.' });
        
        Swal.fire({
          icon: 'error',
          title: 'Connection error!',
          text: 'We could not connect to the server, please try again later.',
        });
      }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{lang==='ar'? "تعديل عن حدائق الاردن":"Update About"}</h2>

      {message && (
        <Alert variant={message.type === 'success' ? 'success' : 'danger'}>
          {message.text}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formTitle">
              <Form.Label>{lang==='ar'? "العنوان":"Title"}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formLink">
              <Form.Label>{lang==='ar'? "الرابط":"Link"}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter link"
                name="link"
                value={formData.link}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formDescription">
              <Form.Label>{lang==='ar'? "الوصف":"Description"}</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formTitleBtn">
              <Form.Label>{lang==='ar'? "عنوان الرابط":"Button Title"}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter button title"
                name="title_btn"
                value={formData.title_btn}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formLang">
              <Form.Label>{lang==='ar'? "اللغة":"Language"}</Form.Label>
              <Form.Control
                as="select"
                name="lang"
                value={formData.lang}
                onChange={handleChange}
              >
                <option value="en">{lang==='ar'?"انجليزي":"English"}</option>
                <option value="ar">{lang==='ar'?"عربي":"Arabic"}</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formImage" className="mb-3">
          <Form.Label>{lang==='ar'?"تحميل الصورة":"Upload Image"}</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageChange}
          />
          <div className="mt-2">
            {formData.image && (
              <p>{formData.image.name}</p>
            )}
          </div>
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          {lang==='ar'?"ارسال":"Submit"}
        </Button>
      </Form>
    </div>
  );
}
export default UpdateAbout