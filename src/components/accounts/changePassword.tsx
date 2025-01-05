import { Col, Form, Input, Modal, ModalProps, Row, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import adminAccountApi from "../../api/admin.accountApi";
import { hideLoading, showLoading } from "../../store/loadingSlice";
import { AppDispatch } from "../../store/store";

interface ChangePasswordModalProps extends ModalProps {
  accountId?: string | null;
  onClose: (isSuccess?: boolean) => void;
}

export default function ChangePasswordModal({
  accountId,
  onClose,
  ...props
}: ChangePasswordModalProps) {
  const [form] = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const onFinish = async (values: unknown) => {
    dispatch(showLoading());
    if (accountId) {
      try {
        const user = await adminAccountApi.changePassword(accountId, {
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
        notification.success({
          message: "Thay đổi mật khẩu thành công",
          description: `Thành công`,
        });
        onClose();
      } catch (err) {
        notification.error({
          message: "Thay đổi mật khẩu thất bại",
          description: err.message || "Đã xảy ra lỗi",
        });
      }
    }
    dispatch(hideLoading());
  };

  return (
    <Modal
      {...props}
      title="Đổi mật khẩu"
      destroyOnClose={true}
      onOk={() => form.submit()}
      onCancel={onClose}
      okText="Xác nhận"
    >
      <Form className="mt-4" layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={[12, 0]} className="mt-4">
          <Col span={24}>
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
        </Row>
        <Row gutter={[12, 0]} className="mt-4">
          <Col span={24}>
            <Form.Item
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu ..." },
                {
                  validator: (_, value) => {
                    if (!value || value === form.getFieldValue("password")) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu nhập không khớp")
                    );
                  },
                },
              ]}
              hasFeedback
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              className="!mb-1"
            >
              <Input.Password placeholder="Password..." />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
