import './index.scss';
import Carousel from '../../components/carousel';
import LoginForm from '../../components/login-form';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();
  if (user != null) {
    navigate('/');
  }
  return (
    <div>
      <Row align={'middle'}>
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
