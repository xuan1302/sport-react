import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

export const Route = createLazyFileRoute('/auth/_auth-layout/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  const [form] = useForm();
  const navigate = useNavigate();

  return (
    <Form
      form={form}
      onFinish={(value) => {
        console.log(value);
        navigate({
          from: '/auth/sign-in',
          to: '/admin',
        });
      }}
    >
      <div className='flex flex-col gap-y-4'>
        <h1 className='text-[#333333] font-semibold text-[28px]'>
          Đăng nhập tài khoản
        </h1>

        <div className='flex flex-col gap-y-2'>
          <Form.Item className='mb-2' name='username'>
            <Input placeholder='Tài khoản' />
          </Form.Item>

          <Form.Item className='mb-2' name='password'>
            <Input.Password placeholder='Mật khẩu' />
          </Form.Item>

          <Button type='primary' htmlType='submit'>
            Đăng nhập
          </Button>
        </div>
      </div>
    </Form>
  );
}
