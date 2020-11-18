import { Card, Col, Row } from "antd";

import UserLayout from "layouts/UserLayout";
import Wrapper from "./HomePage.styles";

const HomePage = () => {
  return (
    <UserLayout>
      <Wrapper>
        <Row gutter={16}>
          <Col span={8}>
            <Card hoverable title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </Wrapper>
    </UserLayout>
  );
};

export default HomePage;
