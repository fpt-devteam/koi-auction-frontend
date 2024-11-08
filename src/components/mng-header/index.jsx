// import { useNavigate } from "react-router-dom";
import "./index.scss";
import { UserOutlined, LogoutOutlined, ProfileOutlined, WalletOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import Search from "antd/es/input/Search";
import userApi from "../../config/userApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../loading";

function MngHeader() {
  // const navigate = useNavigate();
  // const userSelector = useSelector((state) => state.user);

  // const handleAccountClick = () => {
  //     if (userSelector != null) navigate("/");
  //     else
  //         navigate("/login");
  // };
  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "My Account",
      disabled: true,
    },
    {
      key: "2",
      icon: <ProfileOutlined />,
      label: "Profile",
      extra: "⌘P",
    },
   
  ];

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    userApi.post("/logout");
    dispatch(logout());
    navigate("/");
  };
  const handleNavigation = (path) => {
    navigate(path);
  };

  if (user == null) {
    return <Loading />
  }
  if (user.UserRoleId == 2) {
    items.push( {
      key: "3",
      icon: <WalletOutlined />,
      label: "Wallet",
      extra: "⌘B",
    });
  }


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
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              if (key === "2") {
                handleNavigation("/management/profile");
              } else if (key === "3" && user.UserRoleId == 2) {
                handleNavigation("/management/wallet");
              }
            },
          }}
          dropdownRender={(menu) => (
            <div style={{ minWidth: "200px" }}>{menu}</div>
          )}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Button
                icon={<UserOutlined />}
                onClick={() => handleNavigation("/management/profile")}
                className="monochrome-button"
              >
                {user.FirstName}
              </Button>
            </Space>
          </a>
        </Dropdown>
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
