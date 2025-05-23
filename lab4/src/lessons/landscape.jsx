import "../styles/lesson_comp.css";  
import land from "../assets/additional/landscape2.jpg"

const LandscapeComp = () => (
  <div className="card" id="landscape">
    <img src={land} alt="Пейзажна фотографія" />
    <div className="card-content">
      <h3>Пейзажна фотографія</h3>
      <p>Зйомка природи, налаштування камери та використання фільтрів.</p>
    </div>
  </div>
);

export default LandscapeComp;