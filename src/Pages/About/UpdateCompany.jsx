import { useEffect, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../App';

function UpdateCompany() {
  const {id}=useParams()
  const lang = location.pathname.split("/")[1] || "en";
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    lang: 'en', 
  });

  const navigate = useNavigate();
useEffect(()=>{
  const getCompanyById=async()=>{
    try {
      const response = await axios.get(`${API_URL}/choose/getchoosecompanybyid/${lang}/${id}`);
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
  getCompanyById()
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
    console.log(file.name)
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('lang', lang);
  
    if (formData.image) {
      dataToSend.append('image', formData.image);
    }
  
    try {
        const response = await axios.put(`${API_URL}/choose/updatechoosecompany/${lang}/${id}`, dataToSend);
        console.log('Response:', response);
        
        
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
        Swal.fire({
          icon: 'error',
          title: 'Connection error!',
          text: 'We could not connect to the server, please try again later.',
        });
      }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{lang==='ar'? "تعديل لماذا تختار حدائق الاردن":"Update Why Choose Company"}</h2>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3 ">
          <Col xl={12} md={6} sm={12}>
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
export default UpdateCompany