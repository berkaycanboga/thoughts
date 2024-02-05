import axios, { AxiosError, AxiosResponse } from "axios";

const BASE_URL = "http://localhost:3000/api";

interface CustomError {
  error: string;
  status: number;
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  timeoutErrorMessage: "Request timed out. Please try again later.",
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error: AxiosError<CustomError> | Error) => {
  if (axios.isAxiosError(error)) {
    const customError = error.response?.data.error;

    if (customError) {
      console.error("API request error:", customError);
      throw customError;
    } else {
      console.error("API request error:", error.message);
      throw error;
    }
  } else {
    console.error("Generic error:", error.message);
    throw error;
  }
};

const handleResponse = async <T>(
  responsePromise: Promise<AxiosResponse<T>>,
): Promise<T> => {
  try {
    const response = await responsePromise;
    return response.data;
  } catch (error) {
    handleError(error as AxiosError<CustomError> | Error);
    throw error;
  }
};

const createUrl = (url: string) => `${url}`;

export const api = {
  post: <T>(url: string, data?: { content: string }) =>
    handleResponse(axiosInstance.post<T>(createUrl(url), data)),
  get: <T>(url: string) => handleResponse(axiosInstance.get<T>(createUrl(url))),
  put: <T>(url: string, data?: { content: string }) =>
    handleResponse(axiosInstance.put<T>(createUrl(url), data)),
  delete: <T>(url: string) =>
    handleResponse(axiosInstance.delete<T>(createUrl(url))),
};

export const urls = {
  base: BASE_URL,
  user: (userId: number) => createUrl(`/user${userId ? `/${userId}` : ""}`),
  userPosts: (userId: number, postId?: number) =>
    createUrl(`/user/${userId}/posts${postId ? `/${postId}` : ""}`),
};
