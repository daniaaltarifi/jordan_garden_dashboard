import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Component/Header";
// export const API_URL = "http://localhost:3000";
export const API_URL = "https://jordangardensbackend.jordangardens.com";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import TopHeader from "./Component/TopHeader";
import Home from "./Pages/Home";
import Footer from "./Component/Footer";
import About from './Pages/About/About';
import Projects from "./Pages/Projects/Projects";
import Blogs from "./Pages/Blogs/Blogs";
import Careers from "./Pages/Careers/Careers";
import Services from './Pages/Services/Services';
import ServiceDetails from "./Pages/Services/ServiceDetails";
import JobDescription from "./Pages/Careers/JobDescription";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/Users/SignUp";
import Login from "./Pages/Users/Login";
import AddHeroSection from "./Pages/Heroes Section/AddHeroSecontion";
import UpdateHeroSecontion from "./Pages/Heroes Section/UpdateHero";
import UpdateService from "./Pages/Services/UpdateService";
import AddService from "./Pages/Services/AddService";
import UpdateJobDescription from "./Pages/Careers/UpdateJobDescription";
import AddDescriptionJob from "./Pages/Careers/AddDescriptionJob";
import UpdateCareers from "./Pages/Careers/UpdateCareers";
import AddCareers from "./Pages/Careers/AddCareers";
import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import UpdateServiceFeature from "./Pages/Services/UpdateServiceFeature";
import AddFeatureServices from "./Pages/Services/AddFeatureServices";
import CreateAdmin from "./Pages/Users/CreateAdmin";
import GetAllUsers from "./Pages/Users/GetAllUsers";
import UpdateLogo from "./Pages/Footer/UpdateLogo";
import UpdateSocial from "./Pages/Footer/UpdateSocial";
import AddSocial from "./Pages/Footer/AddSocial";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import AddPrivacyPolicy from "./Pages/PrivacyPolicy/AddPrivacyPolicy";
import UpdatePrivacyPolicy from "./Pages/PrivacyPolicy/UpdatePrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions/TermsAndConditions";
import AddTermsAndConditions from "./Pages/TermsAndConditions/AddTermsAndCondition";
import UpdateTermsAndCondition from "./Pages/TermsAndConditions/UpdateTermsAndCondition";
import AddContent from "./Pages/Footer/AddContent";
import UpdateContent from "./Pages/Footer/UpdateContent";
import AddProject from "./Pages/Projects/AddProject";
import UpdateProject from "./Pages/Projects/UpdateProject";
import UpdateImageProject from "./Pages/Projects/UpdateImageProject";
import AddBlog from "./Pages/Blogs/AddBlog";
import UpdateBlog from "./Pages/Blogs/UpdateBlog";
import UpdateAbout from "./Pages/About/UpdateAbout";
import AddAdvantage from "./Pages/Services/AddAdvantage";
import UpdateAdvantage from "./Pages/Services/UpdateAdvantage";
import UpdateCompany from "./Pages/About/UpdateCompany";

const DirectionHandler = () => {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";

  useEffect(() => {
    document.body.classList.remove("ltr", "rtl");
    document.body.classList.add(lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  return null;
};






const AppContent = () => {
  // const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!Cookies.get('token'));

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(!!token);
    }
  }, []);


  return (
    <>
      <TopHeader />
      <Header />
      <DirectionHandler />
      <Routes>
        <Route path="/*" element={isAuthenticated ? <Home /> : <Navigate to="/" replace />} />
        <Route exact path="/:lang/about" element={<About />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/:lang/signin" element={<Login />} />
        <Route exact path="/:lang/services" element={<Services />} />
        <Route exact path="/:lang/servicedetails/:id" element={<ServiceDetails />} />
        <Route exact path="/:lang/projects" element={<Projects />} />
        <Route exact path="/:lang/blogs" element={<Blogs />} />
        <Route exact path="/:lang/careers" element={<Careers />} />
        <Route path="/:lang/jobdescription/:careerId" element={<JobDescription />} />
        <Route exact path="/:lang/contact" element={<Contact />} />
        <Route exact path="/:lang/signup" element={<SignUp />} />
        <Route exact path="/signin" element={<Login />} />
        <Route path="/:lang/add-hero-section" element={<AddHeroSection />} />
        <Route path="/:lang/addservice" element={<AddService />} />
        <Route path="/:lang/addjobdescription" element={<AddDescriptionJob />} />
        <Route path="/:lang/AddFeatureServices" element={<AddFeatureServices />} />
        <Route path="/:lang/addadvantage" element={<AddAdvantage />} />
        <Route path="/:lang/updateadvantage/:id" element={<UpdateAdvantage />} />
        <Route path="/:lang/update-hero-section/:id" element={<UpdateHeroSecontion />} />
        <Route path="/:lang/updateservice/:id" element={<UpdateService />} />
        <Route path="/:lang/updatelogo/:id" element={<UpdateLogo />} />
        <Route path="/:lang/updatesocial/:id" element={<UpdateSocial />} />
        <Route path="/:lang/updateprivacypolicy/:id" element={<UpdatePrivacyPolicy />} />
        <Route path="/:lang/updatejobdescription/:careerId" element={<UpdateJobDescription />} />
        <Route path="/:lang/update-feature/:id" element={<UpdateServiceFeature />} />
        <Route path="/:lang/updatecareers/:id" element={<UpdateCareers />} />
        <Route path="/:lang/updatecontent/:id" element={<UpdateContent />} />
        <Route path="/:lang/addcareer" element={<AddCareers />} />
        <Route path="/:lang/createadmin" element={<CreateAdmin />} />
        <Route path="/:lang/getallusers" element={<GetAllUsers />} />
        <Route path="/:lang/addsocial" element={<AddSocial />} />
        <Route path="/:lang/addcontent" element={<AddContent />} />
        <Route path="/:lang/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/:lang/addprivacypolicy" element={<AddPrivacyPolicy />} />
        <Route path="/:lang/addproject" element={<AddProject />} />
        <Route path="/:lang/addtermsandcondition" element={<AddTermsAndConditions />} />
        <Route path="/:lang/addblog" element={<AddBlog />} />
        <Route path="/:lang/updateproject/:id" element={<UpdateProject />} />
        <Route path="/:lang/updateblog/:id" element={<UpdateBlog />} />
        <Route path="/:lang/updateimageproject/:id" element={<UpdateImageProject />} />
        <Route path="/:lang/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/:lang/updatetermsandcondition/:id" element={<UpdateTermsAndCondition />} />
        <Route path="/:lang/updateabout/:id" element={<UpdateAbout />} />
        <Route path="/:lang/updatecompany/:id" element={<UpdateCompany />} />

      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
