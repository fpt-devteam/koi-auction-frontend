import { Card, Carousel, Image, Row, Col, Button } from "antd";
import { ReadOutlined, LikeOutlined } from "@ant-design/icons";
import "./index.css";
const imageList = [
  { image: "src/assets/login/koibanner.jpg", title: "FIND YOUR PERFECT KOI FROM TOP BREEDERS" },
  { image: "src/assets/login/koibanner2.jpg", title: "BID ON RARE AND BEAUTIFUL KOI VARIETIES" },
  { image: "src/assets/login/koibanner3.jpg", title: "DISCOVER THE ART OF KOI COLLECTING" },
  { image: "src/assets/login/koibanner4.jpg", title: "JOIN THE VIBRANT KOI AUCTION COMMUNITY" }
]
function HomePage() {
  return (
    <>
      <div style={{ width: "100vw" }}>
        <Image
          preview={false}
          src="src/assets/wallpaper/koi3.jpg"
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: "3.5",
            objectFit: "cover",
          }}
        />
      </div>
      <h1 className="homepage-title">Welcome to Koi Auction</h1>
      {/* first section */}
      <div className="container" style={{ padding: "0px" }}>
        <Card className="card-container">
          <Row>
            <Col lg={15}>
              <div>
                <h1 className="title">FIND YOUR PERFECT KOI FROM TOP BREEDERS</h1>
                <h2 style={{
                  color: '#3498db',
                  fontSize: '1.8rem',
                  marginBottom: '15px'
                }}>Welcome to the Koi Auction!</h2>
                <p className="custom-paragraph">Discover the beauty of rare and exquisite koi from top breeders around the world.</p>
                <ul className="aligned-list">
                  <li>Create an account to start bidding on your dream koi</li>
                  <li>Participate in exciting auctions with unique varieties</li>
                  <li>All bids are final - ensure you are ready to commit</li>
                  <li>Shipping costs are separate unless specified</li>
                </ul>
                <p className="custom-paragraph">Have questions? Contact us at <a className="custom-link" href="mailto:info@kodamakoifarm.com">info@kodamakoifarm.com</a> or check our <a className="custom-link" href="#">Shipping FAQ</a>.</p>
              </div>
              <div style={{
                padding: "0px", marginTop: "30px"
              }}>
                <a className="custom-link" href="http://localhost:5173/auction-list" style={{ fontSize: "28px", padding: "10px", fontWeight: "bold", color: "black", textDecoration: "underline" }}>
                  Get Started
                </a>
              </div>
            </Col>
            <Col lg={9} style={{ margin: "0px", padding: "0px" }}>
              <Carousel autoplay style={{ borderRadius: "20px", overflow: "hidden", height: "300px", backgroundColor: "black" }}>
                {imageList.map((item, index) => (
                  <div key={index}>
                    <Image preview={false} height={300} width="100%" src={item.image} alt={item.title} />
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Card>
      </div>

      {/* second section */}
      <div className="container" style={{ padding: "0px" }}>
        <Card style={{ width: "100%" }}>
          <Row>
            <div>
              <h1 className="title">REASONS TO JOIN US</h1>
              <div style={{ marginTop: "30px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <Card className="reason-card" style={{ backgroundColor: "white", color: "black", flex: "1 0 40%", marginBottom: "20px" }}>
                  <h3>Exclusive Access</h3>
                  <p className="custom-paragraph">Bid on rare koi varieties from top breeders worldwide</p>
                </Card>
                <Card className="reason-card" style={{ backgroundColor: "white", color: "black", flex: "1 0 40%", marginBottom: "20px" }}>
                  <h3>Expert Community</h3>
                  <p className="custom-paragraph">Connect with fellow enthusiasts and learn from experienced collectors</p>
                </Card>
                <Card className="reason-card" style={{ backgroundColor: "white", color: "black", flex: "1 0 40%", marginBottom: "20px" }}>
                  <h3>Secure Transactions</h3>
                  <p className="custom-paragraph">Enjoy safe bidding and payments with our trusted platform</p>
                </Card>
                <Card className="reason-card" style={{ backgroundColor: "white", color: "black", flex: "1 0 40%", marginBottom: "20px" }}>
                  <h3>Convenient Shipping</h3>
                  <p className="custom-paragraph">Benefit from our network of reliable koi transportation services</p>
                </Card>
              </div>
            </div>
          </Row>
        </Card>
      </div>

      {/* third section */}
      <div className="container" style={{ padding: "0px" }}>
        <Card className="card-container" style={{ width: "100%" }}>
          <Row>
            <Col lg={16}>
              <div>
                <h1 className="title">READ OUR POLICY AND TERMS</h1>
                <div style={{ marginTop: "30px", display: "flex", gap: "20px" }}>
                  <Button type="primary" size="large" style={{ backgroundColor: "white", color: "black", borderColor: "black", fontSize: "18px", padding: "10px 30px" }}>Policy</Button>
                  <Button type="primary" size="large" style={{ backgroundColor: "white", color: "black", borderColor: "black", fontSize: "18px", padding: "10px 30px" }}>Terms</Button>
                </div>
              </div>
            </Col>
            <Col lg={5} style={{ textAlign: "center", margin: "auto", padding: "0px" }}>
              <ReadOutlined style={{ fontSize: "100px", color: "#000" }} />
            </Col>
          </Row>
        </Card>
      </div>

      {/* fourth section */}
      <div className="container" style={{ padding: "0px" }}>
        <Card className="card-container" style={{ width: "100%" }}>
          <Row>
            <Col lg={16}>
              <div>
                <h1 className="title">JOIN OUR COMMUNITY</h1>
                <div style={{ marginTop: "30px", display: "flex", gap: "20px" }}>
                  <Button type="primary" size="large" style={{ backgroundColor: "white", color: "black", borderColor: "black", fontSize: "18px", padding: "10px 30px" }}>Forum</Button>
                  <Button type="primary" size="large" style={{ backgroundColor: "white", color: "black", borderColor: "black", fontSize: "18px", padding: "10px 30px" }}>Newsletter</Button>
                </div>
              </div>
            </Col>
            <Col lg={5} style={{ textAlign: "center", margin: "auto", padding: "0px" }}>
              <LikeOutlined style={{ fontSize: "100px", color: "#000" }} />
            </Col>
          </Row>
        </Card>
      </div>
    </>
  )
}

export default HomePage;
