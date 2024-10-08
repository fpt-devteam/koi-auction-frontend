import Header from "../header";
import { Outlet } from "react-router-dom";
import Footer from "../footer";
function AppLayout() {
  return (
    <div>
      <Header />
      <div style={{ minHeight: "70vh" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
