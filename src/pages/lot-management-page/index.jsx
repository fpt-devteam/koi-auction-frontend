import StatusTab from "../../components/status-tab";
import LotList from "../../components/lot-list";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function LotManagementPage() {
  const navigate = useNavigate();
  const userRoleId = useSelector((state) => state.user.user?.UserRoleId);
  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0 }}>Lot Management</h1>
        {userRoleId === 2 && (
          <Button size="large" type="primary" onClick={() => navigate("/management/create-lot-request")}>Create Lot</Button>
        )}
      </div>
      <StatusTab LotList={LotList} />
    </div>
  );
}

export default LotManagementPage;
