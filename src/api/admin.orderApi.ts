import axiosClient from "./axiosClient";
interface ListOrderParams {
  keyword: string;
  pageSize: number;
  pageNumber: number;
}

const adminOrderApi = {
  listOrder(params: ListOrderParams): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/order";
    return axiosClient.get(url, { params: params });
  },
  changeStatus(id: string, status: number): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/order/${id}`;
    return axiosClient.put(url, null, {
      params: {
        status,
      },
    });
  },
};

export default adminOrderApi;
