import { Form, Input, Modal, ModalProps } from 'antd';
import { useState } from 'react';

interface SignInModalProps extends ModalProps {
  authType?: 'sign-in' | 'sign-up';
}

export default function SignInModal({
  authType = 'sign-in',
  ...props
}: SignInModalProps) {
  const [form] = Form.useForm();
  const [authTypeState, setAuthTypeState] = useState<'sign-in' | 'sign-up'>(
    authType,
  );

  return (
    <Modal
      {...props}
      title={authTypeState === 'sign-in' ? 'Đăng nhập' : 'Đăng ký'}
      okText={authTypeState === 'sign-in' ? 'Đăng nhập' : 'Đăng ký'}
      cancelText='Đóng'
    >
      <Form form={form} layout='vertical'>
        <div className='flex flex-col gap-y-2'>
          {authTypeState === 'sign-up' && (
            <Form.Item label='Họ và tên' className='!mb-1'>
              <Input placeholder='Full name...' />
            </Form.Item>
          )}

          <Form.Item label='Tên đăng nhập' className='!mb-1'>
            <Input placeholder='Username...' />
          </Form.Item>

          {authTypeState === 'sign-up' && (
            <Form.Item label='Email' className='!mb-1'>
              <Input placeholder='Email...' />
            </Form.Item>
          )}

          {authTypeState === 'sign-up' && (
            <Form.Item label='Số điện thoại' className='!mb-1'>
              <Input placeholder='SĐT...' />
            </Form.Item>
          )}

          <Form.Item label='Mật khẩu' className='!mb-1'>
            <Input.Password placeholder='Password...' />
          </Form.Item>

          {authTypeState === 'sign-up' && (
            <Form.Item label='Xác nhận mật khẩu' className='!mb-1'>
              <Input.Password placeholder='Password...' />
            </Form.Item>
          )}

          {authTypeState === 'sign-in' ? (
            <p
              onClick={() => setAuthTypeState('sign-up')}
              className='mb-0 text-blue-500 cursor-pointer hover:underline'
            >
              Chưa tạo tài khoản?{' '}
            </p>
          ) : (
            <p
              onClick={() => setAuthTypeState('sign-in')}
              className='mb-0 text-blue-500 cursor-pointer hover:underline'
            >
              Đã có tài khoản?{' '}
            </p>
          )}
        </div>
      </Form>
    </Modal>
  );
}
