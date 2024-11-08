import BreederLotCard from "../breeder-lot-card";

const BreederLotList = ({ breederLotList }) => {
  return (
    <div>
      {breederLotList.map((lot) => (
        <BreederLotCard key={lot.lotId} lot={lot} />
      ))}
    </div>
  );
};

export default BreederLotList;
