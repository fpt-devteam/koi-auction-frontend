// src/Footer.js
import { Row, Col } from "antd";
import "./index.css";
import Logo from "../logo";

const Footer = () => {
  return (
    <div className="footer">
      <Row justify="space-between" align="top" className="footer-content">
        <Col xs={24} sm={12} md={6} className="footer-section">
          <div className="footer-logo">
            <Logo width={100} height={100} />
            <h1>Koi Auction</h1>
          </div>
          <p>Location: 100 Smart Street, LA, USA</p>
        </Col>
        <Col xs={24} sm={12} md={6} className="footer-section">
          <h3>COMPANY</h3>
          <ul>
            <li>About Us</li>
            <li>Legal Information</li>
            <li>Contact Us</li>
          </ul>
        </Col>
        <Col xs={24} sm={12} md={6} className="footer-section">
          <h3>HELP CENTER</h3>
          <ul>
            <li>Why Us?</li>
            <li>FAQs</li>
            <li>Guides</li>
          </ul>
        </Col>
        <Col xs={24} sm={12} md={6} className="footer-section">
          <h3>CONTACT INFO</h3>
          <ul>
            <li>Phone: 1234567890</li>
            <li>Email: company@email.com</li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
