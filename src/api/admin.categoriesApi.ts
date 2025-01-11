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
const adminCategoriesApi = {
  listCat(): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/category/all";
    return axiosClient.get(url);
  },
  listCatParent(): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/category/parent-all";
    return axiosClient.get(url);
  },
  listCatPaginate(params: ListCatParams): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/category";
    return axiosClient.get(url, { params: params });
  },
  create(data: CreateCatParams): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/category";
    return axiosClient.post(url, data);
  },
  update(id: string, params: CreateCatParams): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/category/${id}`;
    return axiosClient.put(url, { ...params });
  },
  getCatById(id: string): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/category/${id}`;
    return axiosClient.get(url);
  },
  delete(id: string): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/category/${id}`;
    return axiosClient.delete(url);
  },
  changeStatus(id: string, isActive: boolean): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/category/${id}/update-status`;
    return axiosClient.put(url, null, {
      params: {
        isActive,
      },
    });
  },
};

export default adminCategoriesApi;
