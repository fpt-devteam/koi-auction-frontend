import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import Logo from "../logo";
import "./index.scss";

function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleNavigation = (path) => {
    navigate(path);  // This function will navigate to the specified path
  };

  return (
    <div className="header">
      <div className="header__left">
        <Logo
          width={55}
          height={80}
          className="header__logo"
          onClick={() => handleNavigation("/")}
        />
        <ul className="header__navigation">
          <li onClick={() => handleNavigation("/")}>Home</li>
          <li onClick={() => handleNavigation("/auction-list")}>Auction</li>
          <li onClick={() => handleNavigation("/about")}>About</li>
        </ul>
      </div>
      <div className="header__right">
        {/* Monochrome styled Login and Register buttons */}
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
      </div>
    </div>
  );
}

export default Header;
