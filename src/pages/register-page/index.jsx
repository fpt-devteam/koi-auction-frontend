import { Col, Row } from "antd";
import React from "react";
import "./index.scss";
import Carousel from "../../components/carousel";
import RegisterForm from "../../components/register-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {
  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();
  if (user != null) {
    navigate("/");
  }
  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default Register;
