import axiosClient from "./axiosClient";

const adminProductsApi = {
  upload(file: File): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/product/images";

    // Tạo FormData để gửi file
    const formData = new FormData();
    formData.append("file", file);

    return axiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  listSize(): Promise<unknown> {
    const url = "/v1/sporty-shop/auth/size";
    return axiosClient.get(url);
  },
  listMaterial(): Promise<unknown> {
    const url = "/v1/sporty-shop/auth/material";
    return axiosClient.get(url);
  },

  createProduct(body: unknown): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/product";
    return axiosClient.post(url, body);
  },
  listProducts(params: unknown): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/product";
    return axiosClient.get(url, { params });
  },
  delete(id: string): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/product/${id}`;
    return axiosClient.delete(url);
  },
  changeStatusProduct(id: string, status: boolean): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/product/${id}/update-status`;
    return axiosClient.put(url, null, { params: { isActive: status } });
  },
  getProductDetail(id: string): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/product/${id}`;
    return axiosClient.get(url);
  },
  updateProduct(id: string | number, body: unknown): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/product/${id}`;
    return axiosClient.put(url, body);
  },
};

export default adminProductsApi;
