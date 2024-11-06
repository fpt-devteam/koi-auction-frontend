// LoadingComponent.js
import { Spin } from 'antd';

const Loading = () => (
  <Spin size="large" tip="Loading...">
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    </div>
  </Spin>
);

export default Loading;
