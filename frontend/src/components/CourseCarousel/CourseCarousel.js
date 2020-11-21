import { Card, Carousel, Button, Image } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useRef, memo } from "react";
import { useHistory } from "react-router-dom";

import Wrapper from "./CourseCarousel.styles";

import DefaultCourseImage from "assets/images/default-course.png";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  // autoplay: true,
  // speed: 1000,
  // autoplaySpeed: 10000,
  lazyLoad: true,
};

const CourseCarousel = ({ courses = [] }) => {
  const history = useHistory();

  const sliderRef = useRef(null);

  return (
    <Wrapper>
      {!!!courses.length && <p>Have no course in this category</p>}

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
                actions={[
                  <ShoppingCartOutlined key="cart" />,
                  <DollarOutlined key="dollar" />,
                ]}
              >
                <Card.Meta
                  title={course.name}
                  description={course.description}
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
    </Wrapper>
  );
};

export default memo(CourseCarousel);
