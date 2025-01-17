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
  getProductById(id: string | number): Promise<unknown> {
    const url = `/v1/sporty-shop/home/product/${id}`;
    return axiosClient.get(url);
  },
  checkout(body: unknown): Promise<unknown> {
    const url = `/v1/sporty-shop/home/checkout`;
    return axiosClient.post(url, body);
  },
};

export default homeApi;
