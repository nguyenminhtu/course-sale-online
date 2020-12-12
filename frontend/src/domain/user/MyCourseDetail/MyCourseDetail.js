import { Spin, Row, Col, List, Tag, PageHeader } from "antd";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";

import useRequest from "hooks/useRequest";
import Wrapper from "./MyCourseDetail.styles";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MyCourseDetail = () => {
  const { courseId } = useParams();
  const {
    get,
    patch,
    loading,
    response = { course: {}, lessons: [] },
  } = useRequest({});

  const history = useHistory();

  const [selectedLesson, setSelectedLesson] = useState({});

  useEffect(() => {
    get(`/my-course-detail?courseId=${courseId}`);
  }, [get, courseId]);

  useEffect(() => {
    response.lessons.length && setSelectedLesson(response.lessons[0]);
  }, [response.lessons]);

  const handleEndVideo = useCallback(async () => {
    await patch(`/my-course-detail/finish-lesson`, {
      lessonId: selectedLesson._id,
      courseId,
    });

    const totalLesson = response.lessons;
    const selectedIndex = totalLesson.findIndex(
      (lesson) => lesson._id === selectedLesson._id
    );
    if (selectedIndex < totalLesson.length - 1) {
      setSelectedLesson(response.lessons[selectedIndex + 1]);
    }
  }, [courseId, patch, response.lessons, selectedLesson._id]);

  return (
    <Spin spinning={loading}>
      <Wrapper>
        <Row>
          {useMemo(
            () => (
              <Col span={18}>
                {!loading && !!!response.code && selectedLesson && (
                  <video
                    onEnded={handleEndVideo}
                    key={selectedLesson.video}
                    controls
                    width="100%"
                    height="auto"
                  >
                    <source
                      src={`${process.env.REACT_APP_API_URL}${selectedLesson.video}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                )}

                {!loading && !!response.code && (
                  <p>Error while loading course content</p>
                )}

                {!!loading && (
                  <div style={{ width: "100%", height: "500" }}>Loading...</div>
                )}
              </Col>
            ),
            [handleEndVideo, loading, response.code, selectedLesson]
          )}

          <Col span={6}>
            <Row>
              {useMemo(
                () => (
                  <Col span={24}>
                    <PageHeader
                      onBack={() => history.replace("/my-courses")}
                      title={response.course.name}
                    />
                    <List
                      bordered
                      dataSource={response.lessons}
                      renderItem={(item) => (
                        <List.Item
                          className={`lesson-item ${
                            selectedLesson._id === item._id
                              ? "selected-item"
                              : ""
                          }`}
                          onClick={() => setSelectedLesson(item)}
                          style={{ cursor: "pointer" }}
                          actions={[
                            <Tag color={item.isFinish ? "green" : "gold"}>
                              {item.isFinish ? "Done" : "Not yet"}
                            </Tag>,
                          ]}
                        >
                          {item.name}
                        </List.Item>
                      )}
                    />
                  </Col>
                ),
                [
                  history,
                  response.course.name,
                  response.lessons,
                  selectedLesson._id,
                ]
              )}
            </Row>
          </Col>
        </Row>
      </Wrapper>
    </Spin>
  );
};

export default MyCourseDetail;
