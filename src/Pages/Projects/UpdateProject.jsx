// import { useEffect, useState } from 'react';
// import { Form, Button, Col, Row } from 'react-bootstrap';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useNavigate, useParams } from 'react-router-dom';
// import { API_URL } from '../../App';
// import { MdEdit } from "react-icons/md";
// import { Link } from 'react-router-dom';
// function UpdateProject() {
//   const {id}=useParams()
//   const lang = location.pathname.split("/")[1] || "en";
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     image: null,
//     location: '',
//     service_id: '',
//     lang: 'en', 
    
//   });
//   const [services, setServices] = useState([]);

//   const navigate = useNavigate();
//   useEffect(()=>{
//     const getProjById=async()=>{
//         try {
//           const response = await axios.get(`${API_URL}/projects/getprojectbyid/${id}/${lang}`);
//           setFormData(response.data);
//           console.log("first project" ,response.data)
//         } catch (error) {
//           console.error('Error:', error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Connection error!',
//             text: 'We could not connect to the server, please try again later.',
//           });
//         }
//       };
//       const getServices = async () => {
//         try {
//           const response = await axios.get(
//             `${API_URL}/services/allservices/${lang}`
//           );
//           setServices(response.data);
//         } catch (error) {
//           console.log("error: ", error);
//         }
//       };
//       getProjById()
//       getServices()
//   },[lang])

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       image: file,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const dataToSend = new FormData();
//     dataToSend.append('title', formData.title);
//     dataToSend.append('description', formData.description);
//     dataToSend.append('service_id', formData.service_id);
//     dataToSend.append('location', formData.location);
//     dataToSend.append('lang', formData.lang);
  
//     if (formData.image) {
//       dataToSend.append('image', formData.image);
//     }
  
//     try {
//         const response = await axios.put(`${API_URL}/projects/updateproject/${id}/${lang}`, dataToSend);
//         console.log('Response:', response);
        
        
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated Successfully!',
//           text: 'Updated Successfully.',
//         }).then(() => {
//           navigate(`/${lang}/projects`);
//           // setFormData({ title: '', description: '', image: null, location: '', titleBtn: '', lang: 'en' });
//         });

//       } catch (error) {
//         console.error('Error:', error);
        
//         Swal.fire({
//           icon: 'error',
//           title: 'Connection error!',
//           text: 'We could not connect to the server, please try again later.',
//         });
//       }
//   };
  

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">{lang==='ar'?"تعديل  مشروع":"Update Project"}</h2>
//       <Form onSubmit={handleSubmit}>
//         <Row className="mb-3">
//           <Col xl={6} md={6} sm={12}>
//             <Form.Group controlId="formTitle">
//               <Form.Label>{lang==='ar'?"العنوان":"Title"}</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col xl={6} md={6} sm={12}>
//             <Form.Group controlId="formlocation">
//               <Form.Label>{lang==='ar'?"الموقع":"location"}</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row className="mb-3">
          
//           <Col xl={6} md={6} sm={12}>
//             <Form.Group controlId="formDescription">
//               <Form.Label>{lang==='ar'?"الوصف":"Description"}</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={5}
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col xl={6} md={6} sm={12}>
//             <Form.Group controlId="formTitleBtn">
//             <Form.Label>{lang ==='ar' ?"الخدمة":"service"}</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="service_id"
//                 value={formData.service_id}
//                 onChange={handleChange}
//               >
//                 {services.map((service) => (
//                   <>
//                     <option value="">{lang ==='ar' ?"اختر الخدمة":"Select service"}</option>
//                     <option key={service._id} value={service.id}>
//                       {service.title}
//                     </option>
//                   </>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row className="mb-3">
//           <Col xl={6} md={6} sm={12}>
//             <Form.Group controlId="formLang">
//               <Form.Label>{lang==='ar'?"اللغة":"Language"}</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="lang"
//                 value={formData.lang}
//                 onChange={handleChange}
//               >
//                 <option value="en">{lang==='ar'?"انجليزي":"English"}</option>
//                 <option value="ar">{lang==='ar'?"عربي":"Arabic"}</option>
//               </Form.Control>
//             </Form.Group>
//           </Col>
//         </Row>

//         <Form.Group controlId="formImage" className="mb-3">
//           <Form.Label>{lang==='ar'?"تحميل الصور":"Upload Image"}</Form.Label>
//           <Form.Control
//             type="file"
//             onChange={handleImageChange}
//           />
//          <div className="mt-2">
//             {formData.ProjectImages && formData.ProjectImages.length > 0 && (
//               <ul>
//                 {formData.ProjectImages.map((file, index) => (
//                   <li key={index}>{file.image}
//                   <Link to={`/${lang}/updateimageproject/${file.id}`}>
//                  <MdEdit className='mx-2'/>
//                  </Link>
//                  </li>
//                 ))}
//               </ul>
//             )}
//             </div>
//         </Form.Group>

//         <Button variant="success" type="submit" className="w-100">
//           {lang==='ar'?"تعديل":"Submit"}
//         </Button>
//       </Form>
//     </div>
//   );
// }
// export default UpdateProjectimport { useEffect, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../App';
import { MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';


function UpdateProject() {
  const { id } = useParams();
  const lang = location.pathname.split("/")[1] || "en";
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    location: '',
    service_id: '',
    lang: 'en',
    ProjectImages: []  // To track the current images
  });

  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjById = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects/getprojectbyid/${id}/${lang}`);
        setFormData({
          ...response.data,
          ProjectImages: response.data.ProjectImages || []  // Use ProjectImages from the response
        });
        console.log("First project data: ", response.data.ProjectImages.length);
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Connection error!',
          text: 'We could not connect to the server, please try again later.',
        });
      }
    };

    const getServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/services/allservices/${lang}`);
        setServices(response.data);
      } catch (error) {
        console.log("Error fetching services: ", error);
      }
    };

    getProjById();
    getServices();
  }, [lang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    // Check if the project already has 3 or more images
    if (formData.ProjectImages.length >= 3) {
      Swal.fire({
        icon: "error",
        title: "Image Limit Exceeded!",
        text: "You can only upload a maximum of 3 images.",
      });
      e.target.value = null;
      return;  // Prevent adding the new image
    }
    
    // Add the new image to the form data if the limit is not reached
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
    dataToSend.append('service_id', formData.service_id);
    dataToSend.append('location', formData.location);
    dataToSend.append('lang', formData.lang);
  
    // If a new image is selected and valid, add it to the form data
    if (formData.image) {
      dataToSend.append('image', formData.image);
    }
  
    try {
      const response = await axios.put(`${API_URL}/projects/updateproject/${id}/${lang}`, dataToSend);
      console.log('Response:', response);

      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully!',
        text: 'Updated Successfully.',
      }).then(() => {
        navigate(`/${lang}/projects`);
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
      <h2 className="text-center mb-4">{lang === 'ar' ? "تعديل مشروع" : "Update Project"}</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formTitle">
              <Form.Label>{lang === 'ar' ? "العنوان" : "Title"}</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formlocation">
              <Form.Label>{lang === 'ar' ? "الموقع" : "Location"}</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formDescription">
              <Form.Label>{lang === 'ar' ? "الوصف" : "Description"}</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xl={6} md={6} sm={12}>
            <Form.Group controlId="formTitleBtn">
              <Form.Label>{lang === 'ar' ? "الخدمة" : "Service"}</Form.Label>
              <Form.Control
                as="select"
                name="service_id"
                value={formData.service_id}
                onChange={handleChange}
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formImage" className="mb-3">
          <Form.Label>{lang === 'ar' ? "تحميل الصورة" : "Upload Image"}</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageChange}
          />
          <div className="mt-2">
            {formData.ProjectImages.length > 0 && (
              <ul>
                {formData.ProjectImages.map((file, index) => (
                  <li key={index}>{file.image}
                    <Link to={`/${lang}/updateimageproject/${file.id}`}>
                      <MdEdit className="mx-2" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          {lang === 'ar' ? "تعديل" : "Submit"}
        </Button>
      </Form>
    </div>
  );
}

export default UpdateProject;

