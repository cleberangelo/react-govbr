import axios, { AxiosInstance } from "axios";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});

export const HttpInterceptor = ({ children }) => {
  const { isAuthenticated, setLoading, currentUser }: any = useAuth();

  useEffect(() => {
    const reqInterceptor = apiClient.interceptors.request.use(_conf => {
      setLoading(true);

      _conf.headers.Authorization = isAuthenticated ? "Bearer " + currentUser.token : "";
      _conf.headers.usuario = isAuthenticated ? currentUser.cpf : "";

      return _conf;
    }, _error => {
      console.error("request error: ", _error);

      return Promise.reject(_error);
    });

    const respInterceptor = apiClient.interceptors.response.use(_resp => {
      setLoading(false);

      return _resp;
    }, (_error) => {
      setLoading(false);

      console.error(_error);

      if (_error.request.status === 0 || _error.status === 502) {
        alert("request error: " + _error.message + " - erro ao efetuar a requisição");
      } else if (_error.response.status === 401) {
        alert("response error: " + _error.response.data.error + " - " + _error.response.data.message);
      } else {
        alert("response error: " + _error.response.data.error + " - " + _error.response.data.message);
      }

      return Promise.reject(_error);
    });

    return () => {
      setLoading(false);

      apiClient.interceptors.request.eject(reqInterceptor);
      apiClient.interceptors.response.eject(respInterceptor);
    }

  }, [isAuthenticated, currentUser]);

  return children;
}