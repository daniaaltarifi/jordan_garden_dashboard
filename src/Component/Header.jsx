// Header.js
import { useEffect, useState } from "react";
import "../Css/Header.css"; // Assuming you have the CSS saved in Nav.css
import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import axios from "axios";
const Header = () => {
  const navigate = useNavigate();
  const lang = location.pathname.split("/")[1] || "en";
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [logo, setLogo] = useState([]);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const handleSelection = (event) => {
    const newLang = event.target.value;
    setSelectedOption(newLang);
    setDropdownVisible(false);
    navigate(`/${newLang}`);
  };
  useEffect(() => {
    const getLogo = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/logoes/getalllogos/${lang}`
        );
        setLogo(response.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    getLogo();
  }, []);

  return (
    <nav>
      {logo.map((log) => (
        <div className="logo" key={log.id}>
          <img src={`${API_URL}/uploads/${log.image}`} alt="Logo" />
        </div>
      ))}

      <div
        className={`hamburger ${isOpen ? "toggle" : ""}`}
        onClick={toggleMenu}
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <li>
          <Link to={`${lang}`}>{lang === "ar" ? "الرئيسية" : "Home"} </Link>
        </li>
        <li>
          <Link to={`${lang}/about`}>
            {lang === "ar" ? "عن حدائق الاردن" : " About"}
          </Link>
        </li>
        <li>
          <Link to={`${lang}/services`}>
            {lang === "ar" ? "الخدمات" : "Services"}
          </Link>
        </li>
        <li>
          <Link to={`${lang}/projects`}>
            {lang === "ar" ? "المشاريع" : "Projects"}
          </Link>
        </li>
        <li>
          <Link to={`${lang}/blogs`}>
            {lang === "ar" ? "المدونات" : " Blogs"}
          </Link>
        </li>
        <li>
          <Link to={`${lang}/careers`}>
            {lang === "ar" ? "الوظائف" : " Careers"}
          </Link>
        </li>
        <li>
          <Link to={`${lang}/contact`}>
            {lang === "ar" ? "تواصل معنا" : " Contact"}
          </Link>
        </li>
        <div className="d-flex">
          <li>
            <Link to={`${lang}/signin`}>
              <button className="Login-button">
                {" "}
                {lang === "ar" ? "تسجيل دخول" : "Login"}
              </button>
            </Link>
          </li>
          <li>
            <Link to={`${lang}/signup`}>
              <button className="Login-button background_btn">
                {" "}
                {lang === "ar" ? "تسجيل حساب" : " Sign Up"}
              </button>
            </Link>
          </li>
          <div
            className="dropdown-container border-none"
            onClick={toggleDropdown}
          >
            <div className="dropdown-wrapper">
              <select
                className="form-select small-select"
                value={selectedOption}
                onChange={handleSelection}
              >
                <option value="en">en</option>
                <option value="ar">ar</option>
              </select>
            </div>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Header;
