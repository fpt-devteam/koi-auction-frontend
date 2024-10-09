import { useEffect, useState } from "react";
import axios from "axios";
import { List, Tabs } from "antd";
import AuctionCard from "../../components/auction-card";
import "./index.css"; 

const { TabPane } = Tabs;

const AuctionList = () => {
  const [auctions, setAuctions] = useState({
    upcoming: [],
    ongoing: [],
    past: [],
  });
  
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ current: page, pageSize });
  };

  useEffect(() => {
    // Fetch the auction data from the API
    const fetchAuctions = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/auctions");
        console.log(response.data);
        const now = new Date();

        // Classify the auctions into upcoming, ongoing, and past categories
        const upcoming = response.data.filter(
          (auction) => new Date(auction.startTime) > now
        );
        const ongoing = response.data.filter(
          (auction) =>
            new Date(auction.startTime) <= now &&
            new Date(auction.endTime) >= now
        );
        const past = response.data.filter(
          (auction) => new Date(auction.endTime) < now
        );

        setAuctions({ upcoming, ongoing, past });
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className="auction-list-container">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Ongoing Auctions" key="1">
          <List
            itemLayout="vertical"
            dataSource={auctions.ongoing}
            pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: auctions.ongoing.length,
                onChange: handlePaginationChange,
              }}
            renderItem={(auction) => (
              <List.Item>
                <AuctionCard auction={auction} status="Ongoing" />
              </List.Item>
            )}
            locale={{ emptyText: "No ongoing auctions" }}
          />
        </TabPane>

        <TabPane tab="Upcoming Auctions" key="2">
          <List
            itemLayout="vertical"
            dataSource={auctions.upcoming}
            pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: auctions.upcoming.length,
                onChange: handlePaginationChange,
              }}
            renderItem={(auction) => (
              <List.Item>
                <AuctionCard auction={auction} status="Upcoming" />
              </List.Item>
            )}
            locale={{ emptyText: "No upcoming auctions" }}
          />
        </TabPane>

        <TabPane tab="Past Auctions" key="3">
          <List
            itemLayout="vertical"
            dataSource={auctions.past}
            pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: auctions.past.length,
                onChange: handlePaginationChange,
              }}
            renderItem={(auction) => (
              <List.Item>
                <AuctionCard auction={auction} status="Ended" />
              </List.Item>
            )}
            locale={{ emptyText: "No past auctions" }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AuctionList;
