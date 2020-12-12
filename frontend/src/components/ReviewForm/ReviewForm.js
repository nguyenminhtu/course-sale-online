import { Button, Comment, Avatar, Form, Input, Rate } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useContext } from "react";

import AuthContext from "contexts/auth";

import DefaultAvatar from "assets/images/default-avatar.png";

const { TextArea } = Input;

const ReviewForm = ({ onSave }) => {
  const { user } = useContext(AuthContext);

  const [form] = Form.useForm();

  return (
    <Comment
      style={{ marginTop: 24 }}
      avatar={
        <Avatar
          src={
            user.avatar
              ? `${process.env.REACT_APP_API_URL}${user.avatar}`
              : DefaultAvatar
          }
          alt={user.username}
        />
      }
      content={
        <Form
          layout="vertical"
          form={form}
          onFinish={(values) =>
            onSave(values, () => {
              form.resetFields();
            })
          }
        >
          <Form.Item
            name="content"
            tooltip={{
              title: "This is a required field",
              icon: <InfoCircleOutlined />,
            }}
            rules={[{ required: true, message: "This field is required" }]}
          >
            <TextArea autoSize={{ minRows: 4 }} />
          </Form.Item>

          <Form.Item name="rate">
            <Rate />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Add review
            </Button>
          </Form.Item>
        </Form>
      }
    />
  );
};

export default ReviewForm;
