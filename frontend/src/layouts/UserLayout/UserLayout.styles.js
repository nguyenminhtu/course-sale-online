import styled from "styled-components";

export default styled.div`
  .site-layout-background {
    background-color: #fff;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      font-size: 30px;
      color: #fff;
      margin-right: 32px;
    }

    .ant-input-search {
      margin-right: 32px;
      height: 35px;

      .ant-input-affix-wrapper,
      .ant-input-group-addon {
        padding: 0;
      }

      input {
        height: 35px;
        padding-left: 11px;
      }

      .ant-btn {
        height: 37px;
      }
    }

    .signin-button {
      margin-right: 16px;
    }
  }
`;
