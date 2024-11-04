import React from "react";
import { Card, Collapse, Typography } from "antd";
import faqData from '../../data/faq.json';

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

const AboutPage = () => {
  return (
    <div style={{ 
      padding: "40px",
      backgroundColor: "#f7f9fc",
      maxWidth: "1200px",
      margin: "0 auto",
      minHeight: "100vh"
    }}>
      <Card
        bordered={false}
        style={{
          backgroundColor: "#fff",
          marginBottom: "40px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}
      >
        <Title level={1} style={{ 
          textAlign: "center",
          color: "#1a365d",
          marginBottom: "24px"
        }}>
          Welcome to AuctionKoi.com!
        </Title>
        <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
          AuctionKoi.com is proud to be your premier destination for Japanese
          Koi auctions in the United States. Our platform is dedicated to
          connecting Koi enthusiasts and collectors with reputable breeders from
          Japan, offering an exceptional selection of exquisite Japanese Koi.
        </Paragraph>
        <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
          With a deep passion for the artistry and beauty of Koi, we have
          created an online marketplace that brings together the finest breeders
          and the most discerning buyers. Our auctions provide a unique
          opportunity for Koi enthusiasts to acquire top-quality fish directly
          from renowned breeders in Japan, all from the comfort of their own
          homes.
        </Paragraph>

        <Title level={2} style={{ 
          textAlign: "center",
          color: "#1a365d",
          marginTop: "32px",
          marginBottom: "24px"
        }}>
          Our Story
        </Title>
        <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
          Welcome to Koi Auctions, your premier destination for buying and selling
          high-quality Koi fish. Established with a passion for these living jewels,
          we bring together Koi enthusiasts from around the world in a trusted
          marketplace.
        </Paragraph>

        <Title level={2} style={{ 
          textAlign: "center",
          color: "#1a365d",
          marginTop: "32px",
          marginBottom: "24px"
        }}>
          Our Mission
        </Title>
        <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
          We strive to create a transparent and reliable platform where Koi collectors,
          breeders, and enthusiasts can connect and trade exceptional Koi specimens.
          Our commitment is to maintain the highest standards of authenticity and
          customer satisfaction.
        </Paragraph>
      </Card>

      <Title level={2} style={{ 
        color: "#1a365d",
        marginBottom: "24px",
        textAlign: "center" 
      }}>
        Frequently Asked Questions
      </Title>
      <Collapse 
        style={{ 
          marginBottom: "40px",
          borderRadius: "8px",
          overflow: "hidden"
        }}
        expandIconPosition="end"
      >
        {faqData.faqs.map((faq) => (
          <Panel
          key = {faq.id}
          header = {
            <span style={{ fontSize: "16px", fontWeight: 500 }}>
              {faq.icon} {faq.title}
            </span>
          }
          >
            <Paragraph>
              {faq.content}
            </Paragraph>
          </Panel>
        ))}
      </Collapse>

      <Title level={2} style={{ 
        color: "#1a365d",
        marginBottom: "24px",
        textAlign: "center"
      }}>
        Contact Us
      </Title>
      <Card 
        bordered={false} 
        style={{ 
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}
      >
        <Paragraph style={{ 
          fontSize: "16px", 
          textAlign: "center",
          marginBottom: "24px"
        }}>
          Have questions or need assistance? We're here to help! You can reach us through:
        </Paragraph>
        <ul style={{ 
          listStyle: "none",
          padding: 0,
          margin: "0 auto",
          maxWidth: "500px",
          fontSize: "16px",
          lineHeight: "2"
        }}>
          <li style={{ marginBottom: "16px" }}>
            <strong>Email:</strong>{" "}
            <a 
              href="mailto:support@auctionkoi.com"
              style={{ 
                color: "#4299e1",
                textDecoration: "none",
                transition: "color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.color = "#2b6cb0"}
              onMouseOut={(e) => e.target.style.color = "#4299e1"}
            >
              support@auctionkoi.com
            </a>
          </li>
          <li style={{ marginBottom: "16px" }}>
            <strong>Phone:</strong> (555) 123-4567
          </li>
          <li style={{ marginBottom: "16px" }}>
            <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
          </li>
        </ul>
        <Paragraph style={{ 
          fontSize: "14px",
          color: "#666",
          textAlign: "center",
          marginTop: "24px"
        }}>
          For urgent matters or specific auction inquiries, please include your account username 
          and auction ID (if applicable) in your message.
        </Paragraph>
      </Card>
    </div>
  );
};

export default AboutPage;
