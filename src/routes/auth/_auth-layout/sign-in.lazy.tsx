import { createLazyFileRoute } from "@tanstack/react-router";
import { Button, Form, Input, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { login, setDataUser } from "../../../store/authSlice";
import { hideLoading, showLoading } from "../../../store/loadingSlice";
import { AppDispatch } from "../../../store/store";
import StorageKeys from "../../../constants/storage-key";

export const Route = createLazyFileRoute("/auth/_auth-layout/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const [form] = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const onFinish = async (values: any) => {
    dispatch(showLoading());
    try {
      const user = await dispatch(
        login({ userName: values.userName, password: values.password })
      ).unwrap();
      if (user.accountType === 1) {
        form.resetFields();
        notification.success({
          message: "Đăng nhập thành công",
          description: `Thành công`,
        });
        setTimeout(() => {
          window.location.href = "/admin";
        }, 500);
      } else {
        notification.error({
          message: "Bạn không có quyền đăng nhập vào hệ thống.",
          description: `Thông báo`,
        });
        sessionStorage.removeItem(StorageKeys.TOKEN);
        sessionStorage.removeItem(StorageKeys.USERINFO);
        dispatch(setDataUser(null));
      }
    } catch (err) {
      notification.error({
        message: "Đăng nhập thất bại",
        description: err.message || "Đã xảy ra lỗi",
      });
    }

    dispatch(hideLoading());
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <div className="flex flex-col gap-y-4">
        <h1 className="text-[#333333] font-semibold text-[28px]">
          Đăng nhập tài khoản
        </h1>

        <div className="flex flex-col gap-y-2">
          <Form.Item
            className="mb-2"
            name="userName"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập..." },
            ]}
          >
            <Input placeholder="Tài khoản" />
          </Form.Item>

          <Form.Item
            className="mb-2"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu ..." }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </div>
      </div>
    </Form>
  );
}
