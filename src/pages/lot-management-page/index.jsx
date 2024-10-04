import StatusTab from "../../components/status-tab";
import LotList from "../../components/lot-list";

function LotManagementPage() {
  return (
    <div>
      <h1>Lot Management</h1>
      <StatusTab LotList={LotList} />
    </div>
  );
}

export default LotManagementPage;
