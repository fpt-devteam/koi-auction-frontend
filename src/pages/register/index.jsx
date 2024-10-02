import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React from "react";
import "./index.scss"
import Carousel from "../../components/carousel";
import RegisterForm from "../../components/register-form";
function Register() {
  return (
    <div>
      <Row align={"middle"}>
        <Col span={12}>
        <RegisterForm />
        </Col>
        <Col span={12}>
          <Carousel />
        </Col>
      </Row>
    </div>
  );
}

export default Register;
