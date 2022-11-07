import axios, { AxiosError } from 'axios';
import useNotification from './use-notification';

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
  post<TReturn = unknown, TPayload = unknown>(
    endpoint: string,
    payload: TPayload
  ): Promise<TReturn | HttpErrorResponse>;
};

function useHttp(): UseHttpHook {
  const BASE_URI = 'http://localhost:8000/v1/';
  const notify = useNotification();

  const post = async <T = unknown, TPayload = unknown>(
    endpoint: string,
    payload: TPayload
  ): Promise<T | HttpErrorResponse> => {
    try {
      const { data } = await axios.post<T>(`${BASE_URI}${endpoint}`, payload);
      return data;
    } catch (error) {
      if (axios.isAxiosError<HttpErrorResponse>(error)) {
        switch (error.code) {
          case AxiosError.ERR_NETWORK:
            notify({
              title: 'Falha de rede',
              message:
                'Por favor, verifique sua conexão com a internet e/ou tente novamente mais tarde',
              type: 'info',
            });

            throw error;
          case AxiosError.ERR_BAD_REQUEST:
            return error.response?.data!;
          default:
            notify({
              title: 'Falha de aplicação',
              message:
                'Isto, provavelmente, é um erro interno. Por favor, tente novamente mais tarde',
              type: 'error',
            });

            throw error;
        }
      }

      notify({
        title: 'Falha de aplicação',
        message:
          'Isto, provavelmente, é um erro interno. Por favor, tente novamente mais tarde',
        type: 'error',
      });

      throw error;
    }
  };

  return {
    post,
  };
}

export default useHttp;
export { isHttpErrorResponse };
