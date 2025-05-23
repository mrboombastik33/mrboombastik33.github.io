import "../styles/styles.css";

export default function Footer() {
    return (
        <>
        <footer className="footer">
        <div className="footer-content">
            <div className="footer-section">
                <h3>Контакти</h3>
                <p>Адреса: вул. Політехнічна, 10, Львів</p>
                <p>Email: info@photography-school.com</p>
                <p>Телефон: +380 99 483 25 77</p>
            </div>
            <div className="footer-section">
                <h3>Соціальні мережі</h3>
                <p>
                    <a href="#"> Instagram</a> |
                    <a href="#"> Facebook</a> |
                    <a href="#"> YouTube</a>
                </p>
            </div>
        </div>
        <p className="footer-bottom">2025 Школа фотографії. Всі права захищені.</p>
    </footer>      
        </>
    )
}