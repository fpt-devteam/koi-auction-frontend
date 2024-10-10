
import "./index.scss"
import Carousel from "../../components/carousel";
import LoginForm from "../../components/login-form";
import { Row, Col } from 'antd';

function Login() {
  return (
    <div>
      <Row align={"middle"}>
        <Col span={12}>
        {/* <p>Welcome to KOIZEN</p> */}
          <LoginForm />
        </Col>
        <Col span={12}>
          <Carousel />
        </Col>
      </Row>
    </div>
  );
}

export default Login;
