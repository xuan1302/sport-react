import {
  DeleteFilled,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Button, Card, Input, Table } from 'antd';

export const Route = createLazyFileRoute('/admin/_admin-layout/accounts')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center gap-x-2'>
        <UserOutlined />
        <span>Quản lý tài khoản</span>
      </div>

      <Card>
        <div className='flex flex-col gap-y-2'>
          <div className='flex items-center justify-between'>
            <div className='font-semibold text-lg'>Quản lý tài khoản</div>

            <div className='flex items-center gap-x-4'>
              <Input
                prefix={<SearchOutlined />}
                placeholder='Tìm tài khoản...'
                size='large'
              />

              <Button size='large' type='primary' icon={<PlusOutlined />}>
                Tạo tài khoản
              </Button>
            </div>
          </div>

          <Table
            scroll={{
              x: 1200,
              y: window.innerHeight - 400,
            }}
            columns={[
              {
                title: 'STT',
                dataIndex: 'index',
              },
              {
                title: 'Họ và tên',
                dataIndex: 'name',
              },
              {
                title: 'Email',
                dataIndex: 'email',
              },
              {
                title: 'Số điện thoại',
                dataIndex: 'phone',
              },
              {
                title: 'Trạng thái',
                dataIndex: 'status',
              },
              {
                title: 'Ngày tạo',
                dataIndex: 'createdAt',
              },
              {
                title: 'Vai trò',
                dataIndex: 'role',
              },
              {
                title: 'Thao tác',
                dataIndex: 'action',
                fixed: 'right',
                render: (_, record) => {
                  return (
                    <div className='flex items-center gap-x-2'>
                      <Button icon={<EditFilled />}></Button>
                      <Button icon={<DeleteFilled />} />
                    </div>
                  );
                },
              },
            ]}
            dataSource={new Array(10).fill(0).map((_, index) => ({
              index: index + 1,
              name: 'Nguyễn Văn A',
              email: 'helloworld@gmail.com',
              phone: '09123123123',
              status: 'Đang hoạt động',
              createdAt: '20/10/2021',
              role: 'Admin',
            }))}
          ></Table>
        </div>
      </Card>
    </div>
  );
}
