import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import Logo from "../logo";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { FormOutlined, HistoryOutlined } from "@ant-design/icons";
function getItem(label, key, icon, url = "/management") {
  return {
    key,
    icon,
    label,
    url,
  };
}

function MngSider() {
  const items = [
    getItem("Lot management", "1", <HistoryOutlined />),
    getItem(
      "Create a lot",
      "2",
      <FormOutlined />,
      "/management/create-lot-request"
    ),
    getItem(
      "Create an auction",
      "3",
      <FormOutlined />,
      "/management/create-auction-request"
    ),
    // getItem("Option 1", "1", <PieChartOutlined />),
    // getItem("Option 2", "2", <DesktopOutlined />),
    // getItem("User", "sub1", <UserOutlined />, [
    //   getItem("Tom", "3"),
    //   getItem("Bill", "4"),
    //   getItem("Alex", "5"),
    // ]),
    // getItem("Team", "sub2", <TeamOutlined />, [
    //   getItem("Team 1", "6"),
    //   getItem("Team 2", "8"),
    // ]),
    // getItem("Files", "9", <FileOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleMenuClick = (keyItem) => {
    const item = items.find((item) => item.key === keyItem.key);
    navigate(item.url);
  };
  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Logo
        width={100}
        height={100}
        className="header__logo"
        onClick={() => navigate("/")}
      />
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
}

export default MngSider;
