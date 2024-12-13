import {
  DeleteOutlined,
  EyeOutlined,
  PhoneOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useDisclosure } from '@mantine/hooks';
import { createLazyFileRoute } from '@tanstack/react-router';
import {
  Button,
  Card,
  DatePicker,
  Input,
  Popconfirm,
  Select,
  Table,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ContactDetail from '../../../components/contacts/contact-detail';

export const Route = createLazyFileRoute('/admin/_admin-layout/contact')({
  component: RouteComponent,
});

function RouteComponent() {
  const [openModal, handleOpenModal] = useDisclosure(false);
  const [contactID, setContactID] = useState<string | undefined>();

  useEffect(() => {
    if (openModal) return;

    setContactID(undefined);
  }, [openModal]);

  return (
    <>
      <div className='flex flex-col gap-y-4'>
        <div className='flex items-center gap-x-2'>
          <PhoneOutlined />
          <span>Quản lý liên hệ</span>
        </div>

        <Card>
          <div className='flex flex-col gap-y-2'>
            <div className='flex items-center justify-between'>
              <div className='text-lg font-semibold'>Quản lý liên hệ</div>

              <div className='flex items-center gap-x-4'>
                <div>
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder='Tìm thông tin liên hệ...'
                    size='large'
                    className='w-[230px]'
                  />
                </div>

                <div>
                  <Select
                    className='w-[150px]'
                    defaultValue='all'
                    size='large'
                    placeholder='Trạng thái'
                    options={[
                      {
                        label: 'Tất cả',
                        value: 'all',
                      },
                      {
                        label: 'Đã trả lời',
                        value: 'answered',
                      },
                      {
                        label: 'Chưa trả lời',
                        value: 'unanswered',
                      },
                    ]}
                  />
                </div>

                <div>
                  <DatePicker.RangePicker
                    format='DD/MM/YYYY'
                    size='large'
                    className='!w-[250px]'
                    defaultValue={[dayjs().subtract(1, 'day'), dayjs()]}
                  />
                </div>
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
                  title: 'Ngày liên hệ',
                  dataIndex: 'createdAt',
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
                  title: 'Thao tác',
                  dataIndex: 'action',
                  fixed: 'right',
                  render: (_, record) => {
                    return (
                      <div className='flex items-center gap-x-2'>
                        <Button
                          icon={<EyeOutlined />}
                          onClick={() => {
                            setContactID(record.id);
                            handleOpenModal.open();
                          }}
                        ></Button>

                        <Popconfirm
                          title='Xoá liên hệ'
                          description='
                        Bạn có chắc chắn muốn xoá liên hệ này không?'
                          okText='Xoá'
                          cancelText='Hủy'
                        >
                          <Button icon={<DeleteOutlined />} />
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
                phone: '123123123',
                createdAt: dayjs().format('DD/MM/YYYY'),
                status: 'Chưa trả lời',
                username: 'nguyenvana',
              }))}
            ></Table>
          </div>
        </Card>
      </div>

      <ContactDetail
        contactID={contactID}
        open={openModal}
        onClose={() => handleOpenModal.close()}
      />
    </>
  );
}
