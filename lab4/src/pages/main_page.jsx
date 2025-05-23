import "../styles/styles.css";
import amateur_photo from "../assets/additional/amateur_photo.jpg";
import portrait from "../assets/additional/portrait2.jpg";
import landscape from "../assets/additional/landscape.jpg";
import still_life from "../assets/additional/still_life.jpg";
import video from "../assets/additional/background-vid.mp4";


const Main_Page = () => {
  return (
    <>
        <div className="container">
          <video autoPlay loop muted playsInline className="background_clip">
            <source src={video} type="video/mp4" />
          </video>

          <div className="content">
            <h1>Пориньте у світ фотографії з нами</h1>
            <a href="#" id="lessons2">Почніть навчання прямо зараз</a>
          </div>
        </div>


      <div id="main_info" className="white_background">
        <section className="about_us">
          <h2>Про нас</h2>
          <p>
            Наша школа фотографії — це місце, де пристрасть до мистецтва
            зустрічається з професіоналізмом. Ми допомагаємо фотографам
            будь-якого рівня розвивати свої навички, від основ до майстерності.
          </p>

          <h3>Наша місія</h3>
          <p>
            Наша місія – надихати та навчати, допомагаючи кожному студенту
            знаходити свій унікальний стиль.
          </p>

          <h3>Чому саме ми?</h3>
          <ul>
            <li>
              <strong>10+ років досвіду</strong> у сфері фотографії та
              навчання.
            </li>
            <li>
              <strong>Сучасне обладнання</strong> та практичні заняття.
            </li>
            <li>
              <strong>Викладачі – професіонали</strong> з реальним досвідом у
              фотографії.
            </li>
            <li>
              <strong>Індивідуальний підхід</strong> та гнучкий графік
              навчання.
            </li>
          </ul>

          <p>Приєднуйтесь до нас і відкрийте для себе світ фотографії! 🚀</p>
        </section>
      </div>

      <div className="info_container">
        <div className="info_section">
          <h2>Не зволікайте</h2>
          <p className="intro_text">
            Відкрийте для себе мистецтво створення унікальних зображень, що
            розповідають історії. Наша школа допоможе вам розвинути навички
            фотографії, незалежно від того, чи ви початківець, чи досвідчений
            фотограф.
          </p>

          <h3>Наші курси:</h3>

          <div className="course">
            <div className="course_text">
              <h4>Фотографія для початківців</h4>
              <p>
                Вивчіть основи фотографії: експозиція, композиція, налаштування
                камери.
              </p>
            </div>
            <img src={amateur_photo} alt="Фотографія для початківців" />
          </div>

          <div className="course reverse">
            <img src={portrait} alt="Портретна фотографія" />
            <div className="course_text">
              <h4>Портретна фотографія</h4>
              <p>Дізнайтеся, як створювати емоційні та професійні портрети.</p>
            </div>
          </div>

          <div className="course">
            <div className="course_text">
              <h4>Пейзажна фотографія</h4>
              <p>Опануйте техніки зйомки природи та міських ландшафтів.</p>
            </div>
            <img src={landscape} alt="Пейзажна фотографія" />
          </div>

          <div className="course reverse">
            <img src={still_life} alt="Натюрморт" />
            <div className="course_text">
              <h4>Фотографія продуктів та їжі</h4>
              <p>
                Навчіться робити якісні фотографії товарів та страв для
                комерційних цілей.
              </p>
            </div>
          </div>

          <p className="cta">Ваша мрія стати фотографом починається тут!</p>
        </div>
      </div>

    </>
  );
};

export default Main_Page;
