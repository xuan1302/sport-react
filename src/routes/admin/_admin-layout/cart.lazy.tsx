import { DeleteOutlined, EyeOutlined, PhoneOutlined, SearchOutlined } from '@ant-design/icons';
import { createLazyFileRoute } from '@tanstack/react-router'
import { Button, Card, DatePicker, Input, List, Modal, Popconfirm, Select, Table } from 'antd';
import ContactDetail from '../../../components/contacts/contact-detail';
import { useState } from 'react';

export const Route = createLazyFileRoute('/admin/_admin-layout/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // Thông tin đơn hàng
  const orderDetails = {
    name: "Nguyễn Văn A",
    phone: "0123456789",
    email: "nguyenvana@example.com",
    address: "123 Đường ABC, Quận 1, TP. HCM",
    products: [
      { id: 1, name: "Sản phẩm 1", img: "https://i.pinimg.com/originals/65/39/30/6539305fb14952972dabefd10d4402b3.jpg", size: "X", category: "A", quantity: 2, price: 100000 },
      { id: 2, name: "Sản phẩm 2", img: "https://i.pinimg.com/originals/65/39/30/6539305fb14952972dabefd10d4402b3.jpg", size: "X", category: "B", quantity: 1, price: 200000 },
      { id: 3, name: "Sản phẩm 3", img: "https://i.pinimg.com/originals/65/39/30/6539305fb14952972dabefd10d4402b3.jpg", size: "X", category: "C", quantity: 3, price: 150000 },
    ],
  };
  const totalAmount = orderDetails.products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: "https://i.pinimg.com/originals/65/39/30/6539305fb14952972dabefd10d4402b3.jpg",
      name: "Sản phẩm 1",
      category: "Thời trang",
      size: "M",
      price: 100000,
      quantity: 2,
    },
    {
      id: 2,
      image: "https://i.pinimg.com/originals/65/39/30/6539305fb14952972dabefd10d4402b3.jpg",
      name: "Sản phẩm 2",
      category: "Điện tử",
      size: "L",
      price: 200000,
      quantity: 1,
    },
  ]); 
  return (
    <div>
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
                  title: 'Địa Chỉ',
                  dataIndex: 'adress',
                },
                {
                  title: 'Tổng tiền',
                  dataIndex: 'totalprice',
                },
                {
                  title: 'Trạng thái',
                  dataIndex: 'status',
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
                          icon={<EyeOutlined />}
                          onClick={showModal}
                        ></Button>
                        <Modal
                          title="Chi Tiết Đơn Hàng"
                          visible={isModalVisible}
                          onOk={handleOk}
                          onCancel={handleCancel}
                          footer={[
                            <Button key="ok" type="primary" onClick={handleOk}>
                              Đóng
                            </Button>,
                          ]}
                        >
                          {/* Thông tin khách hàng */}
                          <p><strong>Tên:</strong> {orderDetails.name}</p>
                          <p><strong>Số điện thoại:</strong> {orderDetails.phone}</p>
                          <p><strong>Email:</strong> {orderDetails.email}</p>
                          <p><strong>Địa chỉ:</strong> {orderDetails.address}</p>

                          {/* Danh sách sản phẩm */}

                          {cartItems.map(item => (
                            <div key={item.id} className="flex items-center mb-4 mt-4">
                              <div className="flex items-center mb-4">
                                {/* Thẻ 1: Ảnh */}
                                <div className="w-3/12 mr-2">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    width={110}
                                    height={110}
                                    className="object-cover rounded"
                                  />
                                </div>

                                {/* Thẻ 2: Thông tin sản phẩm */}
                                <div className="w-9/12 flex flex-col">
                                  <span className="font-semibold text-lg block">{item.name}</span>
                                  <span className="text-sm text-gray-500 block ">{item.category} : {item.size}</span>
                                  <p className=" text-sm text-gray-500 font-semibold block">Số Lượng : 5</p>

                                  <div className="flex items-center justify-between mt-2 text-sm">
                                    <span className="font-bold text-gray-500">
                                      <span className="font-bold text-lg ">Tổng:</span>
                                      <span className="text-sm font-semibold">  
                                      </span>
                                    </span>
                                    <span className="text-xs text-gray-500">  X  </span>

                                    <span className="text-gray-500 font-bold text-lg ml-4">
                                      {(item.price * ( item.quantity)).toLocaleString()}             <span className="text-sm font-semibold">
                                        <sup className="text-xs">VND</sup>
                                      </span>
                                    </span>
                                  
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Tổng giá trị đơn hàng */}
                          <p style={{ textAlign: "right", marginTop: "10px" }}>
                            <strong>Tổng Cộng: </strong> {totalAmount.toLocaleString()} VNĐ
                          </p>
                        </Modal>
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

                status: 'Chưa trả lời',
                username: 'nguyenvana',
              }))}
            ></Table>
          </div>
        </Card>
      </div>

      <ContactDetail

      />
    </div>
  );
}
