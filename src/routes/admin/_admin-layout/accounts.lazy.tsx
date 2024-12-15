import {
  DeleteFilled,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useDisclosure } from '@mantine/hooks';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Button, Card, Input, Popconfirm, Table } from 'antd';
import { useEffect, useState } from 'react';
import CreateAccountModal from '../../../components/accounts/create-account';

export const Route = createLazyFileRoute('/admin/_admin-layout/accounts')({
  component: RouteComponent,
});

function RouteComponent() {
  const [openModal, handlerOpenModal] = useDisclosure(false);
  const [accountId, setAccountId] = useState<string | undefined>();

  useEffect(() => {
    if (openModal) return;

    setAccountId(undefined);
  }, [openModal]);

  return (
    <>
      <div className='flex flex-col gap-y-4'>
        <div className='flex items-center gap-x-2'>
          <UserOutlined />
          <span>Quản lý tài khoản</span>
        </div>

        <Card>
          <div className='flex flex-col gap-y-2'>
            <div className='flex items-center justify-between'>
              <div className='text-lg font-semibold'>Quản lý tài khoản</div>

              <div className='flex items-center gap-x-4'>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder='Tìm tài khoản...'
                  size='large'
                />

                <Button
                  size='large'
                  type='primary'
                  icon={<PlusOutlined />}
                  onClick={() => handlerOpenModal.open()}
                >
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
                  align: 'center',
                  render: (_, record) => {
                    return (
                      <div className='flex items-center justify-center gap-x-2'>
                        <Button
                          icon={<EditFilled />}
                          onClick={() => {
                            setAccountId(record.id);
                            handlerOpenModal.open();
                          }}
                        />

                        <Popconfirm
                          title='Xóa tài khoản'
                          description='Bạn có chắc chắn muốn xóa tài khoản này không?'
                          okText='Xoá tài khoản'
                          cancelText='Huỷ'
                        >
                          <Button icon={<DeleteFilled />} />
                        </Popconfirm>
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
                phone: '09123123123',
                status: 'Đang hoạt động',
                createdAt: '20/10/2021',
                role: 'Admin',
              }))}
            />
          </div>
        </Card>
      </div>

      <CreateAccountModal
        accountId={accountId}
        open={openModal}
        onClose={() => handlerOpenModal.close()}
        onCancel={() => handlerOpenModal.close()}
        cancelText='Hủy'
        okText='Tạo'
      />
    </>
  );
}
