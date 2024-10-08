import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React from "react";
import "./index.scss"
import Carousel from "../../components/carousel";
import LoginForm from "../../components/login-form";
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
