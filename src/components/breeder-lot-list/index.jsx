import React from 'react';
import BreederLotCard from '../breeder-lot-card';

const BreederLotList = ({ breederLotList }) => {
  return (
    <div>
      {breederLotList.map((lot) => (
        <BreederLotCard key={lot.LotId} lot={lot} />
      ))}
    </div>
  );
};

export default BreederLotList;
