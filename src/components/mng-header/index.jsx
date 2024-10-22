// import { useNavigate } from "react-router-dom";
import "./index.scss";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Search from "antd/es/input/Search";
import userApi from "../../config/userApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
 import { useSelector } from "react-redux";

function MngHeader() {
  // const navigate = useNavigate();
  // const userSelector = useSelector((state) => state.user);

  // const handleAccountClick = () => {
  //     if (userSelector != null) navigate("/");
  //     else
  //         navigate("/login");
  // };
  const {user} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    userApi.post("/logout");
    dispatch(logout());
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="header">
      <div className="header__left">
        {/* <img src="./assets/Fishred.svg"
                    alt="" className="header__logo"
                    width={150}
                    height={150}
                    onClick={() => navigate("/")} /> */}
        <ul className="header__navigation">
          {/* <Search
            placeholder="input search text"
            allowClear
            // enterButton="Search"
            size="large"
            style={{ width: 800, padding: "30px 5px 30px" }}
          /> */}
        </ul>
      </div>
      <div className="header__right">
            <Button
              icon={<UserOutlined />}
              onClick={handleProfileClick}
              className="monochrome-button"
            >
              {user.FirstName}
            </Button>
            <Button
              icon={<LogoutOutlined />}
              onClick={handleLogoutClick}
              className="monochrome-button"
              style={{ marginLeft: "10px" }}
            >
              Logout
            </Button>
      </div>
    </div>
  );
}
export default MngHeader;
