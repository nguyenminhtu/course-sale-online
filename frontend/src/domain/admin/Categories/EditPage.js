import { Form, Input, Button, Spin } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";

import PageHeader from "components/PageHeader";
import useRequest from "hooks/useRequest";
import Wrapper from "./NewPage.styles";

const EditPage = () => {
  const history = useHistory();
  const { categoryId } = useParams();
  const { get, patch, loading, response = {} } = useRequest({});

  const onFinish = useCallback(
    async (data) => {
      const patchResponse = await patch(`/categories/${categoryId}`, data);
      if (patchResponse._id) {
        history.push("/admin/categories");
      }
    },
    [categoryId, history, patch]
  );

  const [form] = Form.useForm();

  useEffect(() => {
    const getCategoryInfo = async () => {
      if (categoryId) {
        const getResponse = await get(`/categories/${categoryId}`);
        form.setFieldsValue({ name: getResponse.name });
      }
    };

    getCategoryInfo();
  }, [categoryId, form, get]);

  return (
    <Spin spinning={loading}>
      <Wrapper>
        {useMemo(
          () => (
            <PageHeader title="Edit category" />
          ),
          []
        )}

        {useMemo(
          () => (
            <Form layout="vertical" form={form} onFinish={onFinish}>
              {!response._id && <p>Category not found</p>}

              {response._id && (
                <>
                  <Form.Item
                    label="Category name"
                    name="name"
                    tooltip={{
                      title: "This is a required field",
                      icon: <InfoCircleOutlined />,
                    }}
                    rules={[
                      { required: true, message: "This field is required" },
                    ]}
                  >
                    <Input autoFocus />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Update
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form>
          ),
          [form, onFinish, response._id]
        )}
      </Wrapper>
    </Spin>
  );
};

export default EditPage;
