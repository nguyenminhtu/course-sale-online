import { Link } from "react-router-dom";
import { Spin, Result, Button } from "antd";
import { useEffect, useState } from "react";

import getParamFromUrl from "utils/getParamFromUrl";
import useRequest from "hooks/useRequest";
import Wrapper from "./ActiveAccount.styles";

const ActiveAccount = () => {
  const { get, loading } = useRequest({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const response = await get(
        `/active-account?activationToken=${getParamFromUrl("token")}`
      );

      setIsValid(response.code || !response.user ? false : true);
    };

    validateToken();
  }, [get]);

  return (
    <Spin spinning={loading}>
      <Wrapper>
        {!loading && !isValid && (
          <Result
            status="error"
            title="Activation Failed"
            subTitle="Please check your email again."
            extra={[
              <Button type="primary" key="sign-in">
                <Link to="/sign_in">Go to sign in </Link>
              </Button>,
            ]}
          />
        )}

        {!loading && !!isValid && (
          <Result
            status="success"
            title="Activation Successfully"
            subTitle="Pleas login to buy course."
            extra={[
              <Button type="primary" key="sign-in">
                <Link to="/sign_in">Go to sign in </Link>
              </Button>,
            ]}
          />
        )}
      </Wrapper>
    </Spin>
  );
};

export default ActiveAccount;
