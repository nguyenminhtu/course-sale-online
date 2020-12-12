import { Form, Input, Button, Result, Spin, Alert } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";

import getParamFromUrl from "utils/getParamFromUrl";
import PageHeaderComponent from "components/PageHeader";
import useRequest from "hooks/useRequest";
import Wrapper from "./ResetPassword.styles";

const ResetPassword = () => {
  const { get, loading, post } = useRequest({});
  const [isValid, setIsValid] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(null);

  const [form] = Form.useForm();

  const forgotPasswordToken = useMemo(() => getParamFromUrl("token"), []);

  useEffect(() => {
    const validateToken = async () => {
      const response = await get(
        `/reset-password?forgotPasswordToken=${forgotPasswordToken}`
      );

      setIsValid(!!response.user);
    };

    validateToken();
  }, [forgotPasswordToken, get]);

  const onFinish = useCallback(
    async (values) => {
      const clonedValues = { ...values };
      delete clonedValues.confirm;

      const response = await post("/update-password", {
        ...clonedValues,
        forgotPasswordToken,
      });

      if (!response) {
        return;
      }

      if (response.code) {
        form.setFieldsValue({ errorMessage: response.message });
        return;
      }

      setResetSuccess(
        "Reset password successfully. Now you can sign in with new password"
      );
    },
    [forgotPasswordToken, form, post]
  );

  return (
    <Spin spinning={loading}>
      <Wrapper>
        <div>
          {useMemo(
            () => (
              <>
                {!!!resetSuccess && (
                  <PageHeaderComponent
                    className="sign-in-title"
                    title="RESET PASSWORD"
                    onBack={null}
                  />
                )}
              </>
            ),
            [resetSuccess]
          )}

          {!loading && !isValid && (
            <Result
              status="error"
              title="Can not reset password"
              subTitle="Please check your email again."
              extra={[
                <Button type="primary" key="sign-in">
                  <Link to="/sign_in">Go to sign in </Link>
                </Button>,
              ]}
            />
          )}

          {!loading && !!isValid && (
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

              {!!!resetSuccess && (
                <>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
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
                        validator(_, value) {
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

                  <Form.Item className="button-area">
                    <Link to="/sign_in">
                      <Button type="link" htmlType="button">
                        Go to sign in
                      </Button>
                    </Link>

                    <Button type="primary" htmlType="submit">
                      Reset my password
                    </Button>
                  </Form.Item>
                </>
              )}

              {!!resetSuccess && (
                <Result
                  status="success"
                  title="Success"
                  subTitle={resetSuccess}
                  extra={[
                    <Button type="primary" key="sign-in">
                      <Link to="/sign_in">Go to sign in </Link>
                    </Button>,
                  ]}
                />
              )}
            </Form>
          )}
        </div>
      </Wrapper>
    </Spin>
  );
};

export default ResetPassword;
