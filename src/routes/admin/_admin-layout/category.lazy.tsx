import {
  DeleteFilled,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useDisclosure } from '@mantine/hooks';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Button, Card, Input, Popconfirm, Select, Table } from 'antd';
import { useEffect, useState } from 'react';
import CreateCategoryModal from '../../../components/category/create-category';

export const Route = createLazyFileRoute('/admin/_admin-layout/category')({
  component: RouteComponent,
});

function RouteComponent() {
  const [openModal, handleOpenModal] = useDisclosure(false);
  const [categoryID, setCategoryID] = useState<string | undefined>();

  useEffect(() => {
    if (openModal) return;

    setCategoryID(undefined);
  }, [openModal]);

  return (
    <>
      <div className='flex flex-col gap-y-4'>
        <div className='flex items-center gap-x-2'>
          <SettingOutlined />
          <span>Quản lý danh mục</span>
        </div>

        <Card>
          <div className='flex flex-col gap-y-2'>
            <div className='flex items-center justify-between'>
              <div className='text-lg font-semibold'>Quản lý tài khoản</div>

              <div className='flex items-center gap-x-4'>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder='Tìm danh mục...'
                  size='large'
                />

                <Select
                  className='max-w-[400px] w-full'
                  size='large'
                  placeholder='Loại danh mục'
                  options={[]}
                />

                <Select
                  className='max-w-[400px] w-full'
                  defaultValue='all'
                  size='large'
                  placeholder='Trạng thái'
                  options={[
                    {
                      label: 'Tất cả',
                      value: 'all',
                    },
                    {
                      label: 'Đang hoạt động',
                      value: 'active',
                    },
                    {
                      label: 'Tạm ngưng',
                      value: 'inactive',
                    },
                  ]}
                />

                <Button
                  size='large'
                  type='primary'
                  icon={<PlusOutlined />}
                  onClick={() => handleOpenModal.open()}
                >
                  Thêm danh mục
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
                  title: 'Tên danh mục',
                  dataIndex: 'name',
                },
                {
                  title: 'Danh mục cha',
                  dataIndex: 'parentName',
                },
                {
                  title: 'Mô tả',
                  dataIndex: 'description',
                },
                {
                  title: 'Trạng thái',
                  dataIndex: 'status',
                },
                {
                  title: 'Thao tác',
                  dataIndex: 'action',
                  fixed: 'right',
                  render: (_, record) => {
                    return (
                      <div className='flex items-center gap-x-2'>
                        <Button
                          icon={<EditFilled />}
                          onClick={() => {
                            setCategoryID(record.id);
                            handleOpenModal.open();
                          }}
                        ></Button>

                        <Popconfirm
                          title='Xoá danh mục'
                          description='
                        Bạn có chắc chắn muốn xoá danh mục này không?'
                          okText='Xoá'
                          cancelText='Hủy'
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
                name: 'Áo đội tuyển việt nam',
                parentName: 'Áo đội tuyển việt nam  ',
                description:
                  'Màu đỏ lá cờ Việt Nam, có hình ngôi sao màu vàng  ',
                status: 'Đang hoạt động',
                createdAt: '20/10/2021',
              }))}
            ></Table>
          </div>
        </Card>
      </div>

      <CreateCategoryModal
        open={openModal}
        categoryID={categoryID}
        onClose={() => handleOpenModal.close()}
        onCancel={() => handleOpenModal.close()}
      />
    </>
  );
}
