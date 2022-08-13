import { API_URL } from '@common/constants';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance } from 'axios';

import { uuid4 } from '../strings';

/**
 * Конфиг параметров запроса
 */
type Config = Omit<AxiosRequestConfig, 'url' | 'headers'> & {
  /** Признак пропуска обновления токена */
  skipAuthRefresh?: boolean;
};

interface HttpClientParams {
  url: string;
  config?: Config;
  version?: string;
  headers?: Record<string, string>;
}

/**
 * Конфиг параметров запроса без поля 'data'
 */
type ConfigWithoutData = Omit<Config, 'data'>;

interface HttpClientParamsWithData<T = any> extends HttpClientParams {
  config?: ConfigWithoutData;
  data?: T;
}

interface HttpClient {
  get<T = any>(params: HttpClientParams): AxiosPromise<T>;
  delete<T = any>(params: HttpClientParams): AxiosPromise<T>;
  head<T = any>(params: HttpClientParams): AxiosPromise<T>;
  post<T = any, D = any>(params: HttpClientParamsWithData<D>): AxiosPromise<T>;
  put<T = any, D = any>(params: HttpClientParamsWithData<D>): AxiosPromise<T>;
  patch<T = any, D = any>(params: HttpClientParamsWithData<D>): AxiosPromise<T>;
  setDefaultHeaders(headers: Record<string, string>): void;
  removeDefaultHeaders(): void;
  addResponseInterceptor: (interceptor: number) => void;
  removeAllInterceptors: () => void;
  axiosInstance: AxiosInstance;
}

/**
 * ### Метод создает и возвращает объект axiosInstance
 * @param baseURL - базовый урл
 * @param apiVersion - версия API
 *
 * @returns объект AxiosInstance
 */
const createHttpClient = (baseURL = '/', apiVersion = 'v1'): HttpClient => {
  const axiosInstance = axios.create({ baseURL });
  const responseInterceptors: number[] = [];

  /**
   * ### Метод для установки дефолтных заголовков
   *
   * @param headers - заголовки
   * @returns {void}
   */
  const setDefaultHeaders = (headers: Record<string, string>): void => {
    axiosInstance.defaults.headers.common = headers;
  };

  /**
   * ### Метод удаления дефолтных заголовков
   *
   * @returns {void}
   */
  const removeDefaultHeaders = (): void => {
    axiosInstance.defaults.headers.common = {};
  };

  /**
   * ### Метод для отправки GET-запроса
   *
   * @example
   * get('URL_TO_BACKEND', {params: { search: 'Сбербанк' }});
   *
   * @param url - URL эндпоинта для отправки запроса
   * @param config - Настройки для запроса
   * @param version - Версия API эндпоинта
   * @param headers - Дополнительные заголовки
   *
   * @returns Результат ответа от сервера
   */
  const get = <T = any>({
    url,
    config,
    version = apiVersion,
    headers = {},
  }: HttpClientParams): AxiosPromise<T> => {
    const versionStr = version ? `api/${version}` : '';
    return axiosInstance.get<T>(`${versionStr}/${url}`, {
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      ...config,
    });
  };

  /**
   * ### Метод для отправки DELETE-запроса
   *
   * @example
   * deleteReq('URL_TO_BACKEND');
   *
   * @param url - URL эндпоинта для отправки запроса
   * @param config - Настройки для запроса
   * @param version - Версия API эндпоинта
   * @param headers - Дополнительные заголовки
   *
   * @returns Результат ответа от сервера
   */
  const deleteReq = <T = any>({
    url,
    config,
    version = apiVersion,
    headers = {},
  }: HttpClientParams): AxiosPromise<T> => {
    const versionStr = version ? `api/${version}` : '';
    return axiosInstance.delete<T>(`${versionStr}/${url}`, {
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      ...config,
    });
  };

  /**
   * ### Метод для отправки HEAD-запроса
   *
   * @example
   * head('URL_TO_BACKEND');
   *
   * @param url - URL эндпоинта для отправки запроса
   * @param config - Настройки для запроса
   * @param version - Версия API эндпоинта
   * @param headers - Дополнительные заголовки
   *
   * @returns Результат ответа от сервера
   */
  const head = <T = any>({
    url,
    config,
    version = apiVersion,
    headers = {},
  }: HttpClientParams): AxiosPromise<T> => {
    const versionStr = version ? `api/${version}` : '';
    return axiosInstance.head<T>(`${versionStr}/${url}`, {
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      ...config,
    });
  };

  /**
   * ### Метод для отправки POST-запроса
   *
   * @example
   * post('URL_TO_BACKEND', data);
   *
   * @param url - URL эндпоинта для отправки запроса
   * @param data - данные запроса
   * @param config - Настройки для запроса
   * @param version - Версия API эндпоинта
   * @param headers - Дополнительные заголовки
   *
   * @returns Результат ответа от сервера
   */
  const post = <T = any, D = any>({
    url,
    data,
    config,
    version = apiVersion,
    headers = {},
  }: HttpClientParamsWithData<D>): AxiosPromise<T> => {
    const versionStr = version ? `api/${version}` : '';
    return axiosInstance.request<T>({
      url: `${versionStr}/${url}`,
      method: 'post',
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      ...config,
      data,
    });
  };

  /**
   * ### Метод для отправки PUT-запроса
   *
   * @example
   * put('URL_TO_BACKEND', data,);
   *
   * @param url - URL эндпоинта для отправки запроса
   * @param data - данные запроса
   * @param config - Настройки для запроса
   * @param version - Версия API эндпоинта
   * @param headers - Дополнительные заголовки
   *
   * @returns Результат ответа от сервера
   */
  const put = <T = any, D = any>({
    url,
    data,
    config,
    version = apiVersion,
    headers = {},
  }: HttpClientParamsWithData<D>): AxiosPromise<T> => {
    const versionStr = version ? `api/${version}` : '';
    return axiosInstance.request<T>({
      url: `${versionStr}/${url}`,
      method: 'put',
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      ...config,
      data,
    });
  };

  /**
   * ### Метод для отправки PATCH-запроса
   *
   * @example
   * patch('URL_TO_BACKEND', data);
   *
   * @param url - URL эндпоинта для отправки запроса
   * @param data - Данные запроса
   * @param config - Настройки для запроса
   * @param version - Версия API эндпоинта
   * @param headers - Дополнительные заголовки
   *
   * @returns Результат ответа от сервера
   */
  const patch = <T = any, D = any>({
    url,
    data,
    config,
    version = apiVersion,
    headers = {},
  }: HttpClientParamsWithData<D>): AxiosPromise<T> => {
    const versionStr = version ? `api/${version}` : '';
    return axiosInstance.request<T>({
      url: `${versionStr}/${url}`,
      method: 'patch',
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      ...config,
      data,
    });
  };

  /**
   * ### Добавление идентификатора response перехватчика
   *
   * @param interceptor - идентификатор перехватчика
   * @returns {void}
   */
  const addResponseInterceptor = (interceptor: number) =>
    responseInterceptors.push(interceptor);

  /**
   * ### Удаление всех перехватчиков
   *
   * @returns {void}
   */
  const removeAllInterceptors = (): void => {
    responseInterceptors.forEach((interceptor) => {
      axiosInstance.interceptors.response.eject(interceptor);
    });
  };

  return {
    get,
    delete: deleteReq,
    head,
    post,
    put,
    patch,
    axiosInstance,
    setDefaultHeaders,
    removeDefaultHeaders,
    addResponseInterceptor,
    removeAllInterceptors,
  };
};

export const request = createHttpClient(API_URL);
