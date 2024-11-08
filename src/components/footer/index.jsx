// src/Footer.js
import { Row, Col } from "antd";
import "./index.css";
import Logo from "../logo";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-content">
        <Row gutter={[32, 32]} justify="space-between" align="top">
          <Col xs={24} sm={12} md={8} lg={6} className="footer-section">
            <div className="footer-logo">
              <Logo width={48} height={48} />
              <h1>Koi Auction</h1>
            </div>
            <p>
              Bringing the beauty of Koi to your pond through our premium
              auctions.
            </p>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4} className="footer-section">
            <h3>Navigation</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/auction-list">Auctions</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4} className="footer-section">
            <h3>Policy</h3>
            <ul>
              <li>
                <a href="/policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/term">Terms and Conditions</a>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4} className="footer-section">
            <h3>Account</h3>
            <ul>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </ul>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={6}
            lg={4}
            className="footer-section contact-info"
          >
            <h3>Contact Info</h3>
            <ul>
              <li>
                <a href="tel:(123) 456-7890">
                  <span className="icon">📞</span>
                  (123) 456-7890
                </a>
              </li>
              <li>
                <a href="mailto:info@koiauction.com">
                  <span className="icon">✉️</span>
                  info@koiauction.com
                </a>
              </li>
              <li>
                <span className="icon">🏠</span>
                <span>100 Smart Street, LA, USA</span>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="footer-bottom">
          <p>© 2023 Koi Auction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
