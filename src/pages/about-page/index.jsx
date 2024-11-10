import React from 'react';
import { Card, Collapse, Typography } from 'antd';
import faqData from '../../data/faq.json';

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

const AboutPage = () => {
  return (
    <div
      style={{
        padding: '40px',
        backgroundColor: '#f7f9fc',
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: '100vh'
      }}
    >
      <Card
        bordered={false}
        style={{
          backgroundColor: '#fff',
          marginBottom: '40px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        <Title
          level={1}
          style={{
            textAlign: 'left',
            color: '#1a365d',
            marginBottom: '24px'
          }}
        >
          Welcome to Koi Auction
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
          Welcome to KoiAuction.com, the premier online auction platform dedicated exclusively to Koi fish enthusiasts. Our website offers a secure and user-friendly environment where Koi lovers and
          breeders can connect, bid, and purchase rare and beautiful Koi fish from trusted sources worldwide. At KoiAuction.com, we ensure a fair and transparent bidding process, allowing users to
          participate in auctions confidently, place bids, and manage their transactions smoothly. With comprehensive listings, real-time updates, and a reliable payment system, KoiAuction.com
          provides all the tools you need for a seamless auction experience. Whether you&apos;re a newcomer or an avid collector, join us and discover your next prized Koi!
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
          With a deep passion for the artistry and beauty of Koi, we have created an online marketplace that brings together the finest breeders and the most discerning buyers. Our auctions provide a
          unique opportunity for Koi enthusiasts to acquire top-quality fish directly from renowned breeders in Japan, all from the comfort of their own homes.
        </Paragraph>

        <Title
          level={2}
          style={{
            textAlign: 'left',
            color: '#1a365d',
            marginTop: '32px',
            marginBottom: '24px'
          }}
        >
          Our Story
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
          Welcome to Koi Auctions, your premier destination for buying and selling high-quality Koi fish. Established with a passion for these living jewels, we bring together Koi enthusiasts from
          around the world in a trusted marketplace.
        </Paragraph>

        <Title
          level={2}
          style={{
            textAlign: 'left',
            color: '#1a365d',
            marginTop: '32px',
            marginBottom: '24px'
          }}
        >
          Our Mission
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
          We strive to create a transparent and reliable platform where Koi collectors, breeders, and enthusiasts can connect and trade exceptional Koi specimens. Our commitment is to maintain the
          highest standards of authenticity and customer satisfaction.
        </Paragraph>
      </Card>

      <Title
        level={2}
        style={{
          color: '#1a365d',
          marginBottom: '24px',
          textAlign: 'left'
        }}
      >
        Frequently Asked Questions
      </Title>
      <Collapse
        style={{
          marginBottom: '40px',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
        expandIconPosition="end"
      >
        {faqData.faqs.map((faq) => (
          <Panel
            key={faq.id}
            header={
              <span style={{ fontSize: '16px', fontWeight: 500 }}>
                {faq.icon} {faq.title}
              </span>
            }
          >
            <Paragraph>{faq.content}</Paragraph>
          </Panel>
        ))}
      </Collapse>

      <Title
        level={2}
        style={{
          color: '#1a365d',
          marginBottom: '24px',
          textAlign: 'left'
        }}
      >
        Contact Us
      </Title>
      <Card
        bordered={false}
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        <Paragraph
          style={{
            fontSize: '16px',
            textAlign: 'left',
            marginBottom: '24px'
          }}
        >
          Have questions or need assistance? We&apos;re here to help! You can reach us through:
        </Paragraph>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            maxWidth: '500px',
            fontSize: '16px',
            lineHeight: '2'
          }}
        >
          <li style={{ marginBottom: '16px' }}>
            <strong>Email:</strong>{' '}
            <a
              href="mailto:support@auctionkoi.com"
              style={{
                color: '#4299e1',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => (e.target.style.color = '#2b6cb0')}
              onMouseOut={(e) => (e.target.style.color = '#4299e1')}
            >
              support@auctionkoi.com
            </a>
          </li>
          <li style={{ marginBottom: '16px' }}>
            <strong>Phone:</strong> (555) 123-4567
          </li>
          <li style={{ marginBottom: '16px' }}>
            <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
          </li>
        </ul>
        <Paragraph
          style={{
            fontSize: '14px',
            color: '#666',
            textAlign: 'left',
            marginTop: '24px'
          }}
        >
          For urgent matters or specific auction inquiries, please include your account username and auction ID (if applicable) in your message.
        </Paragraph>
      </Card>
    </div>
  );
};

export default AboutPage;
