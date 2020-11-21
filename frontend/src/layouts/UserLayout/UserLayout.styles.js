import styled from "styled-components";

export default styled.div`
  .site-layout-background {
    background-color: #fff;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-info {
      display: flex;
      align-items: center;

      .shopping-cart-item {
        color: #fff;
        font-size: 30px;
        margin-right: 32px;
        cursor: pointer;
      }
    }

    .logo {
      font-size: 30px;
      color: #fff;
      margin-right: 32px;
      cursor: pointer;

      a {
        color: #fff;

        &:hover {
          color: #fff;
        }
      }
    }

    .ant-select-auto-complete {
      width: 60%;

      .ant-input-search {
        margin-right: 32px;
        height: 35px;
        width: 100%;

        .ant-input-affix-wrapper,
        .ant-input-group-addon {
          padding: 0;
        }

        input {
          height: 35px;
          padding-left: 11px;
        }

        .ant-btn {
          height: 35px;
        }
      }
    }

    .signin-button {
      margin-right: 16px;
      color: #fff;
    }
  }
`;
