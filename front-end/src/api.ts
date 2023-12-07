export const baseURL = "http://localhost:3000";

export interface ApiResponse<T = any> {
  status: "success" | "error";
  data: {
    data: T;
  };
}
