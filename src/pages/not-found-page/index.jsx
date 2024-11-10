// UnauthorizedComponent.js
import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
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

export default NotFoundPage;
