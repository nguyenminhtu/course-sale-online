import styled from "styled-components";

export default styled.div`
  table {
    th,
    td {
      text-align: center;
    }

    .content-column {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
`;
