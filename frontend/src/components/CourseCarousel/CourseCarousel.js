import { Card, Carousel, Button, Image, Tag } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useRef, memo, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "contexts/auth";
import CartContext from "contexts/cart";
import useEnrollCourse from "hooks/useEnrollCourse";
import Wrapper from "./CourseCarousel.styles";

import DefaultCourseImage from "assets/images/default-course.png";
import formatNumber from "utils/formatNumber";

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  lazyLoad: true,
};

const CourseCarousel = ({ courses = [], requests }) => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(CartContext);
  const history = useHistory();

  const { onEnrollCourse, renderCheckoutModal } = useEnrollCourse();

  const sliderRef = useRef(null);

  return (
    <Wrapper>
      {!!!courses.length && (
        <p style={{ textAlign: "center", margin: "50px 0" }}>
          Have no course in this category
        </p>
      )}

      {!!courses.length && (
        <>
          {courses.length > 4 && (
            <Button
              onClick={() => sliderRef.current && sliderRef.current.prev()}
              shape="circle"
              className="prev-button-slider"
              size="large"
              icon={<LeftOutlined />}
            />
          )}
          <Carousel {...settings} ref={sliderRef}>
            {courses.map((course) => (
              <Card
                onClick={() => history.push(`/courses/${course._id}`)}
                className="course-item"
                hoverable
                key={course._id}
                cover={
                  <Image
                    width="100%"
                    height="200px"
                    src={
                      course.cover
                        ? `${process.env.REACT_APP_API_URL}${course.cover}`
                        : DefaultCourseImage
                    }
                  />
                }
                actions={
                  user && user.courses.includes(course._id)
                    ? [
                        <span
                          onClick={(event) => {
                            event.stopPropagation();
                            history.push(`/my-course-detail/${course._id}`);
                          }}
                        >
                          Start learn
                        </span>,
                      ]
                    : requests.includes(course._id)
                    ? [<span>Waiting for confirm</span>]
                    : [
                        <ShoppingCartOutlined
                          key="cart"
                          onClick={(event) => {
                            event.stopPropagation();
                            dispatch({ type: "addItem", payload: course });
                          }}
                        />,
                        <DollarOutlined
                          key="dollar"
                          onClick={(event) => {
                            event.stopPropagation();
                            dispatch({ type: "addItem", payload: course });
                            setTimeout(() => {
                              onEnrollCourse();
                            }, 300);
                          }}
                        />,
                      ]
                }
              >
                <Card.Meta
                  title={course.name}
                  description={(() => (
                    <>
                      <p style={{ marginBottom: 8 }}>
                        <Tag color="#001529">{formatNumber(course.price)}</Tag>
                      </p>

                      <p>{course.description}</p>
                    </>
                  ))()}
                />
              </Card>
            ))}
          </Carousel>
          {courses.length > 4 && (
            <Button
              onClick={() => sliderRef.current && sliderRef.current.next()}
              shape="circle"
              size="large"
              className="right-button-slider"
              icon={<RightOutlined />}
            />
          )}
        </>
      )}

      {renderCheckoutModal()}
    </Wrapper>
  );
};

export default memo(CourseCarousel);
