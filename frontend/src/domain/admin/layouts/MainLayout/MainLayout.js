import { useState, useContext } from "react";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  AlertOutlined,
  BookOutlined,
  FileOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  SelectOutlined,
  LogoutOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import AuthContext from "contexts/auth";
import Wrapper from "./MainLayout.styles";

const { Header, Content, Sider } = Layout;

const MainLayout = ({ children }) => {
  const { dispatch } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Wrapper>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
          <div className="logo">SALE COURSES</div>

          <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
            <Menu.Item key="category" icon={<BarsOutlined />}>
              <Link to="/admin/categories">Categories</Link>
            </Menu.Item>

            <Menu.Item key="request" icon={<AlertOutlined />}>
              <Link to="/admin/requests">Requests</Link>
            </Menu.Item>

            <Menu.Item key="course" icon={<BookOutlined />}>
              <Link to="/admin/courses">Courses</Link>
            </Menu.Item>

            <Menu.Item key="user" icon={<UserOutlined />}>
              <Link to="/admin/users">Users</Link>
            </Menu.Item>

            <Menu.Item key="video" icon={<VideoCameraOutlined />}>
              Videos
            </Menu.Item>

            <Menu.Item key="exam" icon={<FileOutlined />}>
              Exams
            </Menu.Item>

            <Menu.Item key="question" icon={<QuestionCircleOutlined />}>
              Questions
            </Menu.Item>

            <Menu.Item key="answer" icon={<CheckCircleOutlined />}>
              Answers
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background">
            <div className="user-info">
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="user-profile" icon={<SelectOutlined />}>
                      User profile
                    </Menu.Item>
                    <Menu.Item
                      key="logout"
                      icon={<LogoutOutlined />}
                      onClick={() => dispatch({ type: "logout" })}
                    >
                      Logout
                    </Menu.Item>
                  </Menu>
                }
              >
                <Avatar size="large" icon={<UserOutlined />} />
              </Dropdown>
            </div>
          </Header>

          {/* <Breadcrumb data={breadcrumb} /> */}

          <Content className="site-layout-background">{children}</Content>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default MainLayout;
