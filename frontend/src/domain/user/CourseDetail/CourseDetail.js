import {
  Spin,
  Row,
  Col,
  Card,
  Rate,
  Button,
  Divider,
  Statistic,
  Tag,
} from "antd";
import { useHistory } from "react-router-dom";
import { useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";

import AuthContext from "contexts/auth";
import CartContext from "contexts/cart";
import formatNumber from "utils/formatNumber";
import ReviewCarousel from "components/ReviewCarousel";
import ReviewForm from "components/ReviewForm";
import useEnrollCourse from "hooks/useEnrollCourse";
import useRequest from "hooks/useRequest";
import Wrapper from "./CourseDetail.styles";

import DefaultCourseImage from "assets/images/default-course.png";

let count = 0;

const CourseDetail = () => {
  const { courseId } = useParams();
  const { dispatch: dispatchCart } = useContext(CartContext);
  const { isAuth, user, requests, dispatch: dispatchAuth } = useContext(
    AuthContext
  );

  const history = useHistory();

  const {
    get,
    post,
    loading,
    response = { course: {}, reviews: [] },
  } = useRequest({});
  const { get: getRequest, loading: loadingRequest } = useRequest({});
  const { onEnrollCourse, renderCheckoutModal } = useEnrollCourse();

  console.log(requests);

  useEffect(() => {
    if (!user || count === 1) {
      return;
    }

    const getAllRequest = async () => {
      const responseRequest = await getRequest(
        `/current-requests?userId=${user._id}`
      );

      dispatchAuth({
        type: "setRequests",
        payload: {
          requests: responseRequest.data.requests.filter((request) =>
            ["waiting"].includes(request.status)
          ),
          courses: responseRequest.data.courses,
        },
      });
      count += 1;
    };

    getAllRequest();
  }, [dispatchAuth, getRequest, user]);

  useEffect(() => {
    get(`/course-detail?courseId=${courseId}`);
  }, [courseId, get]);

  const onSubmitReview = useCallback(
    async (formValues, callback) => {
      const reviewResponse = await post("/reviews", {
        ...formValues,
        user: user._id,
        course: courseId,
      });

      if (!reviewResponse.code) {
        callback();
        get(`/course-detail?courseId=${courseId}`);
      }
    },
    [courseId, get, post, user]
  );

  return (
    <Wrapper>
      <Spin
        style={{ maxHeight: "100vh", minHeight: "100vh" }}
        spinning={loading || loadingRequest}
      >
        {!loading && response.code && <p>Course not found</p>}

        {!loading && !response.code && (
          <>
            <Row>
              <Col span={18} offset={3}>
                <Row
                  style={{
                    height: 400,
                  }}
                >
                  <Col span={9}>
                    <div height={400} style={{ textAlign: "center" }}>
                      <img
                        style={{ maxWidth: "100%" }}
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

                  <Col span={14}>
                    <Card
                      hoverable
                      style={{ height: 400 }}
                      title={response.course.name}
                    >
                      <p className="course-description">
                        {response.course.description}
                      </p>

                      <p>
                        <Tag color="volcano">
                          {formatNumber(response.course.price)}
                        </Tag>
                      </p>

                      <div style={{ marginBottom: 16 }}>
                        4.5 <Rate disabled allowHalf value={4.5} /> (100,000
                        ratings)
                      </div>

                      {user &&
                        !user.courses.includes(courseId) &&
                        requests
                          .map((request) => request.course)
                          .includes(courseId) && (
                          <p>
                            <Tag color="green">Waiting for confirm</Tag>
                          </p>
                        )}

                      {user && user.courses.includes(courseId) && (
                        <p>
                          <Button
                            size="large"
                            type="primary"
                            onClick={() =>
                              history.push(`/my-course-detail/${courseId}`)
                            }
                          >
                            START LEARN
                          </Button>
                        </p>
                      )}

                      {!requests
                        .map((request) => request.course)
                        .includes(courseId) &&
                        (!user || !user.courses.includes(courseId)) && (
                          <p>
                            <Button
                              size="large"
                              type="primary"
                              onClick={() => {
                                dispatchCart({
                                  type: "addItem",
                                  payload: response.course,
                                });

                                setTimeout(() => {
                                  onEnrollCourse();
                                }, 300);
                              }}
                            >
                              ENROLL NOW
                            </Button>

                            <Button
                              style={{ marginLeft: 16 }}
                              type="default"
                              onClick={() => {
                                dispatchCart({
                                  type: "addItem",
                                  payload: response.course,
                                });
                              }}
                            >
                              ADD TO CART
                            </Button>
                          </p>
                        )}
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
                    title="Access to a computer."
                    value={400000}
                    suffix="VND"
                  />
                </Card>
              </Col>
            </Row>

            {!!isAuth && (
              <Row>
                <Col span={10} offset={7}>
                  <ReviewForm onSave={onSubmitReview} />
                </Col>
              </Row>
            )}

            <Divider className="margin-top-divider" orientation="center">
              WHAT STUDENTS SAY ?
            </Divider>

            <ReviewCarousel reviews={response.reviews} />

            {renderCheckoutModal()}
          </>
        )}
      </Spin>
    </Wrapper>
  );
};

export default CourseDetail;
