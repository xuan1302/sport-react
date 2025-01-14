import axiosClient from "../axiosClient";

const homeApi = {
  getOutstandingProduct(): Promise<unknown> {
    const url = "/v1/sporty-shop/home/outstanding-products";
    return axiosClient.get(url);
  },
};

export default homeApi;
