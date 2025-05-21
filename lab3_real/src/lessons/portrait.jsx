import React from "react";
import "../styles/lesson_comp.css";  
import portrait from "../assets/additional/portrait_lesson.jpg"

const PortraitComp = () => (
  <div className="card" id="portrait">
    <img src={portrait} alt="Портретна фотографія" />
    <div className="card-content">
      <h3>Портретна фотографія</h3>
      <p>Техніки портретної зйомки, робота зі світлом і моделями.</p>
    </div>
  </div>
);

export default PortraitComp;
