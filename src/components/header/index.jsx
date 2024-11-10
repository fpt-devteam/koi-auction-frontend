import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Space } from "antd";
import {
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  WalletOutlined,
  HomeOutlined,
  ShoppingOutlined,
  InfoCircleOutlined,
  ShopOutlined 
} from "@ant-design/icons";
import Logo from "../logo";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import userApi from "../../config/userApi";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogoutClick = () => {
    userApi.post("/logout");
    dispatch(logout());
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

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
    {
      key: "3",
      icon: <WalletOutlined />,
      label: "Wallet",
      extra: "⌘B",
    },
  ];

  return (
    <div className="header">
      <div className="header__left">
        <div onClick={() => handleNavigation("/")}>
          {/* {" "} */}
          <Logo width={55} height={63} className="header__logo" />
        </div>
        <ul className="header__navigation">
          <li onClick={() => handleNavigation("/")}>
            <HomeOutlined className="nav-icon"/> Home
          </li>
          <li onClick={() => handleNavigation("/auction-list")}>
            <ShoppingOutlined className="nav-icon"/> Auctions
          </li>
          <li onClick={() => handleNavigation("/breeder")}>
            <ShopOutlined     className="nav-icon"/> Breeders
          </li>
          <li onClick={() => handleNavigation("/about")}>
            <InfoCircleOutlined className="nav-icon"/> About
          </li>
        </ul>
      </div>
      <div className="header__right">
        {user == null ? (
          <>
            <Button
              icon={<LoginOutlined />}
              onClick={handleLoginClick}
              className="monochrome-button"
            >
              Login
            </Button>
            <Button
              icon={<UserAddOutlined />}
              onClick={handleRegisterClick}
              className="monochrome-button"
              style={{ marginLeft: "10px" }}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <Dropdown
              menu={{
                items,
                onClick: ({ key }) => {
                  if (key === "2") {
                    handleNavigation("/profile");
                  } else if (key === "3") {
                    handleNavigation("/wallet");
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
                    onClick={handleProfileClick}
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
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
