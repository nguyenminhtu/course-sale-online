import { Form, Input, Button, DatePicker, Spin, Alert, Radio } from "antd";
import { Link } from "react-router-dom";
import { useCallback, useMemo } from "react";

import PageHeaderComponent from "components/PageHeader";
import useRequest from "hooks/useRequest";
import Wrapper from "./SignUp.styles";

const SignUp = () => {
  const { post, loading } = useRequest({});

  const [form] = Form.useForm();

  const onFinish = useCallback(
    async (values) => {
      const clonedValues = { ...values };
      delete clonedValues.confirm;

      const responseCreateUser = await post("/users", {
        ...clonedValues,
        dob: clonedValues.dob ? clonedValues.dob.format("DD/MM/YYYY") : "",
      });

      if (responseCreateUser.code) {
        form.setFieldsValue({ errorMessage: responseCreateUser.message });
        return;
      }

      form.resetFields();
      form.setFieldsValue({
        successMessage:
          "Sign up successfully. An active email was sent to your email. Please check and active your account.",
      });
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
                title="SIGN UP"
                onBack={null}
              />
            ),
            []
          )}

          {useMemo(
            () => (
              <Form
                form={form}
                name="basic"
                layout="vertical"
                initialValues={{ errorMessage: null }}
                onFinish={onFinish}
                onChange={() => form.setFieldsValue({ errorMessage: null })}
              >
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

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Please input a valid email!",
                    },
                  ]}
                >
                  <Input autoFocus />
                </Form.Item>

                <Form.Item
                  label="User name"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirm"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "The two passwords that you entered do not match!"
                        );
                      },
                    }),
                  ]}
                  dependencies={["password"]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item label="Gender" name="gender">
                  <Radio.Group>
                    <Radio value={0}>Male</Radio>
                    <Radio value={1}>Female</Radio>
                    <Radio value={2}>Other</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label="Birthday" name="dob">
                  <DatePicker
                    placeholder=""
                    style={{ width: "100%" }}
                    format="DD/MM/YYYY"
                  />
                </Form.Item>

                <Form.Item label="Phone" name="phone">
                  <Input />
                </Form.Item>

                <Form.Item className="button-area">
                  <Link to="/sign_in">
                    <Button type="link" htmlType="button">
                      Go to sign in
                    </Button>
                  </Link>

                  <Button type="primary" htmlType="submit">
                    Sign me up
                  </Button>
                </Form.Item>
              </Form>
            ),
            [form, onFinish]
          )}
        </div>
      </Wrapper>
    </Spin>
  );
};

export default SignUp;
