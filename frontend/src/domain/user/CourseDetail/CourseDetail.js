import { Spin, Row, Col, Card, Rate, Button, Divider, Statistic } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ReviewCarousel from "components/ReviewCarousel";
import useRequest from "hooks/useRequest";
import Wrapper from "./CourseDetail.styles";

import DefaultCourseImage from "assets/images/default-course.png";

const CourseDetail = () => {
  const { courseId } = useParams();
  const {
    get,
    loading,
    response = { course: {}, lessons: [], reviews: [] },
  } = useRequest({});

  useEffect(() => {
    get(`/course-detail?courseId=${courseId}`);
  }, [courseId, get]);

  console.log(response);

  return (
    <Wrapper>
      <Spin
        style={{ maxHeight: "100vh", minHeight: "100vh" }}
        spinning={loading}
      >
        {!loading && response.code && <p>Course not found</p>}

        {!loading && !response.code && (
          <>
            <Row>
              <Col span={16} offset={4}>
                <Row
                  style={{
                    height: 400,
                  }}
                >
                  <Col span={8}>
                    <div height={400} style={{ textAlign: "center" }}>
                      <img
                        alt={response.course.name}
                        height={400}
                        src={
                          response.course.cover
                            ? `${process.env.REACT_APP_API_URL}${response.course.cover}`
                            : DefaultCourseImage
                        }
                      />
                    </div>
                  </Col>

                  <Col span={1} />

                  <Col span={15}>
                    <Card
                      hoverable
                      style={{ height: 400 }}
                      title={response.course.name}
                    >
                      <p className="course-description">
                        {response.course.description}
                      </p>

                      <div style={{ marginBottom: 16 }}>
                        4.5 <Rate disabled allowHalf value={4.5} /> (100,000
                        ratings)
                      </div>

                      <p>
                        <Button size="large" type="primary">
                          ENROLL NOW
                        </Button>
                      </p>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Divider className="margin-top-divider" orientation="center">
              You Also Get Access To These Bonuses
            </Divider>

            <Row gutter={16} className="bonus-area">
              <Col span={6}>
                <Card>
                  <Statistic
                    title="60 Day Consultation"
                    value={1200000}
                    suffix="VND"
                  />
                </Card>
              </Col>

              <Col span={6}>
                <Card>
                  <Statistic
                    title="Free Lifetime Updates"
                    value={800000}
                    suffix="VND"
                  />
                </Card>
              </Col>

              <Col span={6}>
                <Card>
                  <Statistic
                    title="Access on mobile and TV"
                    value={600000}
                    suffix="VND"
                  />
                </Card>
              </Col>

              <Col span={6}>
                <Card>
                  <Statistic
                    title="Access to a computer with an internet connection."
                    value={400000}
                    suffix="VND"
                  />
                </Card>
              </Col>
            </Row>

            <Divider className="margin-top-divider" orientation="center">
              WHAT STUDENTS SAY ?
            </Divider>

            <ReviewCarousel reviews={response.reviews} />
          </>
        )}
      </Spin>
    </Wrapper>
  );
};

export default CourseDetail;
