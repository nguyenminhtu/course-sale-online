import { Form, Input, Button, Spin, Alert } from "antd";
import { Link } from "react-router-dom";
import { useCallback, useMemo } from "react";

import PageHeaderComponent from "components/PageHeader";
import useRequest from "hooks/useRequest";
import Wrapper from "./ForgotPassword.styles";

const ForgotPassword = () => {
  const { post, loading } = useRequest({});

  const [form] = Form.useForm();

  const onFinish = useCallback(
    async (values) => {
      form.setFieldsValue({ errorMessage: null });
      form.setFieldsValue({ successMessage: null });

      const response = await post("/forgot-password", {
        email: values.email,
      });

      if (response.code) {
        form.setFieldsValue({ errorMessage: response.message });
        return;
      }

      form.setFieldsValue({ successMessage: response.message, email: "" });
    },
    [form, post]
  );

  return (
    <Spin spinning={loading}>
      <Wrapper>
        <div>
          {useMemo(
            () => (
              <PageHeaderComponent
                className="sign-in-title"
                title="FORGOT PASSWORD"
                onBack={null}
              />
            ),
            []
          )}
          <Form
            form={form}
            name="basic"
            layout="vertical"
            initialValues={{ errorMessage: null }}
            onFinish={onFinish}
            onChange={() => {
              form.setFieldsValue({ errorMessage: null });
              form.setFieldsValue({ successMessage: null });
            }}
          >
            {useMemo(
              () => (
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.errorMessage !== curValues.errorMessage
                  }
                >
                  {({ getFieldValue }) => {
                    return !!getFieldValue("errorMessage") ? (
                      <Alert
                        message={getFieldValue("errorMessage")}
                        type="error"
                        showIcon
                      />
                    ) : null;
                  }}
                </Form.Item>
              ),
              []
            )}

            {useMemo(
              () => (
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.successMessage !== curValues.successMessage
                  }
                >
                  {({ getFieldValue }) => {
                    return !!getFieldValue("successMessage") ? (
                      <Alert
                        message={getFieldValue("successMessage")}
                        type="success"
                        showIcon
                      />
                    ) : null;
                  }}
                </Form.Item>
              ),
              []
            )}

            {useMemo(
              () => (
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                      type: "email",
                    },
                  ]}
                >
                  <Input autoFocus />
                </Form.Item>
              ),
              []
            )}

            {useMemo(
              () => (
                <Form.Item className="button-area">
                  <Link to="/sign_in">
                    <Button type="link" htmlType="button">
                      Sign In
                    </Button>
                  </Link>

                  <Button type="primary" htmlType="submit">
                    Retrieve password
                  </Button>
                </Form.Item>
              ),
              []
            )}
          </Form>
        </div>
      </Wrapper>
    </Spin>
  );
};

export default ForgotPassword;
