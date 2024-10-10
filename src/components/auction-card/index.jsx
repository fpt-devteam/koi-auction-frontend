import PropTypes from "prop-types"; // Import PropTypes
import { Card, Badge, Typography, Statistic } from "antd";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { Countdown } = Statistic;

const AuctionCard = ({ auction, status }) => {
  const navigate = useNavigate();

  // Format date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${date.toLocaleDateString()}`;
  };

  const renderAuctionStatus = (status) => {
    let color = "green";
    if (status === "Upcoming") color = "orange";
    if (status === "Ended") color = "red";
    return <Badge color={color} text={status} />;
  };

  // Render những card layouts khác nhau dựa vào auction status
  const renderCardContent = () => {
    if (status === "Upcoming") {
      return (
        <div className="auction-card-content">
          <Text>Start-time: {formatDate(auction.startTime)}</Text>
          <br />
          <div className="countdown-wrapper">
            <Text>Starts in:</Text>
            <Countdown value={new Date(auction.startTime)} format="HH:mm:ss" />
          </div>
          <br />
          {renderAuctionStatus("Upcoming")}
        </div>
      );
    } else if (status === "Ongoing") {
      return (
        <div className="auction-card-content">
          <Text>Start-time: {formatDate(auction.startTime)}</Text>
          <br />
          <Text>Ends in:</Text>
          <Countdown value={new Date(auction.endTime)} format="HH:mm:ss" />
          <br />
          {renderAuctionStatus("Ongoing")}
        </div>
      );
    } else {
      return (
        <div className="auction-card-content">
          <Text>Start-time: {formatDate(auction.startTime)}</Text>
          <br />
          <Text>End-time: {formatDate(auction.endTime)}</Text>
          <br />
          {renderAuctionStatus("Ended")}
        </div>
      );
    }
  };

  return (
    <Card
      title={`${auction.auctionName}`}
      bordered={false}
      className="auction-card"
      onClick={() =>
        navigate(`/auction-detail?auction-id=${auction.auctionId}`)
      }
      hoverable
    >
      {renderCardContent()}
    </Card>
  );
};

// Thêm PropTypes validation
AuctionCard.propTypes = {
  auction: PropTypes.shape({
    auctionId: PropTypes.number.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
  }).isRequired,
  status: PropTypes.oneOf(["Upcoming", "Ongoing", "Ended"]).isRequired,
};

export default AuctionCard;
