import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import Logo from "../logo";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { FormOutlined, HistoryOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function getItem(label, key, icon, url = "/management") {
  return {
    key,
    icon,
    label,
    url,
  };
}

function MngSider() {
  const userRoleId = useSelector((store) => store.user.user?.UserRoleId);
  let counter = 1; // Biến đếm bắt đầu từ 1

  // Danh sách các items cơ bản, sử dụng biến đếm counter
  const items = [getItem("Lot management", counter++, <HistoryOutlined />)];

  // Chỉ thêm mục "Create a lot" nếu statusId === 2, và tăng counter
  if (userRoleId === 2) {
    items.push(
      getItem(
        "Create a lot",
        counter++, // Tăng counter
        <FormOutlined />,
        "/management/create-lot-request"
      )
    );
  }
  // const items = [
  //   getItem("Lot management", "1", <HistoryOutlined />),
  //   getItem(
  //     "Create a lot",
  //     "2",
  //     <FormOutlined />,
  //     "/management/create-lot-request"
  //   ),
  //   // getItem("Option 1", "1", <PieChartOutlined />),
  //   // getItem("Option 2", "2", <DesktopOutlined />),
  //   // getItem("User", "sub1", <UserOutlined />, [
  //   //   getItem("Tom", "3"),
  //   //   getItem("Bill", "4"),
  //   //   getItem("Alex", "5"),
  //   // ]),
  //   // getItem("Team", "sub2", <TeamOutlined />, [
  //   //   getItem("Team 1", "6"),
  //   //   getItem("Team 2", "8"),
  //   // ]),
  //   // getItem("Files", "9", <FileOutlined />),
  // ];
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleMenuClick = (keyItem) => {
    const item = items.find((item) => item.key == keyItem.key);
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
