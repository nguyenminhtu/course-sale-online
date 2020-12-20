import { Tabs, Spin, Divider } from "antd";
import { useContext, useEffect, useState } from "react";

import AuthContext from "contexts/auth";
import CourseCarousel from "components/CourseCarousel";
import useRequest from "hooks/useRequest";
import Wrapper from "./HomePage.styles";

const { TabPane } = Tabs;

let count = 0;

const HomePage = () => {
  const {
    get,
    loading,
    response = { categories: [], courses: [], hotCourses: [] },
  } = useRequest({});
  const { get: getRequest, loading: loadingRequest } = useRequest({});

  const { user, requests, dispatch } = useContext(AuthContext);

  const [tabKey, setTabKey] = useState("");

  useEffect(() => {
    if (!user || count === 1) {
      return;
    }

    const getAllRequest = async () => {
      const responseRequest = await getRequest(
        `/current-requests?userId=${user._id}`
      );

      dispatch({
        type: "setRequests",
        payload: {
          requests: responseRequest.data.requests,
          courses: responseRequest.data.courses,
        },
      });
      count += 1;
    };

    getAllRequest();
  }, [dispatch, getRequest, user]);

  useEffect(() => {
    const query = user
      ? tabKey
        ? `?categoryId=${tabKey}&userId=${user._id}`
        : `?userId=${user._id}`
      : tabKey
      ? `?categoryId=${tabKey}`
      : "";
    get(`/user-homes${query}`);
  }, [get, tabKey, user]);

  return (
    <Wrapper>
      <Spin
        style={{ maxHeight: "100vh", minHeight: "100vh" }}
        spinning={loading || loadingRequest}
      >
        <Divider orientation="center">HOT COURSES</Divider>
        {response.code ? null : (
          <CourseCarousel
            requests={requests
              .filter((request) => ["waiting"].includes(request.status))
              .map((request) => request.course)}
            courses={response.hotCourses}
          />
        )}

        <Divider className="nkh" orientation="center">
          COURSES BY CATEGORY
        </Divider>
        <Tabs
          className="category-content"
          onChange={(key) => setTabKey(key)}
          centered
        >
          {response.code
            ? null
            : response.categories.map((category) => (
                <TabPane tab={category.name} key={category._id}>
                  <CourseCarousel
                    requests={requests
                      .filter((request) => ["waiting"].includes(request.status))
                      .map((request) => request.course)}
                    courses={response.courses}
                  />
                </TabPane>
              ))}
        </Tabs>

        <Divider className="nkh" orientation="center">
          WHO WE ARE ?
        </Divider>
        <div className="introduce">
          <h3>
            NKH is the leading global marketplace for teaching and learning,
            connecting millions of students to the skills they need to succeed.
          </h3>

          <div className="statistic">
            <div>
              <h1>35M</h1>
              <p>Learners</p>
            </div>

            <div>
              <h1>120k</h1>
              <p>Courses</p>
            </div>

            <div>
              <h1>400M</h1>
              <p>Course enrollments</p>
            </div>

            <div>
              <h1>110M</h1>
              <p>Minutes of video</p>
            </div>
          </div>
        </div>
      </Spin>
    </Wrapper>
  );
};

export default HomePage;
