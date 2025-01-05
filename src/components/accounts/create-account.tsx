import {
  Col,
  Form,
  Input,
  Modal,
  ModalProps,
  Row,
  Select,
  notification,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { hideLoading, showLoading } from "../../store/loadingSlice";
import adminAccountApi from "../../api/admin.accountApi";
import { useEffect, useState } from "react";
import adminRolesApi from "../../api/admin.rolesApi";

interface CreateAccountModalProps extends ModalProps {
  accountId?: string | null;
  onClose: (isSuccess?: boolean) => void;
}
interface Role {
  roleName: string;
  roleId: string;
}
export default function CreateAccountModal({
  accountId,
  onClose,
  ...props
}: CreateAccountModalProps) {
  const [form] = useForm();
  const [roles, setRoles] = useState<Role[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const getRoles = await adminRolesApi.list();
        setRoles(getRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (accountId) {
      (async () => {
        try {
          const detailAccount = await adminAccountApi.getAccountById(accountId);
          console.log(detailAccount);
          form.setFieldsValue({
            name: detailAccount.fullName,
            username: detailAccount.userName,
            email: detailAccount.email,
            phone: detailAccount.phone,
            role: detailAccount.role?.roleId,
            // password: detailAccount.fullName,
          });
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      })();
    }
  }, [accountId]);

  const dispatch = useDispatch<AppDispatch>();
  const onFinish = async (values: unknown) => {
    dispatch(showLoading());
    if (accountId) {
      try {
        const user = await adminAccountApi.update(accountId, {
          fullName: values.name,
          phoneNumber: values.phone,
          userName: values.username,
          email: values.email,
          roleId: values.role,
        });
        notification.success({
          message: "Chỉnh sửa tài khoản thành công",
          description: `Thành công`,
        });
        onClose(true);
      } catch (err) {
        notification.error({
          message: "Chỉnh sửa tài khoản thất bại",
          description: err.message || "Đã xảy ra lỗi",
        });
      }
    } else {
      try {
        const user = await adminAccountApi.create({
          fullName: values.name,
          phoneNumber: values.phone,
          userName: values.username,
          email: values.email,
          password: values.password,
          confirmPassword: values.password,
          accountType: 1,
          roleId: values.role,
        });
        console.log(user);
        form.resetFields();
        notification.success({
          message: "Thêm mới tài khoản thành công",
          description: `Thành công`,
        });
        onClose(true);
      } catch (err) {
        notification.error({
          message: "Thêm mới tài khoản thất bại",
          description: err.message || "Đã xảy ra lỗi",
        });
      }
    }
    dispatch(hideLoading());
  };

  return (
    <Modal
      {...props}
      title={accountId ? "Chỉnh sửa tài khoản" : "Thêm mới tài khoản"}
      destroyOnClose={true}
      onOk={() => form.submit()}
      onCancel={onClose}
      okText={accountId ? "Cập nhật" : "Thêm mới"}
    >
      <Form className="mt-4" layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={[12, 0]} className="mt-4">
          <Col span={12}>
            <Form.Item
              label="Họ và tên"
              rules={[
                { required: true, message: "Vui lòng nhập họ và tên ..." },
              ]}
              name="name"
              className="!mb-2"
            >
              <Input placeholder="Nhập họ tên..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tên đăng nhập"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập ..." },
              ]}
              name="username"
              className="!mb-2"
            >
              <Input placeholder="Nhập tên đăng nhập..." />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng số điện thoại ..." },
                {
                  pattern: /^\+?\d*$/,
                  message: "Số điện thoại nhập không đúng.",
                },
              ]}
              name="phone"
              className="!mb-2"
            >
              <Input placeholder="Nhập SĐT..." />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email ..." },
                {
                  type: "email",
                  message: "Vui lòng nhập đúng định dạng email ...",
                },
              ]}
              name="email"
              className="!mb-2"
            >
              <Input placeholder="Nhập email..." />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Vai trò"
              rules={[{ required: true, message: "Vui lòng chọn vai trò ..." }]}
              name="role"
              className="!mb-2"
            >
              <Select
                placeholder="Chọn vai trò"
                options={roles.map((role) => ({
                  label: role.roleName,
                  value: role.roleId,
                }))}
              />
            </Form.Item>
          </Col>

          {!accountId && (
            <Col span={12}>
              <Form.Item
                label="Mật khẩu"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu ..." },
                  {
                    min: 8,
                    message: "Mật khẩu phải ít nhất 8 ký tự",
                  },
                ]}
                name="password"
                className="!mb-2"
              >
                <Input.Password placeholder="Nhập mật khẩu..." />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  );
}
