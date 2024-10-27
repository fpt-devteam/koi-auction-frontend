import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import {
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
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

  return (
    <div className="header">
      <div className="header__left">
        <Logo
          width={55}
          height={63}
          className="header__logo"
          onClick={() => handleNavigation("/")}
        />
        <ul className="header__navigation">
          <li onClick={() => handleNavigation("/")}>Home</li>
          <li onClick={() => handleNavigation("/auction-list")}>Auctions</li>
          <li onClick={() => handleNavigation("/about")}>About</li>
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
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
