import "../styles/styles.css";  
import still from "../assets/additional/still_life3.jpg"


const StillLifeComp = () => (
  <div className="card" id="still">
    <img src={still} alt="Фотографія продуктів та їжі" />
    <div className="card-content">
      <h3>Фотографія продуктів та їжі</h3>
      <p>Як красиво знімати їжу та створювати апетитні кадри.</p>
    </div>
  </div>
);

export default StillLifeComp;
