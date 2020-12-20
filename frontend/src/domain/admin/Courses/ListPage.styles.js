import styled from "styled-components";

export default styled.div`
  table {
    th,
    td {
      text-align: center;
    }
  }

  .description-column {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 16px;
    width: 100%;

    .search-area {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .filter-category {
        width: 35%;
      }

      .search-course {
        width: 64%;
      }
    }

    .button-area {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      button {
        margin-left: 8px;
      }
    }
  }
`;
