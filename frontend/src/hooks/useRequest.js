import { useContext } from "react";
import useFetch from "use-http";

import AuthContext from "contexts/auth";

const useRequest = ({ optionParams = {} }) => {
  const { accessToken, dispatch } = useContext(AuthContext);

  const { get, post, patch, del, loading, error, data } = useFetch(
    process.env.REACT_APP_API_URL,
    {
      ...optionParams,
      cachePolicy: "no-cache",
      interceptors: {
        request: ({ options }) => ({
          ...options,
          headers: accessToken
            ? {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`,
              }
            : { ...options.headers },
        }),
        response: ({ response }) => {
          if (!!accessToken && response.status === 401) {
            dispatch({ type: "logout" });
            return;
          }
          return response;
        },
      },
    }
  );

  return { get, post, patch, delete: del, loading, error, response: data };
};

export default useRequest;
