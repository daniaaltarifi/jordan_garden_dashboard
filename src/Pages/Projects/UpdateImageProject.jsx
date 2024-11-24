import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../App";
import axios from "axios";
import Swal from "sweetalert2";

function UpdateImageProject() {
  const lang = location.pathname.split("/")[1] || "en";
  const { id } = useParams();
  const navigate = useNavigate();
  const [img, setImg] = useState(null);

  // Handle form submission
  const updateimageproject = async (e) => {
    e.preventDefault();

    // Ensure a file is selected
    if (!img) {
      Swal.fire({
        icon: "error",
        title: "No file selected",
        text: "Please select a file to upload.",
      });
      return;
    }

    // Create FormData object
    const formdata = new FormData();
    formdata.append("image", img[0]); // Get the first file from the FileList

    try {
      // Send the PUT request with the formdata
      await axios.put(`${API_URL}/projectsimages/project-images/${id}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the content type is set to handle file upload
        },
      });

      Swal.fire({
        icon: "success",
        title: "Updated Successfully!",
        text: "The project image has been updated.",
      }).then(() => {
        navigate(`/${lang}/projects`);
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error connecting to the server.",
      });
    }
  };

  return (
    <section className="main_margin_section">
      <Container>
        <h1>Update Image Project</h1>
        <Form onSubmit={updateimageproject}>
          <Form.Group controlId="image">
            <Form.Label>
              {lang === "ar" ? "صورة المشروع" : "Project Image"}
            </Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={(e) => {
                setImg(e.target.files); // Store the selected files in state
              }}
            />
          </Form.Group>
          <Button variant="success" type="submit" className="w-25 mt-3">
            {lang === "ar" ? "تعديل" : "Submit"}
          </Button>
        </Form>
      </Container>
    </section>
  );
}

export default UpdateImageProject;
