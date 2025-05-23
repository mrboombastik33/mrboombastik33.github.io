import { Link, useLocation, useNavigate } from 'react-router-dom'
import "../styles/styles.css";
import photo_icon from "../assets/additional/photo_icon.png";


export default function Page_Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAboutClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToDiv, 0);
    } else {
      scrollToDiv();
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={photo_icon} alt="Logo" />
          <span>Школа фотографії</span>
        </div>

        <nav className="nav">
          <Link to="/" onClick={handleAboutClick}>Про нас</Link>
          <Link to="/lessons">Уроки</Link>
          <Link to="/gallery">Галерея</Link>
          <Link to="/progress">Мій прогрес</Link>
        </nav> 

        <div className="actions">
          <Link to = "/account"><button className="btn">Акаунт</button></Link>
        </div>
      </div>
    </header>
  );
}

function scrollToDiv() {
  const el = document.getElementById("main_info");
  el?.scrollIntoView({ behavior: "smooth" });
}
