// import { useNavigate } from "react-router-dom";
import "./index.scss";
import { UserOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
// import { useSelector } from "react-redux";

function MngHeader() {
  // const navigate = useNavigate();
  // const userSelector = useSelector((state) => state.user);

  // const handleAccountClick = () => {
  //     if (userSelector != null) navigate("/");
  //     else
  //         navigate("/login");
  // };

  return (
    <div className="header">
      <div className="header__left">
        {/* <img src="./assets/Fishred.svg"
                    alt="" className="header__logo"
                    width={150}
                    height={150}
                    onClick={() => navigate("/")} /> */}
        <ul className="header__navigation">
          <Search
            placeholder="input search text"
            allowClear
            // enterButton="Search"
            size="large"
            style={{ width: 800, padding: "30px 5px 30px" }}
          />
        </ul>
      </div>
      <div className="header__right">
        <div className="header__account">
          {/* <UserOutlined size={100} className="icon" onClick={handleAccountClick} /> */}
          <UserOutlined size={100} className="icon" />
        </div>
        {/* <div className="header__cart"></div> */}
      </div>
    </div>
  );
}
export default MngHeader;
