import { Button, Card, Image, Spin, message, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../config/userApi";

const { Title } = Typography;

function BreederPage() {
  const navigate = useNavigate();
  const [breeders, setBreeders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBreederInfo = async () => {
    setIsLoading(true);
    try {
      const response = await userApi.get("/manage/breeder/profile");
      setBreeders(response.data.filter((breeder) => breeder.Verified === 1 && breeder.Active === true));
      //setBreeders(breeders.filter((breeder) => breeder.Active === true));
    } catch (error) {
      message.error("Failed to load breeder information");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBreederInfo();
  }, []);
  console.log(breeders)
  return (
    <div style={styles.pageContainer}>
      <Card
        title={
          <span>
            <Title level={1} style={styles.pageTitle}>
              Our Breeders
            </Title>
          </span>
        }
        style={styles.cardContainer}
      >
        {isLoading ? (
          <div style={styles.spinnerContainer}>
            <Spin tip="Loading breeders..." />
          </div>
        ) : (
          breeders
          .map((breeder) => (
            <Card.Grid
              style={styles.gridStyle}
              key={breeder.BreederId}
              onClick={() => navigate(`/breeder-detail/${breeder.BreederId}`)}
              hoverable
            >
              <Image
                src={breeder.Certificate}
                preview={false}
                alt="Breeder Certificate"
                style={styles.imageStyle}
              />
              <div style={farmNameStyle}>{breeder.FarmName}</div>
            </Card.Grid>
          ))
        )}
      </Card>
    </div>
  );
}
const farmNameStyle = {
  padding: "12px",
  fontSize: "16px",
  fontWeight: "500",
  color: "#1a1a1a",
  borderTop: "1px solid #f0f0f0",
  background: "white",
};
const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    backgroundColor: "#f8f9fa",
  },
  pageTitle: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#333",
  },
  cardContainer: {
    width: "100%",
    maxWidth: "1200px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    padding: "30px",
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },
  gridStyle: {
    width: "25%",
    textAlign: "center",
    borderRadius: "8px",
    border: "1px solid #f0f0f0",
    cursor: "pointer",
    padding: "10px",
    transition: "transform 0.2s, box-shadow 0.2s",
    backgroundColor: "#ffffff",
  },
  imageStyle: {
    width: "100%",
    height: "auto",
    borderRadius: "4px",
  },
};

// Add hover effect in CSS for better control
const css = `
  .ant-card-grid:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;
document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

export default BreederPage;
