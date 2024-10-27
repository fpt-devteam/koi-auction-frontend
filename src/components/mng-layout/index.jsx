import Footer from "../footer";
import MngHeader from "../mng-header";

import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import MngSider from "../mng-sider";
const { Content } = Layout;

const MngLayout = () => {

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
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default MngLayout;
