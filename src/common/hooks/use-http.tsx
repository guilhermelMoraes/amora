import axios from 'axios';

type HttpErrorResponse = {
  type: string;
  message: string;
  [key: string]: string | undefined;
};

function isHttpErrorResponse(response: unknown): response is HttpErrorResponse {
  if (typeof response === 'object' && response !== null) {
    return 'type' in response && 'message' in response;
  }

  return false;
}

type UseHttpHook = {
  post<T = unknown>(
    endpoint: string,
    payload: T
  ): Promise<T | HttpErrorResponse>;
};

function useHttp(): UseHttpHook {
  const BASE_URI = 'http://localhost:8000/v1/';

  const post = async <T = unknown,>(
    endpoint: string,
    payload: T
  ): Promise<T | HttpErrorResponse> => {
    try {
      const { data } = await axios.post<T>(`${BASE_URI}${endpoint}`, payload);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data as HttpErrorResponse;
      }

      throw new Error('Something went wrong');
    }
  };

  return {
    post,
  };
}

export default useHttp;
export { isHttpErrorResponse };
