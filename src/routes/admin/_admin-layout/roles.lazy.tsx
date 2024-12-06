import {
  DeleteFilled,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Button, Card, Input, Table } from 'antd';

export const Route = createLazyFileRoute('/admin/_admin-layout/roles')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center gap-x-2'>
        <UserOutlined />
        <span>Quản lý vai trò</span>
      </div>

      <Card>
        <div className='flex flex-col gap-y-2'>
          <div className='flex items-center justify-between'>
            <div className='font-semibold text-lg'>Quản lý vai trò</div>

            <div className='flex items-center gap-x-4'>
              <Input
                prefix={<SearchOutlined />}
                placeholder='Tìm tên vai trò...'
                size='large'
              />

              <Button size='large' type='primary' icon={<PlusOutlined />}>
                Thêm vai trò
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
                title: 'Tên vai trò',
                dataIndex: 'name',
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
              name: 'Admin',
              status: 'Đang hoạt động',
              createdAt: '20/10/2021',
            }))}
          ></Table>
        </div>
      </Card>
    </div>
  );
}
