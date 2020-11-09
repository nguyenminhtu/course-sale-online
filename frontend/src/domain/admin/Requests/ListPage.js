import { Table } from "antd";
import { useEffect } from "react";
import useRequest from "hooks/useRequest";

const columns = [
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Course",
    dataIndex: "course",
    key: "course",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const ListPage = () => {
  const { get, loading, response = { data: [] } } = useRequest({});

  useEffect(() => {
    get("/requests");
  }, [get]);

  return (
    <Table
      rowSelection={{ type: "checkbox" }}
      columns={columns}
      dataSource={response.data.map((item, index) => ({ ...item, key: index }))}
      pagination={{ pageSize: 1, showSizeChanger: true }}
      loading={loading}
    />
  );
};

export default ListPage;
