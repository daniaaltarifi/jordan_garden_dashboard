import { useEffect, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../App';
import { MdEdit } from "react-icons/md";

function UpdateBlog() {
  const {id}=useParams()
  const lang = location.pathname.split("/")[1] || "en";
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    lang: 'en', 
  });

  const navigate = useNavigate();
  useEffect(()=>{
    const getProjById=async()=>{
        try {
          const response = await axios.get(`${API_URL}/blogs/getblogbyid/${id}/${lang}`);
          setFormData(response.data);
          console.log("first project" ,response.data)
        } catch (error) {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Connection error!',
            text: 'We could not connect to the server, please try again later.',
          });
        }
      };
      getProjById()
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
    dataToSend.append('lang', formData.lang);
  
    if (formData.image) {
      dataToSend.append('image', formData.image);
    }
  
    try {
        const response = await axios.put(`${API_URL}/blogs/updateblog/${id}/${lang}`, dataToSend);
        console.log('Response:', response);
        
        
        Swal.fire({
          icon: 'success',
          title: 'Updated Successfully!',
          text: 'Updated Successfully.',
        }).then(() => {
          navigate(`/${lang}/blogs`);
          // setFormData({ title: '', description: '', image: null, location: '', titleBtn: '', lang: 'en' });
        });

      } catch (error) {
        console.error('Error:', error);
        
        Swal.fire({
          icon: 'error',
          title: 'Connection error!',
          text: 'We could not connect to the server, please try again later.',
        });
      }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{lang==='ar'?"تعديل  مدونة":"Update Blog"}</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formTitle">
              <Form.Label>{lang==='ar'?"العنوان":"Title"}</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formDescription">
              <Form.Label>{lang==='ar'?"الوصف":"Description"}</Form.Label>
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
              <Form.Label>{lang==='ar'?"اللغة":"Language"}</Form.Label>
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
          <Form.Label>{lang==='ar'?"تحميل الصور":"Upload Image"}</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageChange}
          />
         <div className="mt-2">
            {formData.image && formData.image.length > 0 && (
              <ul>
                {formData.image.map((file, index) => (
                  <li key={index}>{file.image}<MdEdit className='mx-2'/></li>
                ))}
              </ul>
            )}
            </div>
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          {lang==='ar'?"تعديل":"Submit"}
        </Button>
      </Form>
    </div>
  );
}
export default UpdateBlog