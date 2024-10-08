import Footer from "../footer";
import MngHeader from "../mng-header";

import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import MngSider from "../mng-sider";
const { Content } = Layout;

const MngLayout = () => {
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <MngSider />
      <Layout>
        <MngHeader />
        <Content
          style={{
            margin: "10px 16px",
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default MngLayout;
