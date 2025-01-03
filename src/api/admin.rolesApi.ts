import axiosClient from "./axiosClient";

interface ListStaffParams {
  keyword: string;
  pageSize: number;
  pageNumber: number;
}

const adminRolesApi = {
  list(): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/role/all";
    return axiosClient.get(url);
  },
};

export default adminRolesApi;
