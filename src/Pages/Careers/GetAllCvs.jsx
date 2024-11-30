import { useState, useEffect } from "react";
import { Container, Row, Table, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../App";

const lang = location.pathname.split("/")[1] || "en";

function GetAllCvs() {
  const [cvsData, setCvsData] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCvsData = async () => {
      try {
        if (!API_URL) {
          console.error("API_URL is not defined");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/CreateCareer/allcvs/${lang}`);
        const data = response.data;

        if (Array.isArray(data)) {
          setCvsData(data);
        } else {
          console.warn("Unexpected data format:", data);
          setCvsData([]);
        }
      } catch (error) {
        console.error("Error fetching CVs data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCvsData();
  }, []);


  const handleDownloadCv = (cvPath) => {
    if (!cvPath) {
      Swal.fire(
        lang === "ar" ? "لا يوجد ملف!" : "No file!",
        lang === "ar" ? "لم يتم توفير السيرة الذاتية." : "No CV file available.",
        "info"
      );
      return;
    }

  
    const formattedPath = `${API_URL}/${cvPath.replace(/\\/g, "/")}`;
    window.open(formattedPath, "_blank");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: lang === "ar" ? "هل أنت متأكد؟" : "Are you sure?",
      text: lang === "ar" ? "هل تريد حذف هذه السيرة الذاتية؟" : "Do you want to delete this CV?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: lang === "ar" ? "نعم، احذف!" : "Yes, Delete it!",
      cancelButtonText: lang === "ar" ? "إلغاء" : "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${API_URL}/CreateCareer/deletecareerbycareerid/${id}`);
          if (response.status === 200) {
            setCvsData(cvsData.filter((cv) => cv.id !== id));
            Swal.fire(lang === "ar" ? "تم الحذف!" : "Deleted!", lang === "ar" ? "تم حذف السيرة الذاتية." : "The CV has been deleted.", "success");
          } else {
            Swal.fire(lang === "ar" ? "فشل!" : "Failed!", lang === "ar" ? "فشل حذف السيرة الذاتية." : "Failed to delete the CV.", "error");
          }
        } catch (error) {
          console.error("Error deleting CV:", error);
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
            {lang === "ar" ? "قائمة السير الذاتية" : "CVs List"}
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
                  <th>{lang === "ar" ? "عدد سنوات الخبرة" : "Years of Experience"}</th>
                  <th>{lang === "ar" ? "المسمى الوظيفي" : "Position"}</th>
                  <th>{lang === "ar" ? "تحميل السيرة الذاتية" : "Download CV"}</th>
                  <th>{lang === "ar" ? "الإجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody>
                {cvsData.length > 0 ? (
                  cvsData.map((cv) => (
                    <tr key={cv.id}>
                      <td>{cv.id}</td>
                      <td>{cv.firstName} {cv.lastName || (lang === "ar" ? "غير متوفر" : "N/A")}</td>
                      <td>{cv.email || (lang === "ar" ? "غير متوفر" : "N/A")}</td>
                      <td>{cv.phoneNumber || (lang === "ar" ? "غير متوفر" : "N/A")}</td>
                      <td>{cv.yearsOfExperience || (lang === "ar" ? "غير متوفر" : "N/A")}</td>
                      <td>{cv.Career?.position || (lang === "ar" ? "غير متوفر" : "N/A")}</td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleDownloadCv(cv.uploadCv)}
                        >
                          {lang === "ar" ? "تحميل" : "Download"}
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(cv.id)}
                        >
                          {lang === "ar" ? "حذف" : "Delete"}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
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

export default GetAllCvs;
