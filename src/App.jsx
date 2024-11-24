import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Component/Header";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import TopHeader from "./Component/TopHeader";
import Home from "./Pages/Home";
import Footer from "./Component/Footer";
import About from "./Pages/About/About.jsx";
import Projects from "./Pages/Projects/Projects.jsx";
import Blogs from "./Pages/Blogs/Blogs.jsx";
import Careers from "./Pages/Careers";
import Services from "./Pages/Services";
import ServiceDetails from "./Pages/ServiceDetails";
import JobDescription from "./Pages/JobDescription";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import UpdateAbout from "./Pages/About/UpdateAbout.jsx";
import AddProject from "./Pages/Projects/AddProject.jsx";
import UpdateProject from "./Pages/Projects/UpdateProject.jsx";
import UpdateCompany from "./Pages/About/UpdateCompany.jsx";
import AddBlog from "./Pages/Blogs/AddBlog.jsx";
import UpdateBlog from "./Pages/Blogs/UpdateBlog.jsx";
export const API_URL = "http://localhost:3000"
import AddHeroSection from "./Pages/AddHeroSecontion";
import UpdateHeroSecontion from "./Pages/UpdateHero";
import UpdateService from "./Pages/UpdateService";
import AddService from "./Pages/AddService";
import UpdateImageProject from "./Pages/Projects/UpdateImageProject.jsx";
import UpdateLogo from "./Pages/Footer/UpdateLogo.jsx";
import AddSocial from "./Pages/Footer/AddSocial.jsx";
import UpdateSocial from "./Pages/Footer/UpdateSocial.jsx";
import AddContent from "./Pages/Footer/AddContent.jsx";
import UpdateContent from "./Pages/Footer/UpdateContent.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy.jsx";
import TermsAndConditions from "./Pages/TermsAndConditions/TermsAndConditions.jsx";
import AddPrivacyPolicy from "./Pages/PrivacyPolicy/AddPrivacyPolicy.jsx";
import UpdatePrivacyPolicy from "./Pages/PrivacyPolicy/UpdatePrivacyPolicy.jsx";
import AddTermsAndConditions from "./Pages/TermsAndConditions/AddTermsAndCondition.jsx";
import UpdateTermsAndCondition from "./Pages/TermsAndConditions/UpdateTermsAndCondition.jsx";

const DirectionHandler = () => {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";

  useEffect(() => {
    document.body.classList.remove("ltr", "rtl");
    document.body.classList.add(lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  return null;
};
function App() {
  return (
    <>
      <Router>
        <TopHeader />
        <Header />
        <DirectionHandler />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/:lang" element={<Home />} />
          <Route exact path="/:lang/about" element={<About />} />
          <Route exact path="/:lang/updateabout/:id" element={<UpdateAbout />} />
          <Route exact path="/:lang/updatecompany/:id" element={<UpdateCompany />} />
          <Route exact path="/:lang/services" element={<Services />} />
          <Route exact path="/:lang/servicedetails/:id" element={<ServiceDetails />} />
          <Route exact path="/:lang/projects" element={<Projects />} />
          <Route exact path="/:lang/addproject" element={<AddProject />} />
          <Route exact path="/:lang/updateproject/:id" element={<UpdateProject />} />
          <Route exact path="/:lang/updateimageproject/:id" element={<UpdateImageProject />} />
          <Route exact path="/:lang/blogs" element={<Blogs />} />
          <Route exact path="/:lang/addblog" element={<AddBlog />} />
          <Route exact path="/:lang/updateblog/:id" element={<UpdateBlog />} />
          <Route exact path="/:lang/careers" element={<Careers />} />
          <Route exact path="/:lang/jobdescription/:id" element={<JobDescription />} />
          <Route exact path="/:lang/contact" element={<Contact />} />
          <Route exact path="/:lang/signup" element={<SignUp />} />
          <Route exact path="/:lang/signin" element={<Login />} />
          <Route path="/add-hero-section" element={<AddHeroSection />} />
          <Route    path="/addservice" element={<AddService/>} />
          <Route path="/:lang/update-hero-section/:id" element={<UpdateHeroSecontion />} />
          <Route path="/:lang/updateservice/:id" element={<UpdateService />} />
          <Route exact path="/:lang/updatelogo/:id" element={<UpdateLogo />} />
          <Route exact path="/:lang/addsocial" element={<AddSocial />} />
          <Route exact path="/:lang/updatesocial/:id" element={<UpdateSocial />} />
          <Route exact path="/:lang/addcontent" element={<AddContent />} />
          <Route exact path="/:lang/updatecontent/:id" element={<UpdateContent />} />
          <Route exact path="/:lang/privacypolicy" element={<PrivacyPolicy />} />
          <Route exact path="/:lang/addprivacypolicy" element={<AddPrivacyPolicy />} />
          <Route exact path="/:lang/updateprivacypolicy/:id" element={<UpdatePrivacyPolicy />} />
          <Route exact path="/:lang/termsandconditions" element={<TermsAndConditions />} />
          <Route exact path="/:lang/addtermsandcondition" element={<AddTermsAndConditions />} />
          <Route exact path="/:lang/updatetermsandcondition/:id" element={<UpdateTermsAndCondition />} />

          {/* <Route exact path="/contact" element={<Contact />} />
  <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
