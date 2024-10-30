// src/Footer.js
import { Row, Col } from "antd";
import "./index.css";
import Logo from "../logo";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Row gutter={[32, 32]} justify="space-between" align="top">
          <Col xs={24} sm={12} md={8} lg={6} className="footer-section">
            <div className="footer-logo">
              <Logo width={80} height={80} />
              <h1>Koi Auction</h1>
            </div>
            <p>Bringing the beauty of Koi to your pond through our premium auctions.</p>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} className="footer-section">
            <h3>Company</h3>
            <ul>
              <li>About Us</li>
              <li>Legal Information</li>
              <li>Contact Us</li>
              <li>Careers</li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} className="footer-section">
            <h3>Help Center</h3>
            <ul>
              <li>Why Choose Us</li>
              <li>FAQs</li>
              <li>Buyer's Guide</li>
              <li>Seller's Guide</li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} className="footer-section">
            <h3>Contact Info</h3>
            <ul>
              <li>📞 (123) 456-7890</li>
              <li>✉️ info@koiauction.com</li>
              <li>🏠 100 Smart Street, LA, USA</li>
            </ul>
          </Col>
        </Row>
        <div className="footer-bottom">
          <p>&copy; 2023 Koi Auction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
