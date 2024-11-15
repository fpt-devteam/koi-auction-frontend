/* eslint-disable no-unused-vars */
// src/components LotList.js
// @ts-ignore

import { Row, Col, Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import './index.scss';
import LotCard from '../lot-card';
import lotApi from '../../config/lotApi';
import React from 'react';
import useFetchLots from '../../hooks/useFetchLots';
import { useSelector } from 'react-redux';
import SoldLotCard from '../sold-lot-card';
import soldLotApi from '../../config/soldLotApi';

const LotList = ({ breederId = null, tabData }) => {
  const user = useSelector((store) => store.user.user);
  const [lotList, setLotList] = useState([]);
  const { lots, loading, refetch } = useFetchLots(tabData?.lotStatusId, 'UpdatedAt', false, breederId);
  const [isLoading, setIsLoading] = useState(loading);
  console.log("asdfasdf")
  useEffect(() => {
    if (tabData.lotStatusId > 5) {
      async function fetchLotData() {
        try {
          await Promise.all([
            soldLotApi.get("", {
              params: {
                BreederId: breederId
              }
            })
          ]).then(([soldLotResponse]) => {
            const soldLotByTabList = [];
            soldLotResponse.data?.forEach((lot) => {
              if (lot.lotStatus.lotStatusId == tabData.lotStatusId) {
                soldLotByTabList.push(lot);
              }
            })
            setLotList(soldLotByTabList);
            setIsLoading(false);
            console.log("soldLotResponse", "tab", soldLotResponse)
          })
        } catch (error) {
          message.error(error.message);
        }
      };
      fetchLotData();
    } else {
      setLotList(lots);
    }
  }, [lots]);

  return loading && isLoading ? (
    <Spin />
  ) : (
    <div
      className="lot-list"
      style={{
        marginBottom: '20px',
      }}
    >
      {lotList?.length > 0 && (
        <Row gutter={[16, 16]}>
          {lotList.map((lot, index) => (
            <Col key={lot.lotId || index} xs={24} sm={24} md={24} lg={24}>
              {tabData?.lotStatusId > 5 ? (
                <>
                  <h1>ehehehe</h1>
                  <SoldLotCard soldLot={lot} tabData={tabData} user={user} />
                </>
              ) : (
                <LotCard
                  lotStatusId={tabData?.lotStatusId}
                  lot={lot}
                  refetch={refetch}
                  tabData={tabData}
                  userRoleId={user?.userRoleId}
                />
              )}
            </Col>
          ))}
        </Row>
      )}

    </div>
  );
};

export default LotList;
