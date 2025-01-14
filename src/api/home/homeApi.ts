import axiosClient from "../axiosClient";

const homeApi = {
  getOutstandingProduct(): Promise<unknown> {
    const url = "/v1/sporty-shop/home/outstanding-products";
    return axiosClient.get(url);
  },
  getTopProduct(params: { type: string }): Promise<unknown> {
    const url = "/v1/sporty-shop/home/top-category";
    return axiosClient.get(url, { params });
  },
};

export default homeApi;
