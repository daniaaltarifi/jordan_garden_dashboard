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
          <Route exact path="/:lang/services" element={<Services />} />
          <Route exact path="/:lang/servicedetails/:id" element={<ServiceDetails />} />
          <Route exact path="/:lang/projects" element={<Projects />} />
          <Route exact path="/:lang/blogs" element={<Blogs />} />
          <Route exact path="/:lang/careers" element={<Careers />} />
          <Route exact path="/:lang/jobdescription/:id" element={<JobDescription />} />
          <Route exact path="/:lang/contact" element={<Contact />} />
          <Route exact path="/:lang/signup" element={<SignUp />} />
          <Route exact path="/:lang/signin" element={<Login />} />

          {/* <Route exact path="/contact" element={<Contact />} />
  <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
