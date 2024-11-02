import React from "react";
import { Card, Collapse, Typography } from "antd";

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
        <Title level={2} style={{ 
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
      </Card>

      <Title level={3} style={{ 
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
        <Panel
          header={
            <span style={{ fontSize: "16px", fontWeight: 500 }}>
              🇯🇵 How do Breeder/Japan auctions work?
            </span>
          }
          key="1"
        >
          <Paragraph>
            Explanation for how Breeder/Japan auctions work.
          </Paragraph>
        </Panel>
        <Panel
          header={
            <span style={{ fontSize: "16px", fontWeight: 500 }}>
              🇺🇸 How do In-House/USA auctions work?
            </span>
          }
          key="2"
        >
          <Paragraph>
            Explanation for how In-House/USA auctions work.
          </Paragraph>
        </Panel>
        <Panel
          header={
            <span style={{ fontSize: "16px", fontWeight: 500 }}>
              📦 How does shipping work and how much does it cost?
            </span>
          }
          key="3"
        >
          <Paragraph>
            Explanation for how shipping works and its costs.
          </Paragraph>
        </Panel>
        <Panel
          header={
            <span style={{ fontSize: "16px", fontWeight: 500 }}>
              💔 What happens if my Koi passes away in transit?
            </span>
          }
          key="4"
        >
          <Paragraph>
            Details on policies regarding Koi passing away during transit.
          </Paragraph>
        </Panel>
        <Panel
          header={
            <span style={{ fontSize: "16px", fontWeight: 500 }}>
              💸 When are payments due after an auction?
            </span>
          }
          key="5"
        >
          <Paragraph>
            Information on payment deadlines after an auction.
          </Paragraph>
        </Panel>
        <Panel
          header={
            <span style={{ fontSize: "16px", fontWeight: 500 }}>
              ⏳ How long can I expect to wait before my Koi is shipped?
            </span>
          }
          key="6"
        >
          <Paragraph>
            Expected waiting time before shipment of Koi.
          </Paragraph>
        </Panel>
        <Panel
          header={
            <span style={{ fontSize: "16px", fontWeight: 500 }}>
              🏠 Do you offer boarding if I cannot receive my Koi right away?
            </span>
          }
          key="7"
        >
          <Paragraph>
            Yes, boarding is available for an additional fee. If you would like
            to board your fish for the winter, we will hold them in our mud pond
            for $50/month per fish. For indoor boarding, we offer $75/month per
            Koi.
          </Paragraph>
        </Panel>
        <Panel
          header={
            <span style={{ fontSize: "16px", fontWeight: 500 }}>
              🛡️ Is there bid sniping protection?
            </span>
          }
          key="8"
        >
          <Paragraph>
            Explanation on bid sniping protection policies.
          </Paragraph>
        </Panel>
        <Panel
          header={
            <span style={{ fontSize: "16px", fontWeight: 500 }}>
              🌍 I'm outside of the United States. Am I still eligible to bid?
            </span>
          }
          key="9"
        >
          <Paragraph>
            Information on international eligibility for bidding.
          </Paragraph>
        </Panel>
      </Collapse>

      <Title level={4} style={{ 
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
