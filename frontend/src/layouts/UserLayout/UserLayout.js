import { Layout, Menu, Avatar, Dropdown, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useContext, useMemo } from "react";
import {
  SelectOutlined,
  LogoutOutlined,
  UserOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import AuthContext from "contexts/auth";
import Wrapper from "./UserLayout.styles";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const UserLayout = ({ children }) => {
  const { dispatch, isAuth } = useContext(AuthContext);

  const userAuthArea = useMemo(
    () => (
      <>
        {isAuth ? (
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
        ) : (
          <>
            <Link to="/sign_in">
              <Button
                icon={<LoginOutlined />}
                type="ghost"
                className="signin-button"
              >
                Sign In
              </Button>
            </Link>

            <Link to="/sign_up">
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                className="signup-button"
              >
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </>
    ),
    [dispatch, isAuth]
  );

  return (
    <Wrapper>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo">NKH</div>

          <Search
            placeholder="Search course here..."
            onSearch={(value) => console.log(value)}
            enterButton
            allowClear
          />

          {userAuthArea}
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ minHeight: "calc(100vh - 134px)" }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Course Sale Online @2020 Created by NKH
        </Footer>
      </Layout>
    </Wrapper>
  );
};

export default UserLayout;
