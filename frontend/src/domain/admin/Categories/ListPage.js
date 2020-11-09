import { Table } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import DeleteButton from "components/DeleteButton";
import EditButton from "components/EditButton";
import NewButton from "components/NewButton";
import PageHeader from "components/PageHeader";
import useRequest from "hooks/useRequest";
import Wrapper from "./ListPage.styles";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const ListPage = () => {
  const history = useHistory();
  const { get, post, loading, response = { data: [], total: 0 } } = useRequest(
    {}
  );

  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const pageQuery = `limit=${10 * page}&skip=${10 * page - 10}`;
    get(`/categories?${pageQuery}`);
  }, [get, page]);

  const handleDeleteCategory = useCallback(async () => {
    await post("/remove_categories", { selectedIds });
    setSelectedIds([]);
    setPage(1);
  }, [post, selectedIds]);

  return (
    <Wrapper>
      <PageHeader title="List category" onBack={null} />

      <div className="button-area">
        {useMemo(
          () => (
            <NewButton path="/admin/categories/new" />
          ),
          []
        )}

        {useMemo(
          () => (
            <DeleteButton
              disabled={!selectedIds.length}
              onClick={handleDeleteCategory}
            />
          ),
          [handleDeleteCategory, selectedIds.length]
        )}
      </div>

      {useMemo(
        () => (
          <Table
            rowSelection={{
              type: "checkbox",
              onChange: (data) => setSelectedIds(data),
            }}
            columns={columns}
            dataSource={response.data.map((item) => ({
              ...item,
              key: item._id,
              action: (
                <EditButton
                  onClick={() =>
                    history.push(`/admin/categories/${item._id}/edit`)
                  }
                />
              ),
            }))}
            pagination={{
              onChange: (page) => setPage(page),
              pageSize: 10,
              total: response.total,
              current: page,
            }}
            loading={loading}
          />
        ),
        [history, loading, page, response.data, response.total]
      )}
    </Wrapper>
  );
};

export default ListPage;
