import { useContext } from "react";
import useFetch from "use-http";

import AuthContext from "contexts/auth";

const useRequest = ({ optionParams = {} }) => {
  const { accessToken } = useContext(AuthContext);

  const { get, post, patch, del, loading, error, data } = useFetch(
    process.env.REACT_APP_API_URL,
    {
      ...optionParams,
      cachePolicy: "no-cache",
      interceptors: {
        request: ({ options }) => ({
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      },
    }
  );

  return { get, post, patch, delete: del, loading, error, response: data };
};

export default useRequest;
