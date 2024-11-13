import { Col, Row } from "antd";
import React, { useState } from "react";
import Carousel from "../../components/carousel";
import RegisterForm from "../../components/register-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BreederRegisterForm from "../../components/breeder-register-form";

function BreederRegister() {
  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();
  
  if (user != null) {
    navigate("/");
  }
  return (
    <div>
      <BreederRegisterForm />
    </div>
  );
}

export default BreederRegister;
