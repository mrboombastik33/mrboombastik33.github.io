import { Link, useLocation, useNavigate } from 'react-router-dom'
import "../styles/styles.css";
import photo_icon from "../assets/additional/photo_icon.png";
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function Page_Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
          {user ? (
            <Link to="/account" className="user-profile-link">
              <div className="user-profile">
                {userProfile?.photoURL ? (
                  <img src={userProfile.photoURL} alt="Profile" className="profile-pic" />
                ) : (
                  <div className="profile-pic-placeholder">
                    {userProfile?.name?.[0] || user.email?.[0] || '?'}
                  </div>
                )}
                <span className="user-name">{userProfile?.name || user.email}</span>
              </div>
            </Link>
          ) : (
            <Link to="/account"><button className="btn">Акаунт</button></Link>
          )}
        </div>
      </div>
    </header>
  );
}

function scrollToDiv() {
  const el = document.getElementById("main_info");
  el?.scrollIntoView({ behavior: "smooth" });
}
