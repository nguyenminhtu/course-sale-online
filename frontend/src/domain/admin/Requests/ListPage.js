import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Table, Button, Tag, notification, Modal, Select } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

import DeleteButton from "components/DeleteButton";
import PageHeader from "components/PageHeader";
import useRequest from "hooks/useRequest";
import Wrapper from "./ListPage.styles";

const { Option } = Select;

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
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
    width: "40%",
  },
];

const ListPage = () => {
  const { get, post, loading, response = { data: [], total: 0 } } = useRequest(
    {}
  );

  const {
    get: getCourse,
    loading: loadingCourse,
    response: responseCourse = { data: [], total: 0 },
  } = useRequest({});

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [courseId, setCourseId] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    getCourse("/courses");
  }, [getCourse]);

  useEffect(() => {
    const pageQuery = `limit=${10 * page}&skip=${10 * page - 10}`;

    const statusQuery = status ? `&status=${status}` : "";

    const courseQuery = courseId ? `&course=${courseId}` : "";

    get(`/requests?${pageQuery}${statusQuery}${courseQuery}`);
  }, [courseId, get, page, status]);

  const handleProcessRequest = useCallback(
    async (type) => {
      const selectedItems = response.data.filter((request) =>
        selectedIds.includes(request._id)
      );

      if (
        selectedItems.some((item) =>
          ["approved", "rejected"].includes(item.status)
        )
      ) {
        Modal.error({
          title: "You can not process these items. It is already processed.",
        });
        return;
      }

      Modal.confirm({
        content: `Are you sure want to ${type} these requests ?`,
        onOk: async () => {
          await post("/process_requests", { selectedIds, type });
          notification.success({
            message: `${
              type === "approve" ? "Approve" : "Reject"
            } request successfully`,
            placement: "topRight",
          });
          setSelectedIds([]);
          setPage(1);
        },
      });
    },
    [post, response.data, selectedIds]
  );

  const handleDeleteRequest = useCallback(async () => {
    Modal.confirm({
      content: "Are you sure want to delete these requests ?",
      onOk: async () => {
        await post("/remove_requests", { selectedIds });
        notification.success({
          message: "Delete request successfully",
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
          <PageHeader title="List request" onBack={null} />
        ),
        []
      )}

      {useMemo(
        () => (
          <div className="header-wrapper">
            <div className="button-area">
              <Button
                icon={<CheckOutlined style={{ color: "#52c41a" }} />}
                disabled={!selectedIds.length}
                type="ghost"
                style={{
                  backgroundColor: "#f6ffed",
                  border: "1px solid #b7eb8f",
                }}
                onClick={() => handleProcessRequest("approve")}
              >
                Approve
              </Button>

              <Button
                icon={<CloseOutlined style={{ color: "#ff4d4f" }} />}
                disabled={!selectedIds.length}
                onClick={() => handleProcessRequest("reject")}
                type="ghost"
                style={{
                  backgroundColor: "#fff2f0",
                  border: "1px solid #ffccc7",
                }}
              >
                Reject
              </Button>

              <DeleteButton
                disabled={!selectedIds.length}
                onClick={handleDeleteRequest}
              />
            </div>

            <div className="search-area">
              <span style={{ width: "20%", textAlign: "right" }}>
                Filter request:{" "}
              </span>

              <Select
                style={{ width: "38%" }}
                onChange={(value) => setStatus(value)}
                value={status}
              >
                <Option value="">All status</Option>
                <Option value="waiting">Waiting</Option>
                <Option value="approved">Approved</Option>
                <Option value="rejected">Rejected</Option>
              </Select>

              <Select
                style={{ width: "38%" }}
                onChange={(value) => setCourseId(value)}
                value={courseId}
              >
                <Option key="all" value="">
                  All course
                </Option>

                {!responseCourse.code &&
                  responseCourse.data.map((course) => (
                    <Option key={course._id} value={course._id}>
                      {course.name}
                    </Option>
                  ))}
              </Select>
            </div>
          </div>
        ),
        [
          courseId,
          handleDeleteRequest,
          handleProcessRequest,
          responseCourse.code,
          responseCourse.data,
          selectedIds.length,
          status,
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
                    user: item.user && item.user.username,
                    course: item.course && item.course.name,
                    note: <p className="note-column">{item.note}</p>,
                    status:
                      item.status === "waiting" ? (
                        <Tag color="gold">{item.status}</Tag>
                      ) : item.status === "approved" ? (
                        <Tag color="green">{item.status}</Tag>
                      ) : (
                        <Tag color="red">{item.status}</Tag>
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
