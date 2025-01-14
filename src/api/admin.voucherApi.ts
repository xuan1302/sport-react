import axiosClient from "./axiosClient";
interface ListCatParams {
  keyword: string;
  status: string | boolean;
  pageSize: number;
  pageNumber: number;
}
interface CreateCatParams {
  name: string;
  description?: string;
  parentId: number;
  status: boolean;
}
const adminVoucherApi = {
  listVoucher(): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/voucher";
    return axiosClient.get(url);
  },
  create(data: CreateCatParams): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/category";
    return axiosClient.post(url, data);
  },

  getVoucherById(id: string): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/category/${id}`;
    return axiosClient.get(url);
  },
  delete(id: string): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/category/${id}`;
    return axiosClient.delete(url);
  },
};

export default adminVoucherApi;
