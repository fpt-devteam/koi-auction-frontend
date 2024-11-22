import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import Logo from "../logo";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  FormOutlined,
  HistoryOutlined,
  UserOutlined,
  DashboardOutlined,
  DashboardFilled,
  DashboardTwoTone,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

function getItem(label, key, icon, children = null, url = "/management") {
  return {
    key,
    icon,
    label,
    children,
    url,
  };
}

function MngSider() {
  const userRoleId = useSelector((store) => store.user.user?.UserRoleId);
  let counter = 1; // Biến đếm bắt đầu từ 1

  const items = [getItem("Lot management", counter++, <HistoryOutlined />)];
  if (userRoleId == 2) {
    items.push(
      getItem(
        "Dashboard ",
        counter++,
        <DashboardTwoTone />,
        null,
        "/management/breeder-dashboard"
      )
    );
  }
  if (userRoleId > 2) {
    items.push(
      getItem(
        "Auction Management ",
        counter++, // Tăng counter
        <FormOutlined />,
        null,
        "/management/auction"
      )
    );
    items.push(
      getItem(
        "Withdraw Management ",
        counter++, // Tăng counter
        <MoneyCollectOutlined />,
        null,
        "/management/withdraw"
      )
    );
  }
  if (userRoleId == 4) {
    const accountDropdownItems = [
      {
        label: "User Management",
        key: "account-user-management",
        onClick: () => navigate("/management/user-list"),
      },
      {
        label: "Breeder Management",
        key: "account-breeder-management",
        onClick: () => navigate("/management/breeder-list"),
      },
      {
        label: "Staff Management",
        key: "account-staff-management",
        onClick: () => navigate("/management/staff-list"),
      },
    ];
    items.push(
      {
        key: "account-management",
        icon: <UserOutlined />,
        label: "Account Management",
        children: accountDropdownItems,
      },
      {
        label: "Dashboard",
        icon: <DashboardOutlined />,
        key: "dashboard",
        onClick: () => navigate("/management/admin-dashboard"),
      }
    );
  }
  if (userRoleId == 3) {
    const accountDropdownItems = [
      {
        label: "Breeder Management",
        key: "account-breeder-management",
        onClick: () => navigate("/management/breeder-list"),
      },
    ];
    items.push({
      key: "account-management",
      icon: <UserOutlined />,
      label: "Account Management",
      children: accountDropdownItems,
    });
  }
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleMenuClick = (keyItem) => {
    const item = items.find((item) => String(item.key) == keyItem.key);
    if (item?.url) {
      navigate(item.url);
    }
  };

  return (
    <Sider
      width={260}
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Logo
        width={60}
        height={95}
        className="header__logo"
        onClick={() => navigate("/")}
      />
      <Menu
        defaultSelectedKeys={["1"]}
        // defaultOpenKeys={['User Management ']}
        mode="inline"
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
}

export default MngSider;
