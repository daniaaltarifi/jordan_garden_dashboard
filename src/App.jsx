import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Component/Header";

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
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Blogs from "./Pages/Blogs";
import Careers from "./Pages/Careers";
import Services from "./Pages/Services";
import ServiceDetails from "./Pages/ServiceDetails";
import JobDescription from "./Pages/JobDescription";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import AddHeroSection from "./Pages/AddHeroSecontion";
import UpdateHeroSecontion from "./Pages/UpdateHero";
import UpdateService from "./Pages/UpdateService";
import AddService from "./Pages/AddService";
import UpdateJobDescription from "./Pages/UpdateJobDescription";
import AddDescriptionJob from "./Pages/AddDescriptionJob";
import UpdateCareers from "./Pages/UpdateCareers";
import AddCareers from "./Pages/AddCareers";
import Cookies from 'js-cookie';
import { useState,useEffect } from "react";
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
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!Cookies.get('authtoken'));
  useEffect(() => {
    const token = Cookies.get('authtoken');
    if (token) {
      setIsAuthenticated(!!token);
    }
  }, []);


  return (
    <>
      <Router>
        <TopHeader />
        <Header />
        <DirectionHandler />
        <Routes>
        <Route path="/dashboard/*" element={
        isAuthenticated ? <Home /> : <Navigate to="/:lang/signin" replace />}/>
          <Route exact path="/:lang/about" element={<About />} />
          <Route exact path="/:lang/services" element={<Services />} />
          <Route exact path="/:lang/servicedetails/:id" element={<ServiceDetails />} />
          <Route exact path="/:lang/projects" element={<Projects />} />
          <Route exact path="/:lang/blogs" element={<Blogs />} />
          <Route exact path="/:lang/careers" element={<Careers />} />
          <Route path="/:lang/jobdescription/:careerId" element={<JobDescription />} />
          <Route exact path="/:lang/contact" element={<Contact />} />
          <Route exact path="/:lang/signup" element={<SignUp />} />
          <Route exact path="/:lang/signin" element={<Login />} />
          <Route path="/add-hero-section" element={<AddHeroSection />} />
          <Route    path="/:lang/addservice" element={<AddService/>} />
          <Route path="/:lang/addjobdescription" element={<AddDescriptionJob />} />
          <Route path="/:lang/update-hero-section/:id" element={<UpdateHeroSecontion />} />
          <Route path="/:lang/updateservice/:id" element={<UpdateService />} />
          <Route path="/:lang/updatejobdescription/:careerId" element={<UpdateJobDescription />} />
          <Route path="/:lang/updatecareers/:id" element={<UpdateCareers />} />
          <Route path="/:lang/addcareer" element={<AddCareers />} />
          {/* <Route exact path="/contact" element={<Contact />} />
  <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
