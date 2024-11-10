import { Row, Col, Typography, message, Spin, Modal } from 'antd';
import { useSelector } from 'react-redux';
import KoiMedia from '../../components/koi-media';
import KoiInfo from '../../components/koi-info';
import Countdown from '../../components/countdown';
import SuggestLogin from '../../components/suggest-login';
import { useParams } from 'react-router-dom';
import BidHistoryTable from '../../components/bid-history-table';
import BackButton from '../../components/back-button';
import { useEffect, useState } from 'react';
import lotApi from '../../config/lotApi';
import AuctionMethod from '../../components/auction-method';
const { Text } = Typography;
import * as signalR from '@microsoft/signalr';
import PriceDisplayComponent from '../../components/price-display';
import BidForm from '../../components/bid-form';
import CurrentBid from '../../components/current-bid';
import PriceBuy from '../../components/price-buy';
import WinnerPrice from '../../components/winner-price';
import { placeBid } from '../../helpers/signalRHelper';
import useSignalRConnection from '../../hooks/useSignalRConnection';

const AuctionLotDetailPage = () => {
  const { user } = useSelector((state) => state.user);
  const userId = user?.UserId || null;

  const { auctionLotId } = useParams();

  const [auctionLot, setAuctionLot] = useState();
  const [connection, setConnection] = useState(null);
  const [bidLogs, setBidLogs] = useState([]);
  const [winnerPrice, setWinnerPrice] = useState(null);
  const [predictEndTime, setPredictEndTime] = useState(null);
  const [winner, setWinner] = useState(null);
  const [priceDesc, setPriceDesc] = useState(null);

  const fetchAuctionLot = async () => {
    try {
      const response = await lotApi.get(`auction-lots/${auctionLotId}`);
      const fetchedAuctionLot = response.data;
      console.log('fetchedAuctionLot', fetchedAuctionLot);
      setAuctionLot(fetchedAuctionLot);
    } catch (error) {
      // message.error(error.message);
      console.log('error', error.response.data);
    }
  };
  useEffect(() => {
    fetchAuctionLot();
  }, [auctionLotId]);

  const fetchBigLog = async () => {
    try {
      const response = await lotApi.get(`bid-log?AuctionLotId=${auctionLotId}`);
      const fetchedBidLogs = response.data;
      setBidLogs(fetchedBidLogs);
    } catch (error) {
      // message.error(error.message);
      console.log('error', error);
    }
  };
  useEffect(() => {
    fetchBigLog();
  }, [auctionLotId]);

  const fetchWinner = async () => {
    try {
      const response = await lotApi.get(`bid-log/highest-bid/${auctionLotId}`);
      const fetchedData = response.data;
      console.log('fetchedWinner', fetchedData);
      setWinner(fetchedData);
    } catch (error) {
      // message.error(error.message);
      console.log('error', error.response.data);
    }
  };
  useEffect(() => {
    fetchWinner();
  }, [auctionLotId]);

  //winner price
  const fetchSoldLot = async () => {
    try {
      console.warn(`auctionLotId: ${auctionLotId}`);
      const response = await lotApi.get(`/sold-lots/${auctionLotId}`);
      console.log('response', response.data);
      console.log(`fetchedSoldLot.finalPrice: ${response.data.finalPrice}`);
      setWinnerPrice(response.data.finalPrice);
    } catch (error) {
      console.log('error', error.response.data);
    }
  };
  useEffect(() => {
    fetchSoldLot();
  }, [auctionLotId]);

  const handleBid = (bidAmount) => {
    placeBid(connection, userId, auctionLotId, bidAmount);
  };

  useSignalRConnection(auctionLotId, userId, setPredictEndTime, setWinner, setPriceDesc, setConnection, fetchAuctionLot, fetchBigLog, fetchSoldLot);

  if (!auctionLot) {
    return <Spin />;
  }
  const {
    duration,
    startTime,
    endTime,
    stepPercent,
    lotDto: {
      sku,
      startingPrice,
      auctionMethod: { auctionMethodId, auctionMethodName, description },
      koiFishDto: { variety, sex, sizeCm, yearOfBirth, koiMedia },
      breederDetailDto
    },
    auctionLotStatusDto: { auctionLotStatusId, auctionLotStatusName }
  } = auctionLot;
  const stepPrice = stepPercent != null ? (parseFloat(startingPrice) * parseFloat(stepPercent)) / 100 : stepPercent;
  const softCap = startingPrice / 2;
  // console.log("auctionLot", auctionLot);
  return (
    <div style={{ padding: '20px 120px' }}>
      {/* Row 1 - Auction Lot Detail */}
      <Row gutter={(0, 20)}>
        {/* Koi Media */}
        <Col span={11}>
          {/* Koi Media */}
          <KoiMedia media={auctionLot.lotDto.koiFishDto.koiMedia} />
        </Col>

        <Col span={13}>
          {/* Auction Lot Name */}{' '}
          <div
            style={{
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Text strong style={{ fontSize: '2rem' }}>
              {variety + ' #' + sku}
            </Text>
          </div>
          {/* Info */}
          <Row gutter={(0, 20)}>
            {/* Koi Info */}
            <Col span={8}>
              {/* Koi Info */}
              <KoiInfo koi={auctionLot.lotDto.koiFishDto} breederDetailDto={breederDetailDto} />
            </Col>

            {/* Starting Price || Step Price || Auction Method */}
            <Col span={16}>
              {/* Starting price*/}
              {<PriceDisplayComponent text="Starting price" value={startingPrice} size="small" />}
              {/* Soft cap */}
              {auctionMethodId == 4 && <PriceDisplayComponent text="Soft cap" value={softCap} size="small" />}
              {/* Step price */}
              {auctionMethodId > 2 && <PriceDisplayComponent text="Step price" value={stepPrice} size="small" />}
              {/* Auction Method */}
              <AuctionMethod auctionMethod={auctionLot.lotDto.auctionMethod} />
            </Col>
          </Row>
          {/* Current Bid */}
          <Row gutter={(0, 20)}>
            <Col span={24}>
              {/* Current Bid */}
              {auctionMethodId == 3 && auctionLotStatusId == 3 && <CurrentBid currentBid={winner != null ? winner.bidAmount : null} />}

              {/* Winner Price */}
              {auctionLotStatusId == 4 && <WinnerPrice winnerPrice={winnerPrice} />}
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Row 2 Time countdown and Bid Form */}
      <Row gutter={(0, 20)}>
        {/* Time countdown */}
        <Col span={11}>
          {/* Time countdown */}
          <Countdown startTime={startTime} endTime={endTime} predictEndTime={predictEndTime} statusName={auctionLotStatusName} />
        </Col>

        {/* Bid Form || Price Buy || Suggest Login || Winner Price */}
        <Col span={13}>
          {/* Bid Form */}
          {userId && (auctionMethodId == 3 || auctionMethodId == 2) && auctionLotStatusId == 3 && <BidForm currentBid={winner != null ? winner.bidAmount : null} onBidSubmit={handleBid} />}

          {/* Price Buy Method 1*/}
          {userId && auctionMethodId == 1 && auctionLotStatusId == 3 && <PriceBuy price={startingPrice} onBuySubmit={handleBid} />}

          {/* Price Buy Method 4*/}
          {userId && auctionMethodId == 4 && auctionLotStatusId == 3 && <PriceBuy price={priceDesc} onBuySubmit={handleBid} />}

          {/* Winner Price
          {auctionLotStatusId == 4 && <WinnerPrice winnerPrice={winnerPrice} />} */}

          {/* Suggest Login */}
          {!userId && <SuggestLogin />}
        </Col>
      </Row>

      {/* Row 3 Bid History */}
      <Row gutter={(0, 20)}>
        <Col span={24}>
          {/* Bid History Table */}
          {(auctionMethodId == 1 || auctionMethodId == 3 || auctionLotStatusId == 4) && <BidHistoryTable data={bidLogs} />}
          <BackButton />
        </Col>
      </Row>
    </div>
  );
};

export default AuctionLotDetailPage;
