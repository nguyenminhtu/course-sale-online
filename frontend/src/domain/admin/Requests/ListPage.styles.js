import styled from "styled-components";

export default styled.div`
  table {
    th,
    td {
      text-align: center;
    }
  }

  .note-column {
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

    .search-area {
      width: 55%;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
