import { Table, notification, Modal, Input, Select } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import DeleteButton from "components/DeleteButton";
import EditButton from "components/EditButton";
import NewButton from "components/NewButton";
import PageHeader from "components/PageHeader";
import useRequest from "hooks/useRequest";
import Wrapper from "./ListPage.styles";

const { Search } = Input;
const { Option } = Select;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Course",
    dataIndex: "course",
    key: "course",
    render: (_, record) => {
      return record.course && record.course.name;
    },
  },
  // {
  //   title: "Is Finish",
  //   dataIndex: "isFinish",
  //   key: "isFinish",
  //   render: (_, record) => {
  //     return record.isFinish ? "Finished" : "Not yet";
  //   },
  // },
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
    get: getCourse,
    loading: loadingCourse,
    response: responseCourse = { data: [], total: 0 },
  } = useRequest({});

  const [page, setPage] = useState(1);
  const [courseId, setCourseId] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    getCourse("/courses");
  }, [getCourse]);

  useEffect(() => {
    if (responseCourse.code || !responseCourse.data.length) {
      return;
    }

    setCourseId(responseCourse.data[0]._id);
  }, [responseCourse.code, responseCourse.data]);

  useEffect(() => {
    if (!courseId) {
      return;
    }

    const pageQuery = `limit=${10 * page}&skip=${10 * page - 10}`;
    const searchQuery = query ? `&search=${query}` : "";
    get(`/lessons?${pageQuery}${searchQuery}&course=${courseId}`);
  }, [courseId, get, page, query]);

  const handleDeleteLesson = useCallback(async () => {
    Modal.confirm({
      content: "Are you sure want to delete these lessons ?",
      onOk: async () => {
        await post("/remove_lessons", { selectedIds });
        notification.success({
          message: "Delete lesson successfully",
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
          <PageHeader title="List lesson" onBack={null} />
        ),
        []
      )}

      {useMemo(
        () => (
          <div className="header-wrapper">
            <div className="button-area">
              <NewButton path="/admin/lessons/new" />

              <DeleteButton
                disabled={!selectedIds.length}
                onClick={handleDeleteLesson}
              />
            </div>

            <div className="search-area">
              <Select
                className="filter-course"
                value={courseId}
                onChange={(value) => setCourseId(value)}
              >
                {!responseCourse.code &&
                  responseCourse.data.map((course) => (
                    <Option key={course._id} value={course._id}>
                      {course.name}
                    </Option>
                  ))}
              </Select>

              <Search
                className="search-lesson"
                onSearch={(text) => setQuery(text)}
                placeholder="Search lesson by name"
                enterButton="Search"
                allowClear
              />
            </div>
          </div>
        ),
        [
          courseId,
          handleDeleteLesson,
          responseCourse.code,
          responseCourse.data,
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
                    key: item._id,
                    action: (
                      <EditButton
                        onClick={() =>
                          history.push(`/admin/lessons/${item._id}/edit`)
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
            loading={loading || loadingCourse}
          />
        ),
        [
          history,
          loading,
          loadingCourse,
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
