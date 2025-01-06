import axiosClient from "./axiosClient";

interface ListRolesParams {
  keyword: string;
  pageSize: number;
  pageNumber: number;
}

interface CreateRoleParams {
  code: string;
  roleName: string;
  permissionsIds: number[];
}

const adminRolesApi = {
  list(): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/role/all";
    return axiosClient.get(url);
  },
  getListRoles(params: ListRolesParams): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/role";
    return axiosClient.get(url, { params: params });
  },
  create(data: CreateRoleParams): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/role";
    return axiosClient.post(url, data);
  },
  update(id: string, params: CreateRoleParams): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/role/${id}`;
    return axiosClient.put(url, { ...params });
  },
  getRoleById(id: string): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/role/${id}`;
    return axiosClient.get(url);
  },
  delete(id: string): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/role/${id}`;
    return axiosClient.delete(url);
  },
  getPermissions(): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/role/permissions";
    return axiosClient.get(url);
  },
};

export default adminRolesApi;
