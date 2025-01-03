import axiosClient from "./axiosClient";

interface ListStaffParams {
  keyword: string;
  pageSize: number;
  pageNumber: number;
}

interface CreateStaffParams {
  fullName: string;
  phoneNumber: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: number;
  roleId: number;
}

interface UpdateStaffParams
  extends Omit<
    CreateStaffParams,
    "password" | "confirmPassword" | "accountType"
  > {
  // Không cần thêm gì ở đây vì Omit đã loại bỏ các trường này
}
const adminAccountApi = {
  getListAccount(params: ListStaffParams): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/staff";
    return axiosClient.get(url, { params: params });
  },
  create(data: CreateStaffParams): Promise<unknown> {
    const url = "/v1/sporty-shop/admin/staff";
    return axiosClient.post(url, data);
  },
  update(id: string, params: UpdateStaffParams): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/staff/${id}`;
    return axiosClient.put(url, { ...params });
  },
  getAccountById(id: string): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/staff/${id}`;
    return axiosClient.get(url);
  },
  changePassword(
    id: string,
    body: { password: string; confirmPassword: string }
  ): Promise<unknown> {
    const url = `/v1/sporty-shop/admin/staff/${id}/reset-password`;
    return axiosClient.put(url, { ...body });
  },
};

export default adminAccountApi;
