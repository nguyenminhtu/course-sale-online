import { Tabs, Spin, Row, Card, Col, List, Carousel, Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import useRequest from "hooks/useRequest";
import Wrapper from "./HomePage.styles";

const { TabPane } = Tabs;

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  // autoplay: true,
  // speed: 10000,
  // autoplaySpeed: 10000,
  lazyLoad: true,
};

const HomePage = () => {
  const {
    get,
    loading,
    response = { categories: [], courses: [] },
  } = useRequest({});

  const sliderRef = useRef(null);

  const [tabKey, setTabKey] = useState("");

  useEffect(() => {
    const queryByCategory = tabKey ? `categoryId=${tabKey}` : "";
    get(`/user-homes?${queryByCategory}`);
  }, [get, tabKey]);

  console.log(response.courses);

  return (
    <Wrapper>
      <Spin
        style={{ maxHeight: "100vh", minHeight: "100vh" }}
        spinning={loading}
      >
        <Tabs className="category-content" onChange={(key) => setTabKey(key)}>
          {response.code
            ? null
            : response.categories.map((category) => (
                <TabPane tab={category.name} key={category._id}>
                  {!!!response.courses.length && (
                    <p>Have no course in this category</p>
                  )}

                  {!!response.courses.length && (
                    <>
                      <Button
                        onClick={() =>
                          sliderRef.current && sliderRef.current.prev()
                        }
                        shape="circle"
                        className="prev-button-slider"
                        size="large"
                        icon={<LeftOutlined />}
                      />
                      <Carousel {...settings} ref={sliderRef}>
                        {response.courses.map((course) => (
                          <Card
                            className="course-item"
                            hoverable
                            title={course.name}
                            key={course._id}
                          >
                            {course.description}
                          </Card>
                        ))}
                      </Carousel>
                      <Button
                        onClick={() =>
                          sliderRef.current && sliderRef.current.next()
                        }
                        shape="circle"
                        size="large"
                        className="right-button-slider"
                        icon={<RightOutlined />}
                      />
                    </>
                  )}
                </TabPane>
              ))}
        </Tabs>
      </Spin>
    </Wrapper>
  );
};

export default HomePage;
