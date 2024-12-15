import { EyeOutlined } from '@ant-design/icons';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Button, Card, DatePicker, Table } from 'antd';
import dayjs from 'dayjs';

export const Route = createLazyFileRoute(
  '/admin/_admin-layout/customer-history/$id',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center gap-x-2'>
        <span>Lịch sử mua hàng</span>
      </div>

      <Card>
        <div className='flex flex-col gap-y-2'>
          <div className='flex items-center justify-between'>
            <div className='text-lg font-semibold'>Lịch sửa mua hàng</div>

            <div className='flex items-center gap-x-4'>
              <DatePicker.RangePicker
                format='DD/MM/YYYY'
                size='large'
                className='w-[400px]'
                defaultValue={[dayjs().subtract(1, 'day'), dayjs()]}
              />
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
                title: 'Ngày đăng ký',
                dataIndex: 'createdAt',
              },
              {
                title: 'Họ và tên',
                dataIndex: 'name',
              },
              {
                title: 'Tài khoản',
                dataIndex: 'username',
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
                title: 'Địa chỉ',
                dataIndex: 'address',
              },
              {
                title: 'Lịch sử mua hàng',
                dataIndex: 'action',
                fixed: 'right',
                align: 'center',
                render: (_, record) => {
                  return (
                    <div className='flex items-center justify-center'>
                      <Button icon={<EyeOutlined />} onClick={() => {}}>
                        Xem
                      </Button>
                    </div>
                  );
                },
              },
            ]}
            dataSource={new Array(10).fill(0).map((_, index) => ({
              index: index + 1,
              id: `${index + 1}`,
              name: 'Nguyễn Văn A',
              email: 'helloworld@gmail.com',
              phone: '123123123',
              createdAt: dayjs().format('DD/MM/YYYY'),
              address: '123 Phan Văn Trị, Gò Vấp, TP.HCM',
              username: 'nguyenvana',
            }))}
          ></Table>
        </div>
      </Card>
    </div>
  );
}
