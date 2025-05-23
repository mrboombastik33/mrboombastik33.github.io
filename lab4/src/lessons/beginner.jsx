import React from "react";
import amateur from "../assets/additional/amateur2.jpg"
import "../styles/lesson_comp.css";            

const BeginnerComp = () => (
  <div className="card" id="newbie">
    <img src={amateur} alt="Фотографія для початківців" />
    <div className="card-content">
      <h3>Фотографія для початківців</h3>
      <p>Основи фотографії, налаштування камери та композиція.</p>
    </div>
  </div>
);

export default BeginnerComp;
