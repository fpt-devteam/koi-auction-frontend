// UnauthorizedComponent.js
import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <Button type="primary" onClick={() => navigate('/login')}>
              Go to Login
            </Button>
            <Button type="primary" onClick={() => navigate('/')}>
              Back to home
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default UnauthorizedPage;
