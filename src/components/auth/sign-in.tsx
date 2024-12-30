import { Form, Input, Modal, ModalProps, notification } from "antd";
import { useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import { hideLoading, showLoading } from "../../store/loadingSlice";

interface SignInModalProps extends ModalProps {
  authType?: "sign-in" | "sign-up";
  onClose: () => void;
}

export default function SignInModal({
  authType = "sign-in",
  onClose,
  ...props
}: SignInModalProps) {
  const [form] = Form.useForm();
  const [authTypeState, setAuthTypeState] = useState<"sign-in" | "sign-up">(
    authType
  );

  const dispatch = useDispatch<AppDispatch>();

  const onFinish = async (values: any) => {
    dispatch(showLoading());
    if (authTypeState === "sign-in") {
      // login
      try {
        const user = await dispatch(
          login({ userName: values.userName, password: values.password })
        ).unwrap();
        form.resetFields();
        notification.success({
          message: "Đăng nhập thành công",
          description: `Thành công`,
        });
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (err) {
        notification.error({
          message: "Đăng nhập thất bại",
          description: err.message || "Đã xảy ra lỗi",
        });
      }
    }

    //register
    if (authTypeState === "sign-up") {
      console.log(values);
      try {
        console.log(values);
      } catch (err) {
        notification.error({
          message: "Đăng ký thất bại",
          description: err.message || "Đã xảy ra lỗi",
        });
      }
    }
    dispatch(hideLoading());
  };

  return (
    <Modal
      {...props}
      title={authTypeState === "sign-in" ? "Đăng nhập" : "Đăng ký"}
      okText={authTypeState === "sign-in" ? "Đăng nhập" : "Đăng ký"}
      cancelText="Đóng"
      destroyOnClose={true}
      onOk={() => form.submit()} // Gọi submit form
      onCancel={onClose}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish} // Xử lý khi submit
      >
        <div className="flex flex-col gap-y-2">
          {authTypeState === "sign-up" && (
            <Form.Item name="fullName" label="Họ và tên" className="!mb-1">
              <Input placeholder="Full name..." />
            </Form.Item>
          )}

          <Form.Item
            name="userName"
            label="Tên đăng nhập"
            className="!mb-1"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập..." },
            ]}
          >
            <Input placeholder="Username..." />
          </Form.Item>

          {authTypeState === "sign-up" && (
            <Form.Item name="email" label="Email" className="!mb-1">
              <Input placeholder="Email..." />
            </Form.Item>
          )}

          {authTypeState === "sign-up" && (
            <Form.Item
              name="phoneNumber"
              label="Số điện thoại"
              className="!mb-1"
            >
              <Input placeholder="SĐT..." />
            </Form.Item>
          )}

          <Form.Item
            name="password"
            label="Mật khẩu"
            className="!mb-1"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu ..." }]}
          >
            <Input.Password placeholder="Password..." />
          </Form.Item>

          {authTypeState === "sign-up" && (
            <Form.Item
              name="RePassword"
              label="Xác nhận mật khẩu"
              className="!mb-1"
            >
              <Input.Password placeholder="Password..." />
            </Form.Item>
          )}

          {authTypeState === "sign-in" ? (
            <p
              onClick={() => setAuthTypeState("sign-up")}
              className="mb-0 text-blue-500 cursor-pointer hover:underline"
            >
              Chưa tạo tài khoản?{" "}
            </p>
          ) : (
            <p
              onClick={() => setAuthTypeState("sign-in")}
              className="mb-0 text-blue-500 cursor-pointer hover:underline"
            >
              Đã có tài khoản?{" "}
            </p>
          )}
        </div>
      </Form>
    </Modal>
  );
}
