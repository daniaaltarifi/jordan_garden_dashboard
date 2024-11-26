import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../App";
function UpdateServiceFeature() {
  const { id, lang } = useParams(); 
  const navigate = useNavigate(); 
  const [featureData, setFeatureData] = useState({
    title: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    axios
      .get(`${API_URL}/featureservices/featureservicesbyservice_Id/${id}/${lang}`)
      .then((response) => {
        setFeatureData(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching feature data:", error);
        setError("Failed to load feature data");
        setLoading(false);
      });
  }, [id, lang]);


  const handleSubmit = (e) => {
    e.preventDefault(); 
    const formData = new FormData();
    formData.append("title", featureData.title);
    if (selectedFile) {
      formData.append("image", selectedFile); 
    }

    axios
      .put(`${API_URL}/featureservices/updatefeatureservicesnyserviceid/${id}/${lang}`, formData)
      .then((response) => {
        if (response.status === 200) {
     
            Swal.fire({
              title: lang === "ar" ? "تم تحديث خضائص الخدمة بنجاح" : "The Feature Services  Updated Successfully",
              icon: "success",
              confirmButtonText: lang === "ar" ? "موافق" : "OK",
            }).then(() => {
           
              navigate(`/${lang}/careers`);
            });
          }
     
      })
      .catch((error) => {
        console.error("Error updating feature:", error);
        setError("Failed to update feature");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
  <div className="container">
      <section className="update-feature-section mt-5">
      <h2>Update Service Feature</h2>
      <form onSubmit={handleSubmit}>
    
        <div className="form-group mb-3">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={featureData.title}
            onChange={(e) => setFeatureData({ ...featureData, title: e.target.value })}
            className="form-control"
            required
          />
        </div>


        <div className="form-group mb-3">
          <label>Current Image:</label>
          <img
            src={`${API_URL}/uploads/${featureData.image}`}
            alt="Current Feature"
            style={{ width: "100px", height: "100px", objectFit: "cover", display: "block", marginTop: "10px" }}
          />
        </div>


        <div className="form-group mb-3">
          <label htmlFor="image">Upload New Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="form-control"
          />
        </div>


        <button  className="btn btn-success">
          Update Feature
        </button>
      </form>
    </section>
  </div>
  );
}

export default UpdateServiceFeature;
