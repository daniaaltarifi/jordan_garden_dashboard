import { useState, useEffect } from "react";
import { Container, Row, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom"; 
import Swal from "sweetalert2"; 
import { API_URL } from "../App";

function Contact() {
  const { lang } = useParams(); 
  const [contactData, setContactData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(`${API_URL}/ContactUs/getallcontactus/${lang}`);
        const data = response.data;
        console.log("Fetched Data:", data);
       
        if (Array.isArray(data)) {
          setContactData(data);
        } else {
          setContactData([]); 
        }

        setLoading(false); 
      } catch (error) {
        console.error("Error fetching contact data:", error);
        setLoading(false); 
      }
    };

    fetchContactData(); 
  }, [lang]); 

 

  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are You Sure To Delete Contact Information For this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
   
          const response = await axios.delete(`${API_URL}/ContactUs/deletecontactus/${id}/${lang}`);
          if (response.status === 200) {
            setContactData(contactData.filter(contact => contact.id !== id));
            Swal.fire("Deleted!", "The contact information has been deleted.", "success");
            console.log("Contact deleted successfully");
          } else {
            Swal.fire("Failed!", "Failed to delete contact.", "error");
          }
        } catch (error) {
          console.error("Error deleting contact:", error);
          Swal.fire("Error!", "Something went wrong while deleting.", "error");
        }
      }
    });
  };

  return (
    <section className="main_margin_section">
      <Container className="cont_form_apply">
        <Row>
          <h5 className="text-center mb-5 title_contact">
            {lang === "ar" ? "تواصل معنا" : "Contact Information"}
          </h5>
          {loading ? (
            <p>Loading...</p> 
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>{lang === "ar" ? "الرقم" : "ID"}</th>
                  <th>{lang === "ar" ? "الاسم" : "Name"}</th>
                  <th>{lang === "ar" ? "رقم الهاتف" : "Phone Number"}</th>
                  <th>{lang === "ar" ? "البريد الالكتروني" : "Email"}</th>
                  <th>{lang === "ar" ? "العنوان" : "Address"}</th>
                  <th>{lang === "ar" ? "الرسالة" : "Message"}</th>
                  <th>{lang === "ar" ? "الإجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody>
                {contactData && contactData.length > 0 ? (
                  contactData.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.id}</td>
                      <td>{contact.first_name} {contact.last_name}</td>
                      <td>{contact.phone_number}</td>
                      <td>{contact.email_address}</td>
                      <td>{contact.physical_address}</td>
                      <td>{contact.message}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          className="ml-2"
                          onClick={() => handleDelete(contact.id)}
                        >
                          {lang === "ar" ? "حذف" : "Delete"}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">
                      {lang === "ar" ? "لا توجد بيانات" : "No Data Available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Row>
      </Container>
    </section>
  );
}

export default Contact;
