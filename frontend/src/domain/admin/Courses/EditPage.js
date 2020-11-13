import {
  Form,
  Input,
  Button,
  Spin,
  Select,
  Row,
  Col,
  notification,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import PageHeader from "components/PageHeader";
import useRequest from "hooks/useRequest";
import Wrapper from "./NewPage.styles";

const { Option } = Select;
const { TextArea } = Input;

const EditPage = () => {
  const { categoryId } = useParams();
  const { get, patch, loading, response = {} } = useRequest({});
  const history = useHistory();

  const [categories, setCategories] = useState([]);

  const onFinish = useCallback(
    async (data) => {
      const patchResponse = await patch(`/courses/${categoryId}`, data);
      if (patchResponse._id) {
        notification.success({
          message: "Update course successfully",
          placement: "topRight",
        });
        history.push("/admin/courses");
      }
    },
    [categoryId, history, patch]
  );

  const [form] = Form.useForm();

  useEffect(() => {
    const getCourseInfo = async () => {
      const categoriesResponse = await get("/categories");
      setCategories(categoriesResponse.data);

      if (categoryId) {
        const getResponse = await get(`/courses/${categoryId}`);
        form.setFieldsValue({
          name: getResponse.name,
          category: getResponse.category,
          description: getResponse.description,
          price: getResponse.price,
        });
      }
    };

    getCourseInfo();
  }, [categoryId, form, get]);

  return (
    <Spin spinning={loading}>
      <Wrapper>
        {useMemo(
          () => (
            <PageHeader title="Edit course" />
          ),
          []
        )}

        {useMemo(
          () => (
            <Row>
              <Col span={10} offset={7}>
                <Form layout="vertical" form={form} onFinish={onFinish}>
                  {response.code && <p>Course not found</p>}

                  {response._id && (
                    <>
                      <Form.Item
                        name="category"
                        label="Category"
                        tooltip={{
                          title: "This is a required field",
                          icon: <InfoCircleOutlined />,
                        }}
                        rules={[
                          { required: true, message: "This field is required" },
                        ]}
                      >
                        <Select placeholder="Select a category" allowClear>
                          {categories.map((category) => (
                            <Option key={category._id} value={category._id}>
                              {category.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="Name"
                        name="name"
                        tooltip={{
                          title: "This is a required field",
                          icon: <InfoCircleOutlined />,
                        }}
                        rules={[
                          { required: true, message: "This field is required" },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Price"
                        name="price"
                        tooltip={{
                          title: "This is a required field",
                          icon: <InfoCircleOutlined />,
                        }}
                        rules={[
                          { required: true, message: "This field is required" },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Description"
                        name="description"
                        tooltip={{
                          title: "This is a required field",
                          icon: <InfoCircleOutlined />,
                        }}
                        rules={[
                          { required: true, message: "This field is required" },
                        ]}
                      >
                        <TextArea rows={6} />
                      </Form.Item>

                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Update
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form>
              </Col>
            </Row>
          ),
          [categories, form, onFinish, response._id, response.code]
        )}
      </Wrapper>
    </Spin>
  );
};

export default EditPage;
