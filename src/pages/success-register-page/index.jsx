import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const SuccessRegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        status="success"
        title="Thank you for registering to become our Breeders!"
        subTitle={<span>Please wait for our admin to verify your farm for 1 to 7 days. <br /> We will send you an email notification once your farm is verified.</span>}
        extra={
          <div style={{display: "flex", justifyContent: "center"}}>
            <Button type="primary" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default SuccessRegisterPage;