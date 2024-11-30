import { useState, useEffect } from "react";
import { Container, Row, Table, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { API_URL } from "../../App";
function GetAllUsers() {
  const { lang } = useParams(); 
  const [usersData, setUsersData] = useState([]); 
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/allusers/${lang}`);
        const data = response.data;


        if (Array.isArray(data)) {
          setUsersData(data);
        } else {
          setUsersData([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching users data:", error);
        setLoading(false);
      }
    };

    fetchUsersData();
  }, [lang]);

  // حذف مستخدم
  const handleDelete = (id) => {
    Swal.fire({
      title: lang === "ar" ? "هل أنت متأكد؟" : "Are you sure?",
      text: lang === "ar" ? "هل تريد حذف هذا المستخدم؟" : "Do you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: lang === "ar" ? "نعم، احذف!" : "Yes, Delete it!",
      cancelButtonText: lang === "ar" ? "إلغاء" : "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${API_URL}/users/deleteuser/${id}`);
          if (response.status === 200) {
            setUsersData(usersData.filter((user) => user.id !== id));
            Swal.fire(lang === "ar" ? "تم الحذف!" : "Deleted!", lang === "ar" ? "تم حذف المستخدم." : "The user has been deleted.", "success");
          } else {
            Swal.fire(lang === "ar" ? "فشل!" : "Failed!", lang === "ar" ? "فشل حذف المستخدم." : "Failed to delete the user.", "error");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire(lang === "ar" ? "خطأ!" : "Error!", lang === "ar" ? "حدث خطأ أثناء الحذف." : "Something went wrong while deleting.", "error");
        }
      }
    });
  };

  return (
    <section className="main_margin_section">
      <Container className="cont_form_apply">
        <Row>
          <h5 className="text-center mb-5 title_contact">
            {lang === "ar" ? "قائمة المستخدمين" : "Users List"}
          </h5>
          {loading ? (
            <p>{lang === "ar" ? "جارٍ التحميل..." : "Loading..."}</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>{lang === "ar" ? "الرقم" : "ID"}</th>
                  <th>{lang === "ar" ? "الاسم" : "Name"}</th>
                  <th>{lang === "ar" ? "البريد الإلكتروني" : "Email"}</th>
                  <th>{lang === "ar" ? "رقم الهاتف" : "Phone Number"}</th>
                  <th>{lang === "ar" ? "الإجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody>
                {usersData && usersData.length > 0 ? (
                  usersData.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone_number}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          className="ml-2"
                          onClick={() => handleDelete(user.id)}
                        >
                          {lang === "ar" ? "حذف" : "Delete"}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
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

export default GetAllUsers;
