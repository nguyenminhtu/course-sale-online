import { Table, notification, Image, Modal, Input, Select } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import DeleteButton from "components/DeleteButton";
import EditButton from "components/EditButton";
import NewButton from "components/NewButton";
import PageHeader from "components/PageHeader";
import useRequest from "hooks/useRequest";
import Wrapper from "./ListPage.styles";

import DefaultCourseImage from "assets/images/default-course.png";

const { Search } = Input;
const { Option } = Select;

const columns = [
  {
    title: "Cover",
    dataIndex: "cover",
    key: "cover",
    render: (_, record) => {
      return (
        <Image
          width={100}
          height={100}
          src={
            record.cover
              ? `${process.env.REACT_APP_API_URL}${record.cover}`
              : DefaultCourseImage
          }
        />
      );
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: "40%",
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
  const {
    get: getCategory,
    loading: loadingCategory,
    response: responseCategory = { data: [], total: 0 },
  } = useRequest({});

  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    getCategory("/categories");
  }, [getCategory]);

  useEffect(() => {
    if (responseCategory.code || !responseCategory.data.length) {
      return;
    }

    setCategoryId(responseCategory.data[0]._id);
  }, [responseCategory.code, responseCategory.data]);

  useEffect(() => {
    if (!categoryId) {
      return;
    }

    const pageQuery = `limit=${10 * page}&skip=${10 * page - 10}`;
    const searchQuery = query ? `&search=${query}` : "";

    get(`/courses?${pageQuery}${searchQuery}&category=${categoryId}`);
  }, [categoryId, get, page, query]);

  const handleDeleteCourse = useCallback(async () => {
    Modal.confirm({
      content: "Are you sure want to delete these courses ?",
      onOk: async () => {
        await post("/remove_courses", { selectedIds });
        notification.success({
          message: "Delete course successfully",
          placement: "topRight",
        });
        setSelectedIds([]);
        setPage(1);
      },
    });
  }, [post, selectedIds]);

  return (
    <Wrapper>
      {useMemo(
        () => (
          <PageHeader title="List course" onBack={null} />
        ),
        []
      )}

      {useMemo(
        () => (
          <div className="header-wrapper">
            <div className="button-area">
              <NewButton path="/admin/courses/new" />

              <DeleteButton
                disabled={!selectedIds.length}
                onClick={handleDeleteCourse}
              />
            </div>

            <div className="search-area">
              <Select
                className="filter-category"
                value={categoryId}
                onChange={(value) => setCategoryId(value)}
              >
                {!responseCategory.code &&
                  responseCategory.data.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
              </Select>

              <Search
                className="search-course"
                onSearch={(text) => setQuery(text)}
                placeholder="Search course by name"
                enterButton="Search"
                allowClear
              />
            </div>
          </div>
        ),
        [
          categoryId,
          handleDeleteCourse,
          responseCategory.code,
          responseCategory.data,
          selectedIds.length,
        ]
      )}

      {useMemo(
        () => (
          <Table
            rowSelection={{
              type: "checkbox",
              onChange: (data) => setSelectedIds(data),
              selectedRowKeys: selectedIds,
            }}
            columns={columns}
            dataSource={
              response.code
                ? []
                : response.data.map((item) => ({
                    ...item,
                    category: item.category.name,
                    description: (
                      <p className="description-column">{item.description}</p>
                    ),
                    key: item._id,
                    action: (
                      <EditButton
                        onClick={() =>
                          history.push(`/admin/courses/${item._id}/edit`)
                        }
                      />
                    ),
                  }))
            }
            pagination={{
              onChange: (page) => setPage(page),
              pageSize: 10,
              total: response.total,
              current: page,
            }}
            loading={loading || loadingCategory}
          />
        ),
        [
          history,
          loading,
          loadingCategory,
          page,
          response.code,
          response.data,
          response.total,
          selectedIds,
        ]
      )}
    </Wrapper>
  );
};

export default ListPage;
