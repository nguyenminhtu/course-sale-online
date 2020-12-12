import { Layout, Menu, Avatar, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import {
  SelectOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

import AuthContext from "contexts/auth";
import MenuItem from "./MenuItem";
import Wrapper from "./AdminLayout.styles";

const { Header, Content, Sider } = Layout;

const AdminLayout = ({ children }) => {
  const { dispatch, user } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Wrapper>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
          <div className="logo">
            <Link to="/admin">NKH</Link>
          </div>

          <MenuItem />
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background">
            <div className="user-info">
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="user-site" icon={<SelectOutlined />}>
                      <Link to="/">User site</Link>
                    </Menu.Item>
                    <Menu.Item key="user-profile" icon={<SelectOutlined />}>
                      <Link to="/user-profile">User profile</Link>
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
                {!!user && !!user.avatar ? (
                  <Avatar
                    size="large"
                    src={`${process.env.REACT_APP_API_URL}${user.avatar}`}
                  />
                ) : (
                  <Avatar size="large" icon={<UserOutlined />} />
                )}
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

export default AdminLayout;
