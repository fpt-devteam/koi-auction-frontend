import StatusTab from "../../components/status-tab";
import LotList from "../../components/lot-list";
import { useSelector } from "react-redux";

function LotManagementPage() {
  //get user from redux
  const user1 = useSelector((store) => store.user);
  console.log("user from redux", user1);
  return (
    <div>
      <h1>Lot Management</h1>
      <StatusTab LotList={LotList} />
    </div>
  );
}

export default LotManagementPage;
