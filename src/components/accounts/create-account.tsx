import { Col, Form, Input, Modal, ModalProps, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';

interface CreateAccountModalProps extends ModalProps {
  accountId?: string;
}

export default function CreateAccountModal({
  accountId,
  ...props
}: CreateAccountModalProps) {
  const [form] = useForm();

  return (
    <Modal
      {...props}
      title={accountId ? 'Chỉnh sửa tài khoản' : 'Thêm mới tài khoản'}
    >
      <Form
        className='mt-4'
        layout='vertical'
        form={form}
        initialValues={{
          role: 'employee',
        }}
      >
        <Row gutter={[12, 0]} className='mt-4'>
          <Col span={12}>
            <Form.Item
              label='Họ và tên'
              rules={[{ required: true }]}
              name='name'
              className='!mb-2'
            >
              <Input placeholder='Nhập họ tên...' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Tên đăng nhập'
              rules={[{ required: true }]}
              name='username'
              className='!mb-2'
            >
              <Input placeholder='Nhập tên đăng nhập...' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label='Số điện thoại'
              rules={[{ required: true }]}
              name='phone'
              className='!mb-2'
            >
              <Input placeholder='Nhập SĐT...' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label='Email'
              rules={[{ required: true }]}
              name='email'
              className='!mb-2'
            >
              <Input placeholder='Nhập email...' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label='Vai trò'
              rules={[{ required: true }]}
              name='role'
              className='!mb-2'
            >
              <Select
                defaultValue='employee'
                options={[
                  {
                    label: 'Admin',
                    value: 'admin',
                  },
                  {
                    label: 'System Admin',
                    value: 'system-admin',
                  },
                  {
                    label: 'Employee',
                    value: 'employee',
                  },
                  {
                    label: 'Customer',
                    value: 'customer',
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label='Mật khẩu'
              rules={[{ required: true }]}
              name='password'
              className='!mb-2'
            >
              <Input.Password placeholder='Nhập mật khẩu...' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
