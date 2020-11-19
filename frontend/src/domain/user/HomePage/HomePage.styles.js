import styled from "styled-components";

export default styled.div`
  padding: 0 16px;

  .category-content {
    width: 100%;

    .slick-slide {
      padding: 16px;
      max-height: 400px;
      min-height: 400px;

      .course-item {
        max-height: 384px;
        min-height: 384px;

        .ant-card-body {
          white-space: pre-wrap;
          overflow-y: auto;
          max-height: calc(400px - 48px - 58px);
          min-height: calc(400px - 48px - 58px);
        }
      }
    }

    .prev-button-slider,
    .right-button-slider {
      position: absolute;
      top: 53%;
      z-index: 1;
    }

    .prev-button-slider {
      left: -8px;
    }

    .right-button-slider {
      right: -8px;
    }
  }
`;
