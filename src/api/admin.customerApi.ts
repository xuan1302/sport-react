import axiosClient from "./axiosClient";

interface ListCustomerParams {
  keyword: string;
  pageSize: number;
  pageNumber: number;
  startDate?: string;
  endDate?: string;
}
const adminCustomerApi = {
  listCustomer(params: ListCustomerParams): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/customer";
    return axiosClient.get(url, { params: params });
  },
};

export default adminCustomerApi;
